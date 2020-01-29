FROM node:12.14 AS builder

WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build.production --if-present

FROM nginx:1.17

COPY --from=builder /usr/src/app/dist/release/ /usr/share/nginx/html
COPY --from=builder /usr/src/app/docker/common/config/nginx.conf /etc/nginx/conf.d/default.conf
