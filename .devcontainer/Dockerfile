# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.140.1/containers/javascript-node/.devcontainer/base.Dockerfile

# [Choice] Node.js version: 14, 12, 10
ARG VARIANT="14-buster"
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}

COPY library-scripts/*.sh /tmp/library-scripts/ 

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && bash /tmp/library-scripts/azcli-debian.sh

RUN npm install -g serverless
