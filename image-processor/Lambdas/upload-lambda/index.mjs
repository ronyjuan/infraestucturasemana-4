import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

const s3 = new S3Client({ region: "us-east-1" });

export const handler = async (event) => {
    try {
        const bodyBuffer = Buffer.from(event.body, event.isBase64Encoded ? 'base64' : 'utf8');
        const fileName = `${randomUUID()}.png`;
        const key = `${process.env.UPLOAD_PREFIX}${fileName}`;

        await s3.send(new PutObjectCommand({
            Bucket: process.env.S3_BUCKET,
            Key: key,
            Body: bodyBuffer,
            ContentType: "image/png"
        }));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Upload successful", file: fileName })
        };
    } catch (error) {
        console.error(error);
        return { statusCode: 500, body: JSON.stringify({ error: "Upload failed" }) };
    }
};