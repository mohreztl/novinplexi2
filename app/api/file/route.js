export const dynamic = 'force-dynamic';
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: 'default',
  endpoint: process.env.LIARA_ENDPOINT,
  credentials: {
    accessKeyId: process.env.LIARA_ACCESS_KEY ,
    secretAccessKey: process.env.LIARA_SECRET_KEY ,}
});

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const prefix = searchParams.get("prefix") || ""; // گرفتن پارامتر `prefix` از URL

    const command = new ListObjectsV2Command({
      endpoint: process.env.LIARA_ENDPOINT,
      Bucket: process.env.LIARA_BUCKET_NAME,
      Prefix: prefix,
    });

    const data = await s3Client.send(command);
    const files = data.Contents.map((file) => ({
      Key: file.Key,
      url: `https://${process.env.LIARA_BUCKET_NAME}.storage.c2.liara.space/${file.Key}`,
    }));
    return new Response(
      JSON.stringify(
       files),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching objects from S3:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch objects from S3" }),
      { status: 500 }
    );
  }
}