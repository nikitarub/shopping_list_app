FROM node:16
WORKDIR /app/app
ADD . /app
RUN npm install
ENTRYPOINT [ "yarn", "start" ]
