FROM node:14-slim

# WORKDIR /usr/src/app
WORKDIR /client

COPY package*.json ./

ENV DATA_IP=database

ENV REACT_APP_BACK_END=localhost:8000

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]