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

### Dev Dependencies: Testing
| Name                                                                        | Version    | Reason                                                   |
|-----------------------------------------------------------------------------|------------|----------------------------------------------------------|
| [Jest](hhttps://vue-test-utils.vuejs.org/installation/#semantic-versioning) | \>= 24.9.0 | Testing framework.                                       |
| [Vue-CLI](https://cli.vuejs.org/guide/installation.html)                    | \>= 4.5.15 | Vue CLI required for Jest                                |

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

### Running unit test suites (Jest)
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Design decisions
* BeerList is the component that queries the API.
* BeerList sends a copy of an API beer entry to BeerDetails (brewery) so that you can brew the same kind multiple times
  without having to query the API for a new set every time.
* As per requirement the app keeps track of modification to a beer item and when you exit details screen, the beer is appended to a list for later use. It is currently not reachable by the end user, but in future it could be used for letting the user brew multiple beers at the same time, or to keep track of what they had done so far. 
* "dry hop" are treated same as "start", as they were not in the requirements/spec, but it seems they can be added at different times
  ````
  "Dry hopping is a brewing term for adding hops late in the brewing process???either during fermentation or conditioning."
  ````

### Assumptions
* hop ordering implementation requirement only states that `add=end` can't be DONE until all the hops with `add=middle` are done, but I also made it depend on all the hops with `add=start` as that seemed more logical, however this can be swiftly changed by the removal of 21 chars in a single if statement.