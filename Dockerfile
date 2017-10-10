FROM node:8.6.0@sha256:ea837dc6bbfec507cf84b84ad44a24cafd4806a0f5336d5ad727f86e4c0a9292

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
