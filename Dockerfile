FROM bitnami/express:latest
WORKDIR /usr/src/app
COPY ./ ./
RUN npm install
CMD node --watch /usr/src/app/bin/www
WORKDIR /