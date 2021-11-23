FROM node:16
WORKDIR /app/app
ADD ./app/package.json /app/app/
RUN npm install
ADD . /app
ENTRYPOINT [ "npm", "start" ]
