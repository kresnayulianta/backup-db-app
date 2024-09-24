# Backup DB App

This is a JavaScript application built with [Bun](https://bun.sh/) to automate the process of backing up PostgreSQL and MySQL databases. It zips the backup files and uploads them to either AWS S3 or Cloudflare R2 for secure storage.

## Features

- Backup PostgreSQL and MySQL databases.
- Compress the database backups into a zip file.
- Upload the backup files to AWS S3 or Cloudflare R2.
- Simple configuration setup for database and cloud storage credentials.

## Requirements

- [Bun](https://bun.sh/) - A fast all-in-one JavaScript runtime.
- PostgreSQL or MySQL installed.
- AWS S3 or Cloudflare R2 account with access keys.

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/backup-db-app.git
   cd backup-db-app
   ```
2. Install the dependencies:
   ```bash
   bun install
   ```
3. Set up the configuration:
   ```bash
   cp .env.example .env
   ```

## Usage

1. Run the backup script:
   ```bash
   bun run backup:pgsql
   #or
   bun run backup:mysql
   ```
2. The backup file will be created, zipped, and then uploaded to the configured cloud storage (AWS S3 or Cloudflare R2).

## Configuration

- Ensure that your PostgreSQL or MySQL server is properly configured.
- Ensure the .env file contains correct credentials for both the database and the cloud storage service.
- Modify the script as needed for specific backup strategies or file retention policies.

## License
This project is licensed under the MIT License - [see the LICENSE file](LICENSE) for details.
