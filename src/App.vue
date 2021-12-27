<template>
  <div id="app">
    <BeerList msg="Beers"/>
  </div>
</template>

<script>
import BeerList from "@/components/BeerList";

export default {
  name: 'App',
  components: {
    BeerList
  },
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
