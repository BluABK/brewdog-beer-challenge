// vue.config.js file to be placed in the root of your repository.

module.exports = {
    // For GitHub pages, aliases / to be repo subdir.
    publicPath: process.env.NODE_ENV === 'production'
        ? '/brewdog-beer-challenge/'
        : '/'
}