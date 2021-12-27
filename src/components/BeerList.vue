<template>
  <div class="beer-list-screen">
    <h1>{{ msg }}</h1>

    <!-- Buttons to choose list or grid view -->
    <button onclick="listView()"><i class="fa fa-bars"></i>List</button>
    <button onclick="gridView()"><i class="fa fa-th-large"></i>Grid</button>
    <div class="element-spacer"></div>

    <ul v-if="errors && errors.length">
      <li v-for="error of errors" v-bind:key="error">
        {{error.message}}
      </li>
    </ul>

    <ul class="beer-list">
      <li v-for="beer in beers" v-bind:key="beer.id" class="beer-item">
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
      </li>
    </ul>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'BeerList',
  props: {
    msg: String
  },
  data () {
    return {
      errors: [],
      beers: []
    }
  },
  mounted () {
    axios
        .get('https://api.punkapi.com/v2/beers')
        // .get('https://api.punkapi.com/v2/beers?ids=1|2|3|4|5')
        .then(response => (this.beers = response.data))
        .catch(e => {
          this.errors.push(e)
        })
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