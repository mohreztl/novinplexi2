import { NextResponse } from 'next/server';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { v4 as uuidv4 } from 'uuid';

// S3 Configuration
const s3Client = new S3Client({
  region: process.env.LIARA_REGION || 'default',
  endpoint: process.env.LIARA_ENDPOINT,
  credentials: {
    accessKeyId: process.env.LIARA_ACCESS_KEY,
    secretAccessKey: process.env.LIARA_SECRET_KEY,
  },
  forcePathStyle: true,
});

const BUCKET_NAME = process.env.LIARA_BUCKET_NAME;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/jpg', 
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml'
];

// Helper function to generate unique filename
function generateUniqueFilename(originalName) {
  const extension = originalName.split('.').pop();
  const timestamp = Date.now();
  const uuid = uuidv4().split('-')[0];
  return `uploads/${timestamp}-${uuid}.${extension}`;
}

// Helper function to validate file
function validateFile(file) {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: `حجم فایل نباید بیشتر از ${MAX_FILE_SIZE / 1024 / 1024}MB باشد`
    };
  }

  // Check file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: 'فرمت فایل مجاز نیست. فقط تصاویر JPG, PNG, WebP, GIF و SVG مجاز هستند'
    };
  }

  return { isValid: true };
}

// GET method to check API status
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      message: 'Upload API is working',
      maxFileSize: `${MAX_FILE_SIZE / 1024 / 1024}MB`,
      allowedTypes: ALLOWED_TYPES,
      bucket: BUCKET_NAME
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'خطا در بررسی وضعیت API',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

// POST method for file upload
export async function POST(request) {
  try {
    // Check environment variables
    if (!BUCKET_NAME || !process.env.LIARA_ACCESS_KEY || !process.env.LIARA_SECRET_KEY) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'تنظیمات S3 ناقص است. لطفاً متغیرهای محیطی را بررسی کنید' 
        },
        { status: 500 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'فایلی انتخاب نشده است' },
        { status: 400 }
      );
    }

    // Validate file
    const validation = validateFile(file);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    // Generate unique filename
    const uniqueFilename = generateUniqueFilename(file.name);

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to S3
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: BUCKET_NAME,
        Key: uniqueFilename,
        Body: buffer,
        ContentType: file.type,
        ACL: 'public-read',
        Metadata: {
          originalName: file.name,
          uploadedAt: new Date().toISOString(),
          fileSize: file.size.toString()
        }
      }
    });

    // Execute upload with progress tracking
    const result = await upload.done();

    // Generate public URL
    const publicUrl = `${process.env.LIARA_ENDPOINT}/${BUCKET_NAME}/${uniqueFilename}`;

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'فایل با موفقیت آپلود شد',
      data: {
        url: publicUrl,
        filename: uniqueFilename,
        originalName: file.name,
        size: file.size,
        type: file.type,
        bucket: BUCKET_NAME,
        key: uniqueFilename,
        etag: result.ETag,
        uploadedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    
    // Handle specific S3 errors
    if (error.name === 'CredentialsError') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'خطا در احراز هویت S3. لطفاً کلیدهای دسترسی را بررسی کنید' 
        },
        { status: 401 }
      );
    }

    if (error.name === 'NetworkError') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'خطا در اتصال به سرور S3. لطفاً اتصال اینترنت را بررسی کنید' 
        },
        { status: 503 }
      );
    }

    if (error.name === 'NoSuchBucket') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'باکت S3 یافت نشد. لطفاً نام باکت را بررسی کنید' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'خطا در آپلود فایل',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// DELETE method for file removal
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const fileKey = searchParams.get('key');

    if (!fileKey) {
      return NextResponse.json(
        { success: false, error: 'کلید فایل مشخص نشده است' },
        { status: 400 }
      );
    }

    // Delete from S3
    const { DeleteObjectCommand } = await import('@aws-sdk/client-s3');
    
    await s3Client.send(new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileKey
    }));

    return NextResponse.json({
      success: true,
      message: 'فایل با موفقیت حذف شد',
      deletedKey: fileKey
    });

  } catch (error) {
    console.error('Delete error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'خطا در حذف فایل',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// OPTIONS method for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}
