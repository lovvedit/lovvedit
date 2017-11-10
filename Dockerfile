FROM node:8.9.1@sha256:552348163f074034ae75643c01e0ba301af936a898d778bb4fc16062917d0430

LABEL name="lovvedit_api"
LABEL version="1.0.0"
LABEL maintainer="strattadb@gmail.com"

# Create and change current directory.
WORKDIR /usr/src/app

# Install dependencies.
COPY package.json yarn.lock ./
RUN yarn

# Bundle app source.
COPY . .

EXPOSE 44300
CMD ["./scripts/start"]
