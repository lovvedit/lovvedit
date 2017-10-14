FROM node:8.7.0@sha256:180c145d0c83844ad118221a665ad657639e8011d305c0e066d1799718d46375

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
