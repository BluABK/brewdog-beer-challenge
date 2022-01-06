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
          <BeerInfo
              :name="beer.name"
              :tagLine="beer.tagline"
              :abv="beer.abv"
              :description="beer.description"
              :initImageUrl="beer.image_url"
              :imageSizeHeightPx="100" />
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
import axios from "axios";
import BeerInfo from "@/components/BeerInfo";

export default {
  name: 'BeerList',
  components: {BeerInfo},
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
    /**
     * Shows beer details of given beer object.
     * @param beer Beer object.
     */
    showBeerDetails: function(beer) {
      let clonedBeer = JSON.parse(JSON.stringify(beer));
      // Emit a copy of the beer to avoid modifying the original "template".
      this.$emit('selectBeer', clonedBeer);
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

.element-spacer {
  height: 10px;
}
</style>