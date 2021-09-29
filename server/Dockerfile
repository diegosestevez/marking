FROM node:14-slim

# WORKDIR /usr/src/app
WORKDIR /server

COPY package*.json ./

ENV DATA_IP=database

ENV DB_LOCAL='mongodb://database:27017/DB'

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start"]