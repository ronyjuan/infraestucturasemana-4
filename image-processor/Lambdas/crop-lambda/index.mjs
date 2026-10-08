import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

const s3 = new S3Client({ region: "us-east-1" });

export const handler = async (event) => {
    for (const record of event.Records) {
        const s3Event = JSON.parse(record.body); 
        
        for (const s3Record of s3Event.Records) {
            const bucket = s3Record.s3.bucket.name;
            const sourceKey = decodeURIComponent(s3Record.s3.object.key.replace(/\+/g, ' '));
            
            const getObjParams = { Bucket: bucket, Key: sourceKey };
            const { Body } = await s3.send(new GetObjectCommand(getObjParams));
            const imageBuffer = await Body.transformToByteArray();

            const circleSvg = `<svg width="40" height="40"><circle cx="20" cy="20" r="20" /></svg>`;
            const processedBuffer = await sharp(imageBuffer)
                .resize(40, 40)
                .composite([{ input: Buffer.from(circleSvg), blend: 'dest-in' }])
                .png()
                .toBuffer();

            const destKey = sourceKey.replace(process.env.UPLOAD_PREFIX, process.env.PROCESSED_PREFIX);
            await s3.send(new PutObjectCommand({
                Bucket: process.env.S3_BUCKET,
                Key: destKey,
                Body: processedBuffer,
                ContentType: "image/png"
            }));
            
            console.log(`Successfully processed ${destKey}`);
        }
    }
};