FROM node:alpine

WORKDIR /BM-WHATSAPP-VENNOM

RUN apk add libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libgbm1 libasound2 libpangocairo-1.0-0 libxss1 libgtk-3-0

COPY package*.json ./

RUN npm install -g npm@

RUN npm install

RUN npm i puppeteer

COPY . .

CMD ["npm", "start"]