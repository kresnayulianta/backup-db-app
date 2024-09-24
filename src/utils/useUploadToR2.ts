import axios from 'axios';
import fs from 'fs';
import path from 'path';
import md5 from 'md5';
import fileSystemConfig from '../config/filesystem';
import { PutObjectCommand, S3Client, type PutObjectCommandInput } from '@aws-sdk/client-s3';

export interface UploadToR2Options {
    filePaths: string | string[];
    directory?: string;
}

const r2 = new S3Client({
    region: 'apac',
    endpoint: `${fileSystemConfig.cloudflareR2.endpoint}`,
    credentials: {
        accessKeyId: fileSystemConfig.cloudflareR2.accessKeyId,
        secretAccessKey: fileSystemConfig.cloudflareR2.secretAccessKey,
    },
});



async function useUploadToR2({ filePaths, directory = '' }: UploadToR2Options) {
    const files = Array.isArray(filePaths) ? filePaths : [filePaths];

    try {
        for (const file of files) {
            const fileStream = fs.readFileSync(file);
            const fileName = path.basename(file);
            const backupPath = fileSystemConfig.backupPath.r2;
            const fileKey = directory ? `${backupPath}/${directory}/${fileName}` : `${backupPath}/${fileName}`;
            console.log('fileKey', fileKey.charAt(0) === '/' ? fileKey.substring(1) : fileKey);

            if (fileName.includes('.gitkeep'))
                continue;

            console.log(fileName)

            const uploadParams: PutObjectCommandInput = {
                Bucket: fileSystemConfig.cloudflareR2.bucket,
                Key: fileKey.charAt(0) === '/' ? fileKey.substring(1) : fileKey,
                Body: fileStream,
                ContentLength: fs.statSync(file).size,
                ContentType: 'application/octet-stream'
            };

            const cmd = new PutObjectCommand(uploadParams);

            const digest = md5(fileStream);

            cmd.middlewareStack.add((next) => async (args: any) => {
                args.request.headers['if-none-match'] = `"${digest}"`;
                return await next(args);
            }, {
                step: 'build',
                name: 'addETag'
            })

            const data = await r2.send(cmd);
            console.log(`Success - Status Code: ${data.$metadata.httpStatusCode}`);
        }
    } catch (err: any) {
        if (err.hasOwnProperty('$metadata')) {
            console.error(`Error - Status Code: ${err.$metadata.httpStatusCode} - ${err.message}`);
        } else {
            console.error('Error', err);
        }
    }
}

export default useUploadToR2;
