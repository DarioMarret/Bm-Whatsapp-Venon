FROM node:alpine

WORKDIR /BM-WHATSAPP-VENNOM

RUN apk add -y chromium

COPY package*.json ./

RUN npm install -g npm@

RUN npm install

RUN npm i puppeteer

COPY . .

CMD ["npm", "start"]