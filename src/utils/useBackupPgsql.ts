import { exec as childProcessExec } from "child_process";
import path from 'path';
import useToZipFile from "./useToZipFile";
import dayjs from "dayjs";
import fs from 'fs';


async function useBackupPgsql(dbName: string, user: string, password: string, host: string, port: string): Promise<string> {
    const backupPath = process.env.BACKUP_PATH_LOCAL || path.resolve('./file_backups');
    const pathPGDump = process.env.PGDUMP_PATH || 'pg_dump';
    const backupFileName = `${backupPath}/postgresql-${dbName}.sql`;
    const command = `PGPASSWORD=${password} ${pathPGDump} --username=${user} --host=${host} --port=${port} --dbname=${dbName} --file=${backupFileName} --inserts --clean --if-exists`;

    console.log(`Backup PostgreSQL database: ${dbName}`);

    try {
        await new Promise<void>((resolve, reject) => {
            childProcessExec(command, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
        const zipFileName = await useToZipFile({ filePath: backupFileName, zipFileName: `${backupPath}/${dayjs().format('YYYY-MM-DD-HH-mm-ss')}-${dbName}.zip` });
        fs.unlinkSync(backupFileName);
        console.log(`DONE Backup PostgreSQL database: ${dbName}`);
        return zipFileName;
    } catch (error) {
        throw new Error(`Failed to backup PostgreSQL database: ${error}`);
    }
}

export default useBackupPgsql;
