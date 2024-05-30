FROM node:lts-iron

RUN mkdir -p /home/app/node/api-skinsavvy

WORKDIR /home/app/node/api-skinsavvy

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run compile

ARG DATABASE_URL

ENV DATABASE_URL=${DATABASE_URL}

RUN npm run migrate

EXPOSE 8080

CMD [ "npm", "run", "start" ]
