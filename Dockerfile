# Use the official Bun image as a base image
FROM oven/bun:1

# Allow selecting PostgreSQL client major version at build time (default: 16)
ARG PG_MAJOR=16

# Set the working directory
WORKDIR /app

# Install database client tools for dump operations (psql/pg_dump, mysql/mysqldump)
# - Add the official PostgreSQL APT repo to allow choosing specific major versions
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        gnupg \
        lsb-release \
        wget \
    && echo "deb http://apt.postgresql.org/pub/repos/apt $(. /etc/os-release && echo $VERSION_CODENAME)-pgdg main" > /etc/apt/sources.list.d/pgdg.list \
    && wget -qO - https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor -o /etc/apt/trusted.gpg.d/postgresql.gpg \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client-$PG_MAJOR \
        default-mysql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy package.json and bun.lockb
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of the application code
COPY . .

# Run the application
CMD ["bun", "run", "src/index.ts"]
