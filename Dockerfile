FROM node:10-alpine AS builder

WORKDIR /app

COPY package*.json /app/
RUN npm install

ENV NODE_ENV=production

COPY . /app/
RUN npm run tsc

FROM node:10-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json /app/
RUN npm install --production --no-optional

COPY --from=builder /app/dist /app

ENTRYPOINT [ "node" ]
CMD [ "index.js" ]
