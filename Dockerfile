FROM node:18 as build

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

EXPOSE 80

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/src/app/build /usr/share/nginx/html