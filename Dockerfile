# FROM node:alpine

# WORKDIR /BM-WHATSAPP-VENNOM

# RUN apk add chromium

# COPY package*.json ./

# RUN npm install -g npm@

# RUN npm install

# COPY . .

# CMD ["npm", "start"]
FROM alpine

RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      npm 

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /BM-WHATSAPP-VENNOM

COPY package*.json ./

RUN npm install -g npm@

RUN npm install puppeteer@13.5.0

RUN npm install

# RUN addgroup -S pptruser && adduser -S -G pptruser pptruser \
#     && mkdir -p /home/pptruser/Downloads /app \
#     && chown -R pptruser:pptruser /home/pptruser \
#     && chown -R pptruser:pptruser /app \
#     && chown -R pptruser:pptruser /BM-WHATSAPP-VENNOM

# USER pptruser

COPY . .

CMD ["npm", "start"]