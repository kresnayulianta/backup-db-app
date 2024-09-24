import databaseConfig, { validateMysqlConfig } from "../config/database";
import fileSystemConfig from "../config/filesystem";
import notificationConfig from "../config/notification";

validateMysqlConfig();

databaseConfig.mysql.forEach((database) => {
    console.log('MySQL Databases:', database.database);
    console.log('MySQL User:', database.user);
    console.log('MySQL Host:', database.host);
    console.log('MySQL Password:', database.password);
    console.log('MySQL Port:', database.port);
    console.log('DONE');

    console.log('Slack Webhook URL:', notificationConfig.slack.webhookUrl);
    // console.log('Cloudflare R2 Bucket Name:', fileSystemConfig.cloudflareR2.bucketName);
})

