FROM node:20-slim as node
ENV TZ Asia/Jakarta
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build:prod
FROM nginx:alpine
COPY --from=node /usr/src/app/dist/browser /usr/share/nginx/html
COPY /default.conf /etc/nginx/conf.d/default.conf