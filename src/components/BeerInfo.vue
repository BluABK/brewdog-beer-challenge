<template>
  <div class="beer-info">
    <img class="beer-image" alt="Beer image" :src="imageUrl" :height="imageSizeHeightPx">
    <div class="beer-item-name">
      {{name}}
    </div>
    <div class="beer-item-spacer"></div>
    <div class="beer-item-tagline">
      {{tagLine}}
    </div>
    <div class="beer-item-spacer"></div>
    <div class="beer-item-abv">ABV: {{abv}}</div>
    <div class="beer-item-spacer"></div>
    <div class="beer-item-description"><p>{{description}}</p></div>
  </div>
</template>

<script>
export default {
  name: "BeerInfo",
  props: {
    initBeer: Object,
    name: String,
    tagLine: String,
    abv: Number,
    description: String,
    initImageUrl: String,
    missingImageUrl: {
      default: "../assets/beer404.png",
      type: String
    },
    imageSizeHeightPx: {
      default: 200,
      type: Number
    }
  },
  computed: {
    imageUrl: function() {
      if (this.initImageUrl) return this.initImageUrl;

      return this.missingImageUrl;
    }
  }
}
</script>

<style scoped>
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

.beer-item-spacer {
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