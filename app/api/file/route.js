export const dynamic = 'force-dynamic';
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: 'default',
  endpoint: process.env.LIARA_ENDPOINT,
  credentials: {
    accessKeyId: process.env.LIARA_ACCESS_KEY,
    secretAccessKey: process.env.LIARA_SECRET_KEY,
  },
  forcePathStyle: true,
  requestTimeout: 30000, // 30 seconds
  maxAttempts: 3,
  retryMode: 'adaptive'
});

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const prefix = searchParams.get("prefix") || ""; // گرفتن پارامتر `prefix` از URL

    const command = new ListObjectsV2Command({
      Bucket: process.env.LIARA_BUCKET_NAME,
      Prefix: prefix,
    });

    // Add timeout handling
    const commandPromise = s3Client.send(command);
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout after 30 seconds')), 30000);
    });

    const data = await Promise.race([commandPromise, timeoutPromise]);
    
    const files = (data.Contents || []).map((file) => ({
      Key: file.Key,
      url: `${process.env.LIARA_ENDPOINT}/${process.env.LIARA_BUCKET_NAME}/${file.Key}`,
      size: file.Size,
      lastModified: file.LastModified
    }));
    
    return new Response(
      JSON.stringify(files),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching objects from S3:", error);
    
    if (error.message && error.message.includes('timeout')) {
      return new Response(
        JSON.stringify({ error: "درخواست منقضی شد. لطفاً دوباره تلاش کنید." }),
        { status: 408 }
      );
    }
    
    if (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT') {
      return new Response(
        JSON.stringify({ error: "خطا در اتصال به سرور. لطفاً اتصال اینترنت را بررسی کنید." }),
        { status: 503 }
      );
    }
    
    return new Response(
      JSON.stringify({ error: "خطا در دریافت فایل‌ها از سرور" }),
      { status: 500 }
    );
  }
}