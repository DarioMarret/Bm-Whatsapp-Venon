FROM node:alpine

WORKDIR /BM-WHATSAPP-VENNOM

COPY package*.json ./

RUN npm install -g npm@

RUN npm install

COPY . .

CMD ["npm", "start"]