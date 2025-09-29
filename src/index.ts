import cron from 'node-cron';
import { backupMysql } from './backup/mysql';
import { backupPostgresql } from './backup/postgresql';

const CRON_SCHEDULE_MYSQL = process.env.CRON_SCHEDULE_MYSQL || '0 0 * * *';
const CRON_SCHEDULE_POSTGRESQL = process.env.CRON_SCHEDULE_POSTGRESQL || '0 0 * * *';

cron.schedule(CRON_SCHEDULE_MYSQL, () => {
    console.log('Running mysql backup job...');
    backupMysql();
});

cron.schedule(CRON_SCHEDULE_POSTGRESQL, () => {
    console.log('Running postgresql backup job...');
    backupPostgresql();
});

console.log('Cron jobs scheduled.');

Bun.serve({
    port: process.env.PORT || 3000,
    fetch(req) {
        const url = new URL(req.url);

        if (url.pathname === '/mysql') {
            console.log('HTTP trigger: Running mysql backup job...');
            backupMysql();
            return new Response('Triggered MySQL backup');
        }

        if (url.pathname === '/postgresql') {
            console.log('HTTP trigger: Running postgresql backup job...');
            backupPostgresql();
            return new Response('Triggered PostgreSQL backup');
        }

        return new Response("Cron job is running.");
    },
});
