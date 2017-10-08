FROM node:8.6.0

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
