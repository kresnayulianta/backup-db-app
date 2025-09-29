# Use the official Bun image as a base image
FROM oven/bun:1

# Set the working directory
WORKDIR /app

# Copy package.json and bun.lockb
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of the application code
COPY . .

# Run the application
CMD ["bun", "run", "src/index.ts"]
