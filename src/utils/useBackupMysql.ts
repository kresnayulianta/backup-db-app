import { exec as childProcessExec } from "child_process";
import path from 'path';
import useToZipFile from "./useToZipFile";
import dayjs from "dayjs";
import fs from 'fs';


async function useBackupMysql(dbName: string, user: string, password: string, host: string): Promise<string> {
    const backupPath = process.env.BACKUP_PATH_LOCAL || path.resolve('./file_backups');
    const pathMYSQLDump = process.env.MYSQLDUMP_PATH || 'mysqldump';
    const backupFileName = `${backupPath}/mysql-${dbName}.sql`;
    const command = `${pathMYSQLDump} -u ${user} -p${password} -h ${host} ${dbName} > ${backupFileName}`;

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
        const zipFileName = await useToZipFile({ filePath: backupFileName, zipFileName: `${backupPath}/${dayjs().format('YYYY-MM-DD-HH-mm-ss')}.zip` });
        fs.unlinkSync(backupFileName);
        return zipFileName;
    } catch (error) {
        throw new Error(`Failed to backup MySQL database: ${error}`);
    }
}

export default useBackupMysql;
