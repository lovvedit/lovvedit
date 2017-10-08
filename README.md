# lovvedit

> Media recommendation website.

[![Build Status](https://travis-ci.org/lovvedit/lovvedit.svg?branch=master)](https://travis-ci.org/lovvedit/lovvedit)
[![codecov](https://codecov.io/gh/lovvedit/lovvedit/branch/master/graph/badge.svg)](https://codecov.io/gh/lovvedit/lovvedit)
[![Dependencies Status](https://david-dm.org/lovvedit/lovvedit.svg)](https://david-dm.org/lovvedit/lovvedit)
[![Development Dependencies Status](https://david-dm.org/lovvedit/lovvedit/dev-status.svg)](https://david-dm.org/lovvedit/lovvedit?type=dev)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Table of Contents

* [Introduction](#introduction)
* [Getting Started](#getting-started)
  * [Requirements](#requirements)
  * [Installation](#installation)
* [Setting Up Development Environment](#setting-up-development-environment)
* [Testing](#testing)
* [Contributing](#contributing)
* [FAQ](#faq)
* [Maintainers](#maintainers)
* [License](#license)

## Introduction

lovvedit is a website to recommend others stuff (books, movies, tv shows, etc) you, well, loved.
So, for example, when you run out of shows to binge-watch, you can go here and read what other
people enjoyed and maybe give those things a try.

## Getting Started

### Requirements

You'll need [Docker](https://docs.docker.com/engine/installation/),
[Docker Compose](https://docs.docker.com/compose/install/)
and [Git](https://git-scm.com/) installed in your
machine for development.

### Installation

Clone the repo and build the Docker containers:

```bash
git clone https://github.com/lovvedit/lovvedit.git
cd lovvedit
docker-compose build
```

## Setting up Development Environment

Generate the file with environmental varibles:

```bash
scripts/gen_env_file
```

This will create a file `.env` in the project root directory.
Some variables are left blank on purpose. Fill manually the empty variables.

Start the application:

```bash
docker-compose up
```

Now the application should be listening on port 80.
Go to [http://api.localhost/graphiql](http://api.localhost/graphiql) and check that
you see the GraphiQL page.

### Installing Node dependencies on host system

To make use of linters and other development tools, you must `yarn install`
on your machine. Don't worry, the `node_modules` folder inside the container
and the one in your machine won't cause any trouble.

## Testing

You can test the application inside the Docker container with:

```bash
docker-compose exec node yarn test
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## FAQ

## Maintainers

Current maintainers:

* Diego Stratta <[strattadb@gmail.com](mailto:strattadb@gmail.com)>

## License

[MIT](https://opensource.org/licenses/MIT)
