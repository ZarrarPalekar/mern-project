# Use the official Node.js image as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /server

# Copy the application files into the working directory
COPY . /server

# Install the application dependencies
RUN npm install

# Define the entry point for the container
CMD ["node", "server.js"]

EXPOSE 8080/tcp