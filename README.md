# brewdog-beer-challenge

## Project setup
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

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# FIXME: Add to readme properly

## Design decisions
* BeerList sends a copy of an API beer entry to BeerDetails (brewery) so that you can brew the same kind multiple times
  without having to query the API for a new set every time. 