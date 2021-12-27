<template>
  <div class="beer-details-screen" v-show="isVisible">
    <button @click="showBeerList">Back to list</button>
    <h1>{{ msg }}</h1>

    <div class="beer-item" >
      <img class="beer-image" alt="Beer image" v-bind:src="beerImageUrl">
      <div class="beer-item-content">
        <div class="beer-item-name">
          {{beerName}}
        </div>
        <div class="beer-item-spacer"></div>
        <div class="beer-item-tagline">
          {{beerTagline}}
        </div>
        <div class="beer-item-spacer"></div>
        <div class="beer-item-abv">ABV: {{beerAbv}}</div>
        <div class="beer-item-spacer"></div>
        <div class="beer-item-description"><p>{{beerDescription}}</p></div>
        <div class="beer-item-hops" v-if="beerIngredientsHops.length > 0">
          Hops:
          <ul>
            <li v-for="(hop, i) in beerIngredientsHops" v-bind:key="'hops' + i + hop.name">
              <p>Name: {{hop.name}}</p>
              <p>Amount: {{hop.amount.value}} {{hop.amount.unit}}</p>
              <p>Add: {{hop.add}}</p>
              <p>Attribute: {{hop.attribute}}</p>
            </li>
          </ul>
        </div>
        <div class="beer-item-malts" v-if="beerIngredientsMalts.length > 0">
          Malts:
          <ul>
            <li v-for="(malt, i) in beerIngredientsMalts" v-bind:key="'malt' + i + malt.name">
              <p>Name: {{malt.name}}</p>
              <p>Amount: {{malt.amount.value}} {{malt.amount.unit}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="beer-item-methods">
        Methods:
        <ul>
          <li v-if="beerMethods.mash_temp.length > 0">
            <p>Mash temperatures:</p>
            <ul>
              <li v-for="(mashTemp, i) in beerMethods.mash_temp" v-bind:key="'mash_temp' + i + mashTemp.temp.value">
                <p>{{mashTemp.duration}} minutes at {{mashTemp.temp.value}} {{mashTemp.temp.unit}}.</p>
              </li>
            </ul>
          </li>

          <li v-if="beerMethods.fermentation">
            <p>Fermentation: {{beerMethods.fermentation.temp.value}} {{beerMethods.fermentation.temp.unit}}.</p>
          </li>

          <li v-if="beerMethods.twist">
            <p>Twist: {{beerMethods.twist}}.</p>
          </li>
        </ul>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "BeerDetails",
  props: {
    // beerDetailsVisible: Boolean,
    msg: String,
    selectedBeer: {
      default: null,
      type: Object
    },
    missingImageUrl: {
      default: "../assets/logo.png",
      type: String
    }
  },
  computed: {
    isVisible() {
      return this.$attrs.isVisible;
    },
    beerName() {
      if (this.selectedBeer != null && Object.hasOwn(this.selectedBeer, "name")) return this.selectedBeer.name;

      return "Beer name N/A";
    },
    beerDescription() {
      if (this.selectedBeer != null && Object.hasOwn(this.selectedBeer, "description")) return this.selectedBeer.description;

      return "Beer description N/A";
    },
    beerTagline() {
      if (this.selectedBeer != null && Object.hasOwn(this.selectedBeer, "tagline")) return this.selectedBeer.tagline;

      return "Beer tagline N/A";
    },
    beerAbv() {
      if (this.selectedBeer != null && Object.hasOwn(this.selectedBeer, "abv")) return this.selectedBeer.abv;

      return "N/A";
    },
    beerImageUrl() {
      if (this.selectedBeer != null && Object.hasOwn(this.selectedBeer, "image_url")) return this.selectedBeer.image_url;

      return this.missingImageUrl;
    },
    beerIngredientsHops() {
      if (this.selectedBeer != null && Object.hasOwn(this.selectedBeer, "ingredients")) {
        if (this.selectedBeer.ingredients != null && Object.hasOwn(this.selectedBeer.ingredients, "hops")) {
          return this.selectedBeer.ingredients.hops;
        }
      }

      return [];
    },
    beerIngredientsMalts() {
      if (this.selectedBeer != null && Object.hasOwn(this.selectedBeer, "ingredients")) {
        if (this.selectedBeer.ingredients != null && Object.hasOwn(this.selectedBeer.ingredients, "malt")) {
          return this.selectedBeer.ingredients.malt;
        }
      }

      return [];
    },
    beerMethods() {
      if (this.selectedBeer != null && Object.hasOwn(this.selectedBeer, "method")) return this.selectedBeer.method;

      return {
        mash_temp: [],
        fermentation: null,
        twist: null
      };
    }
  },
  data() {
    return {
      // isVisible: false
    }
  },
  methods: {
    showBeerList: function(beer) {
      this.$emit('showBeerList');
      this.$emit('selectBeer', null);
      console.info("Show beer list", beer);
    }
  }
}
</script>

<style scoped>

ul {
  /*float:left;*/
}

.beer-item img {
  height: 100px;
}

</style>