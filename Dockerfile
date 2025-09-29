# Use the official Bun image as a base image
FROM oven/bun:1

# Set the working directory
WORKDIR /app

# Install database client tools for dump operations (psql/pg_dump, mysql/mysqldump)
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
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
