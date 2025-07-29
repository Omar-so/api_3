# Use Node.js base image
FROM node:18-slim

# Set working directory
WORKDIR /usr/src/app

# Install Python and pip
RUN apt-get update && apt-get install -y python3 python3-pip && rm -rf /var/lib/apt/lists/*

# Copy dependencies
COPY package*.json ./
RUN npm install

# Install Python dependencies
RUN pip3 install requests beautifulsoup4 lxml

# Copy all project files
COPY . .

# Expose port if your Node app listens on it
EXPOSE 3000

# Start Node.js app
CMD ["node", "app.js"]
