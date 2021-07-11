FROM node:16.4.2-slim

RUN apt update
RUN apt -y upgrade
RUN apt install -y python
RUN apt install -y ffmpeg
RUN apt install -y make
RUN apt install -y gcc
RUN apt install -y g++

USER node

COPY --chown=node ./package.json /app/
COPY --chown=node ./package-lock.json /app/
COPY --chown=node ./.eslintrc.js /app/
COPY --chown=node ./tsconfig.json /app/
WORKDIR /app

RUN mkdir shell
RUN npm install
COPY --chown=node ./src /app/src
RUN npm run tsc

CMD ["npm", "run", "start:prd"]
