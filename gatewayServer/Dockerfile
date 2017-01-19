FROM node:latest

# Create app directory
RUN mkdir -p /gatewayServer
WORKDIR /gatewayServer


# Install app dependencies
COPY package.json /gatewayServer/
RUN npm install

# Bundle app source
COPY . /gatewayServer
COPY ../config /config

EXPOSE 3000
CMD [ "npm", "start" ]