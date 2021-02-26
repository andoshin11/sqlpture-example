FROM node:14.16.0-alpine

ENV NODE_ENV production

WORKDIR /app
RUN apk --update add tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    apk del tzdata && \
    rm -rf /var/cache/apk/*

ADD server/package.json ./package.json
ADD server/yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile --production=false

ADD server/tsconfig.json ./tsconfig.json
ADD server/nodemon.json ./nodemon.json

CMD [ "yarn", "run", "dev" ]
