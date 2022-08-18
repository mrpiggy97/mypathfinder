ARG VARIANT=16-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

WORKDIR /pathfinder
COPY . /pathfinder
ENV REACT_APP_PORT=3000
RUN yarn install
CMD ["node","app/main.js"]