# Brewdog Beer Challenge

## [Live preview](https://bluabk.github.io/brewdog-beer-challenge/) (GitHub Pages)

## Project setup

### Dependencies
| Name                                             | Version    | Reason                                                    |
|--------------------------------------------------|------------|-----------------------------------------------------------|
| [NodeJS](https://nodejs.org/)                    | \>= 16.0.0 | Required JavaScript runtime.                              |
| [NPM](https://www.npmjs.com/)                    | \>=8.3.0   | NodeJS package manager.                                   |
| [Vue](https://vuejs.org/)                        | 2.6.11     | Progressive JavaScript framework the web app is built on. |
| [Axios](https://axios-http.com/docs/intro)       | 0.24.0     | API request handling for PUNK API v2.                     |
|

### Install using NPM
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Compiles and minifies for GitHub Pages (production live test)
NB: builds into docs/
```
npm run build-into-docs
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Design decisions
* BeerList sends a copy of an API beer entry to BeerDetails (brewery) so that you can brew the same kind multiple times
  without having to query the API for a new set every time.

### Assumptions
* hop ordering implementation states only states that `add=end` can't be DONE until all the hops with `add=middle` are done, but I also made it depend on all the hops with `add=start` as that seemed more logical, however this can be swiftly changed by the removal of 21 chars in a single if statement.