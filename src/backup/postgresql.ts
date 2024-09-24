import dayjs from "dayjs";
import databaseConfig, { validatePostgresConfig } from "../config/database";
import { validateR2Config } from "../config/filesystem";
import useBackupPgsql from "../utils/useBackupPgsql";
import useSlackNotification from "../utils/useSlackNotification";
import useUploadToR2 from "../utils/useUploadToR2";
import { validateSlackConfig } from "../config/notification";

validatePostgresConfig();
validateR2Config();
validateSlackConfig();

databaseConfig.postgres.forEach(async (database) => {
    const pathBackup: string = await useBackupPgsql(database.database, database.user, database.password, database.host, database.port);

    // Upload backup files to Cloudflare R2
    const r2 = await useUploadToR2({
        filePaths: pathBackup,
    })

    // Slack notification
    useSlackNotification('DONE BACKUP POSTGRESQL DATABASE: ' + database.database + `\nAt: ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`);
})
