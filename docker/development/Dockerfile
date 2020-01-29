FROM node:12.14

WORKDIR /usr/src/app
COPY . .
RUN npm install && npm install pm2 -g

CMD ["pm2-runtime", "npm", "--", "start"]
