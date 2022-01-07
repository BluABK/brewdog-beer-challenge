<template>
  <div id="app">
    <BeerDetails
        msg="Beer Details"
        :isVisible="showBeerDetailsComponent"
        :initBeer="selectedBeer"
        :selectedBeer.sync="selectedBeer"
        @showBeerList="showBeerList"/>
    <BeerList
        msg="Beers"
        :isVisible="showBeerListComponent"
        :selectedBeer="selectedBeer"
        @selectBeer="selectBeer"/>
  </div>
</template>

<script>
import BeerList from "@/components/BeerList";
import BeerDetails from "@/components/BeerDetails";

export default {
  name: 'App',
  data () {
    return {
      showBeerDetailsComponent: false,
      showBeerListComponent: true,
      selectedBeer: null,
      beers: []
    }
  },
  components: {
    BeerList,
    BeerDetails
  },
  methods: {
    selectBeer: function (beer) {
      this.selectedBeer = beer;
      this.showBeerDetails();
    },
    stashBeer: function() {
      this.beers.push(this.selectedBeer);
      this.selectedBeer = null;
    },
    showBeerList: function () {
      this.stashBeer();
      this.showBeerDetailsComponent = false;
      this.showBeerListComponent = true;
    },
    showBeerDetails: function () {
      this.showBeerListComponent = false;
      this.showBeerDetailsComponent = true;
    }
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
