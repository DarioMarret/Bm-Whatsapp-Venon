FROM ubuntu

RUN apt-get update

RUN apt-get install chromium-browser -y

RUN export DEBIAN_FRONTEND=noninteractive

RUN apt-get install -y tzdata

RUN ln -fs /usr/share/zoneinfo/America/Guayaquil /etc/localtime 

RUN dpkg-reconfigure -f noninteractive tzdata

FROM node:alpine

WORKDIR /BM-WHATSAPP-VENNOM

COPY package*.json ./

RUN npm install -g npm@

RUN npm install

COPY . .

CMD ["npm", "start"]