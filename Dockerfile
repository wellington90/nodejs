FROM node:16-alpine

WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

COPY package*.json /usr/src/app/
RUN npm install
RUN npm install --save @sentry/node @sentry/tracing

COPY . /usr/src/app


ENV PORT 5000
EXPOSE $PORT
CMD [ "npm", "start" ]
