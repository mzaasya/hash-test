FROM node:20-slim as node
ENV TZ Asia/Jakarta
WORKDIR /usr/src/app
COPY . .

ARG FIREBASE_API_KEY
ARG FIREBASE_AUTH_DOMAIN
ARG FIREBASE_PROJECT_ID
ARG FIREBASE_STORAGE_BUCKET
ARG FIREBASE_MESSAGING_SENDER_ID
ARG FIREBASE_APP_ID

RUN echo "export const environment = {production: true,apiUrl: 'https://api.hash-test.site/',firebaseConfig: {apiKey: '${FIREBASE_API_KEY}',authDomain: '${FIREBASE_AUTH_DOMAIN}',projectId: '${FIREBASE_PROJECT_ID}',storageBucket: '${FIREBASE_STORAGE_BUCKET}',messagingSenderId: '${FIREBASE_MESSAGING_SENDER_ID}',appId: '${FIREBASE_APP_ID}'}};" > src/environments/environment.production.ts

RUN npm install
RUN npm run build:prod
FROM nginx:alpine
COPY --from=node /usr/src/app/dist/browser /usr/share/nginx/html
COPY /default.conf /etc/nginx/conf.d/default.conf