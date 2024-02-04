# Use the official Node.js image as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy both package.json and yarn.lock files into the container
COPY package.json yarn.lock ./

# Install dependencies using yarn
RUN yarn

# Copy the entire project into the container
COPY . .

# Expose the port your app will run on
EXPOSE 4000

# Specify the command to run on container start
CMD ["yarn", "dev"]