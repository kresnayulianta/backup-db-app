import dayjs from "dayjs";
import databaseConfig, { validateMysqlConfig } from "../config/database";
import { validateR2Config } from "../config/filesystem";
import { validateSlackConfig } from "../config/notification";
import useBackupMysql from "../utils/useBackupMysql";
import useSlackNotification from "../utils/useSlackNotification";
import useUploadToR2 from "../utils/useUploadToR2";

export const backupMysql = () => {
    validateMysqlConfig();
    validateR2Config();
    validateSlackConfig();

    databaseConfig.mysql.forEach(async (database) => {
        const pathBackup: string = await useBackupMysql(database.database, database.user, database.password, database.host);

        // Upload backup files to Cloudflare R2
        await useUploadToR2({
            filePaths: pathBackup,
        })

        // Slack notification
        useSlackNotification('DONE BACKUP MYSQL DATABASE: ' + database.database + `\nAt: ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`);
    })
}

