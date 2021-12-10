FROM node:16 AS build
WORKDIR /app
ADD ./app /app
RUN npm install && npm run build

FROM nginx
COPY --from=build /app/build /usr/share/nginx/html
