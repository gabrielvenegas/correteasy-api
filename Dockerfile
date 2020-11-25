FROM node:12.19.0-alpine3.12

RUN mkdir /app

WORKDIR /app

COPY package.json /app

RUN npm install --silent

COPY . /app

EXPOSE 8080

CMD ["yarn", "dev"]
