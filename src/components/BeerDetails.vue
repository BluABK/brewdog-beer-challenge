<template>
  <div class="beer-details-screen" v-show="isVisible">
    <div class="beer-details-screen-content">
      <button @click="returnToBeerList">Back to list</button>
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
          <div class="ingredients">
            <div class="ingredients-content">
              <div class="hops ingredients-element" v-if="beerIngredientsHops.length > 0">
                <div class="hops-heading ingredients-heading">Hops</div>
                <HopsList :initHops="beerIngredientsHops"/>
              </div>
              <div class="malts ingredients-element" v-if="beerIngredientsMalts.length > 0">
                <div class="malts-heading ingredients-heading">Malts</div>
                <MaltsList :initMalts="beerIngredientsMalts"/>
              </div>
              <div class="methods ingredients-element">
                <div class="methods-heading ingredients-heading">Methods</div>

                  <div class="methods-subheading" v-if="beerMethods.mash_temp.length > 0">
                    <h1>Mash temperatures</h1>
                    <MethodMashTempList :initMashTemps="beerMethods.mash_temp"/>
                  </div>

                  <div class="methods-fermentation methods-subheading" v-if="beerMethods.fermentation">
                    <h1 class="">Fermentation</h1>
                    <IngredientEntry
                                     :initState="beerMethods.fermentation.state"
                                     :amount="beerMethods.fermentation.temp.value"
                                     :unit="beerMethods.fermentation.temp.unit"
                                     v-bind:state.sync="beerMethods.fermentation.state"
                    />
                  </div>

                  <div class="methods-twist methods-subheading" v-if="beerMethods.twist">
                    <h1>Twist</h1>
                    <IngredientEntry
                        :initState="beerMethods.twist_state"
                        :twist="beerMethods.twist"
                        v-bind:state.sync="beerMethods.twist_state" />
                  </div>
              </div> <!-- beer-item-methods //-->
            </div> <!-- ingredients-content //-->
          </div> <!-- ingredients //-->
        </div> <!-- beer-item-content //-->
      </div> <!-- beer-item //-->
    </div>  <!-- beer-details-screen-content //-->
  </div>  <!-- beer-details-screen  //-->
</template>

<script>
import IngredientEntry from "@/components/IngredientEntry";
import HopsList from "@/components/HopsList";
import MaltsList from "@/components/MaltsList";
import MethodMashTempList from "@/components/MethodMashTempList";
export default {
  name: "BeerDetails",
  components: {MethodMashTempList, HopsList, MaltsList, IngredientEntry},
  props: {
    msg: String,
    initBeer: {
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
      if (this.selectedBeer != null) {
        if (Object.hasOwn(this.selectedBeer, "ingredients")) {
          if (this.selectedBeer.ingredients != null && Object.hasOwn(this.selectedBeer.ingredients, "hops")) {
            // Add in custom tracking of processing each item
            for (let i = 0; i < this.selectedBeer.ingredients.hops.length; i++) {
              this.$set(this.selectedBeer.ingredients.hops[i], "state", "IDLE");
              this.$set(this.selectedBeer.ingredients.hops[i], "disabled", null);
            }

            return this.selectedBeer.ingredients.hops;
          }

        }
      }

      return [];
    },
    beerIngredientsMalts() {
      if (this.selectedBeer != null && Object.hasOwn(this.selectedBeer, "ingredients")) {
        if (this.selectedBeer.ingredients != null && Object.hasOwn(this.selectedBeer.ingredients, "malt")) {
          // Add in custom tracking of processing each item
          for (let i = 0; i < this.selectedBeer.ingredients.malt.length; i++) {
            this.$set(this.selectedBeer.ingredients.malt[i], "state", "IDLE");
            this.$set(this.selectedBeer.ingredients.malt[i], "disabled", null);
          }

          return this.selectedBeer.ingredients.malt;
        }
      }

      return [];
    },
    beerMethods() {
      let mashTemps = [];
      let fermentation = null;
      let twist = null;
      let twistState = null;

      if (this.selectedBeer != null && Object.hasOwn(this.selectedBeer, "method")) {
        if (Object.hasOwn(this.selectedBeer.method, "mash_temp")) {
          mashTemps = this.selectedBeer.method.mash_temp;

          if (this.selectedBeer.method.mash_temp.length > 0) {
            // Add in custom tracking of processing each item
            for (let i = 0; i < this.selectedBeer.method.mash_temp.length; i++) {
              // Convert duration in minutes to more easily computable seconds.
              let timeRemaining = this.selectedBeer.method.mash_temp[i].duration * 60;

              // Add in custom tracking of processing the mash temp
              this.$set(this.selectedBeer.method.mash_temp[i], "state", "IDLE");
              this.$set(this.selectedBeer.method.mash_temp[i], "disabled", null);
              this.$set(this.selectedBeer.method.mash_temp[i], "time_remaining", timeRemaining);
            }
          }
        }

        if (Object.hasOwn(this.selectedBeer.method, "fermentation")) {
          fermentation = this.selectedBeer.method.fermentation;

          // Add in custom tracking of processing the fermentation
          this.$set(this.selectedBeer.method.fermentation, "state", "IDLE");
          this.$set(this.selectedBeer.method.fermentation, "disabled", null);
        }

        if (Object.hasOwn(this.selectedBeer.method, "twist")) {
          twist = this.selectedBeer.method.twist;

          if (this.selectedBeer.method.twist != null) {
            twistState = "IDLE";

            // Add in custom tracking of processing the twist
            this.$set(this.selectedBeer.method, "twist_state", twistState);
            this.$set(this.selectedBeer.method, "twist_disabled", null);
          }
        }
      }

      return {
        mash_temp: mashTemps,
        fermentation: fermentation,
        twist: twist,
        twist_state: twistState
      };
    }
  },
  data() {
    return {
      selectedBeer: this.initBeer
    }
  },
  methods: {
    /**
     * Emits the updated beer object to parent.
     */
    updateSelectedBeer: function () {
      this.$emit('update:beer', this.selectedBeer);
    },
    reset: function () {
      this.selectedBeer = null;
    },
    showBeerList: function () {
      this.$emit('showBeerList');
    },
    returnToBeerList: function () {
      this.updateSelectedBeer();
      // this.$emit('selectedBeer', this.selectedBeer);
      // this.reset();
      this.showBeerList();
    },
  },
  watch: {
    initBeer: {
      handler() {
        // If initBeer changes, select that one instead.
        this.selectedBeer = this.initBeer;
        this.updateSelectedBeer();
      },
      immediate: true

    }
  }
}

</script>

<style scoped>

ul {
  /*float:left;*/
}

.beer-details-screen {
  text-align:center;
}

.beer-details-screen-content {
  margin: auto;
  width:80vw;
}

.beer-item {
}

.beer-item-content {
}

.beer-item img {
  height: 200px;
}

.hops {
  /*background-color: mediumpurple;*/
  float: left;
  width: 33.3%;
  /*border-left: 1px solid black;*/
}

.malts {
  /*background-color: coral;*/
  float: left;
  width: 33.3%;
  /*border-left: 1px solid black;*/
}

.methods {
  /*background-color: cornflowerblue;*/
  float: left;
  width: 33.3%;
  /*border-left: 1px solid black;*/
  /*border-right: 1px solid black;*/
}

.ingredients-element {
  /*padding: 0 10px 0 10px;*/
}

.hops-content {
  /*font-weight: bold;*/
}

.ingredients {
  /*margin: auto;*/
  text-align:center;
  /*height:300px;*/
  /*width:80vw;*/
  /*overflow: scroll;*/

}

.ingredients-content {
  /*height:100%;*/
  /*height: 50vh;*/
  width:100%;
  margin: auto;
  text-align: left;
  /*background-color: #b7b7b7;*/
  background-color: mediumpurple;
}

.ingredients-heading {
  text-align: center;
  font-weight: bold;
  font-size: 125%;
}

.methods-subheading {
  padding-bottom: 5px;
}

.methods-subheading h1 {
  font-weight: bold;
  font-size: 100%;
}

</style>