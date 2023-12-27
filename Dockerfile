FROM node:18 as builder

WORKDIR /usr/src

COPY . .

RUN npm install

RUN npm run build

FROM node:18

WORKDIR /usr/src/app

COPY --from=builder /usr/src/build .

RUN npm install -g serve

CMD [ "serve", "-sn" ]