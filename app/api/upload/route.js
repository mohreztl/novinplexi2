
// import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
// import { NextApiRequest } from 'next';
// import { NextResponse } from 'next/server';
// import {getSignedUrl} from '@aws-sdk/s3-request-presigner'
// import { Upload } from "@aws-sdk/lib-storage";
// const s3 = new S3Client({
//   region: 'default',
//   endpoint: process.env.LIARA_ENDPOINT,
//   credentials: {
//     accessKeyId: process.env.LIARA_ACCESS_KEY ,
//     secretAccessKey: process.env.LIARA_SECRET_KEY ,
    
//   },
// });
// export const dynamic = 'force-dynamic';
// export const POST = async (req) => {

//   try {
//   const formData = await req.formData();
//   const files = formData.getAll("files");
//   if (!files) {
//     return NextResponse.json({ error: 'Image file is required' }, { status: 400 });
//   }
// console.log(files)
 

// const uploadPromises = files.map(async (file) => {
//   const upload = new Upload({
//     client: s3,
//     params: {
//       Bucket: process.env.LIARA_BUCKET_NAME,
//       Key: `${Date.now()}_${file.name}`,
//       Body: file.stream(), // استفاده از استریم فایل
//       ContentType: file.type,
  
//     },
//   });

//   const result = await upload.done(); // منتظر اتمام آپلود
//   return result.Location; // لینک عمومی فایل
// });

// const uploadedUrls = await Promise.all(uploadPromises);

// console.log("Uploaded URLs:", uploadedUrls);
// return NextResponse.json({ urls: uploadedUrls  } );
// } catch (error) {
// console.error("Upload error:", error);
// return NextResponse.json(
//   { error: error.message || "Failed to upload files" },
//   { status: 500 }
// );
// }
// }
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { NextResponse } from 'next/server'; // فقط از این برای پاسخ استفاده کنید

const s3 = new S3Client({
  region: 'default',
  endpoint: process.env.LIARA_ENDPOINT,
  credentials: {
    accessKeyId: process.env.LIARA_ACCESS_KEY,
    secretAccessKey: process.env.LIARA_SECRET_KEY,
  },
});

export const dynamic = 'force-dynamic';

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files");

    if (files.length === 0) {
      return NextResponse.json({ error: 'Image file is required' }, { status: 400 });
    }

    const uploadPromises = files.map(async (file) => {
      const upload = new Upload({
        client: s3,
        params: {
          Bucket: process.env.LIARA_BUCKET_NAME,
          Key: `${Date.now()}_${file.name}`,
          Body: file.stream(),
          ContentType: file.type,
        },
      });

      const result = await upload.done();
      return result.Location;
    });

    const uploadedUrls = await Promise.all(uploadPromises);

    return NextResponse.json({ urls: uploadedUrls });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: 'Failed to upload files' }, { status: 500 });
  }
};
