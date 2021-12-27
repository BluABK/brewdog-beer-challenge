<template>
  <div class="beer-list-screen" v-show="isVisible">
    <h1>{{ msg }}</h1>

    <div class="element-spacer"></div>

    <ul v-if="errors && errors.length">
      <li v-for="error of errors" v-bind:key="error">
        {{error.message}}
      </li>
    </ul>

    <ul class="beer-list">
      <li v-for="beer in beers" v-bind:key="beer.id">
        <div class="beer-item" @click="showBeerDetails(beer)">
          <img class="beer-image" alt="Beer image" v-bind:src="beer.image_url">
          <div class="beer-item-content">
            <div class="beer-item-name">
              {{beer.name}}
            </div>
            <div class="beer-item-spacer"></div>
            <div class="beer-item-tagline">
              {{beer.tagline}}
            </div>
            <div class="beer-item-spacer"></div>
            <div class="beer-item-abv">ABV: {{beer.abv}}</div>
            <div class="beer-item-spacer"></div>
            <div class="beer-item-description"><p>{{beer.description}}</p></div>
          </div>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'BeerList',
  props: {
    // beerListVisible: Boolean,
    msg: String,
    selectedBeer: {
      default: null,
      type: Object
    }
  },
  computed: {
    isVisible() {
      return this.$attrs.isVisible;
    }
  },
  data () {
    return {
      // isVisible: false,
      errors: [],
      beers: []
    }
  },
  mounted () {
    axios
        .get('https://api.punkapi.com/v2/beers')
        .then(response => (this.beers = response.data))
        .catch(e => {
          this.errors.push(e)
        })
  },
  methods: {
    showBeerDetails: function(beer) {
      this.$emit('selectBeer', beer);
      console.info("Show details for beer", beer);
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
:root {
  --beer-list-bgcolor: #bfbfbf;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.beer-list {
  margin-top: 1px;
  display: inline-block;
}

.beer-item img {
  height: 100px;
}

.beer-item {
  padding: 10px;
  border: 1px solid grey;
  width: 400px;
  height: 400px;
  overflow: hidden;
}

.beer-item:hover {
  background-color: #e3e3e3;
  cursor: pointer;
}

.beer-item p {
  text-align: left;
}

.beer-item-spacer {
  height: 10px;
}

.element-spacer {
  height: 10px;
}

.beer-item-name {
  font-weight: bolder;
  font-size: 130%;
}

.beer-item-tagline {
  font-weight: bold;
  font-size: 85%;
}

.beer-item-abv {
  font-weight: bold;
}

</style>