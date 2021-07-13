FROM node:16.4.2-slim

RUN apt update
RUN apt -y upgrade

USER node

COPY --chown=node ./package.json /app/
COPY --chown=node ./package-lock.json /app/
COPY --chown=node ./.eslintrc.js /app/
COPY --chown=node ./tsconfig.json /app/
WORKDIR /app

RUN npm install
COPY --chown=node ./src /app/src

RUN npm run tsc

COPY --chown=node ./src/Env /app/build/Env

CMD ["npm", "run", "start:prd"]
