ARG VARIANT=16-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

WORKDIR /pathfinder
COPY . /pathfinder
ENV REACT_APP_PORT=3000
RUN cd app && yarn install && cd ..
RUN cd app && yarn build && cd ..
CMD ["node","app/main.js"]