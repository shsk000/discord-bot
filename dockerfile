FROM node:12.16.0

RUN apt update
RUN apt -y upgrade
RUN apt install -y ffmpeg

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

# build完了後に/dist内にアプリのjavascriptファイルがあるので、それをnodeコマンドで実行しています。
# javascriptファイルを、サーバーで起動するにはnodeコマンドを使います。
# CMD ["node", "dist/[アプリの起動ファイル名].js"]
