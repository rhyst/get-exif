FROM node:14.5.0

RUN apt update
RUN apt install -y exif

WORKDIR /app/

COPY package*.json ./

RUN npm install

COPY index.js index.js

EXPOSE 3001

CMD [ "node", "index.js" ]
