FROM node:20-alpine

RUN mkdir -p /home/app/node/api-skinsavvy

WORKDIR /home/app/node/api-skinsavvy

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm run migrate

EXPOSE 8080

CMD [ "npm", "run", "start" ]
