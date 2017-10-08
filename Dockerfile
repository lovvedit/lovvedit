FROM node:8.6.0@sha256:a8918e06476bef51ab83991aea7c199bb50bfb131668c9739e6aa7984da1c1f6

LABEL name="lovvedit_api"
LABEL version="1.0.0"
LABEL maintainer="strattadb@gmail.com"

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY package.json yarn.lock /usr/src/app/
RUN yarn install

# Bundle app source
COPY . /usr/src/app

EXPOSE 44300
CMD ["./scripts/start"]
