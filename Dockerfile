FROM node:alpine

WORKDIR /BM-WHATSAPP-VENNOM

COPY package*.json ./

RUN sudo apt-get install chromium-browser

RUN npm install -g npm@

RUN npm install

COPY . .


CMD ["npm", "start"]