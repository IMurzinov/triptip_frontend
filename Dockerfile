FROM node:16-alpine as build

ENV DEBIAN_FRONTEND=noninteractive


WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest

COPY --from=build /app/build /app/build
COPY nginx.conf /etc/nginx

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
