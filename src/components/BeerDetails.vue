<template>
  <div class="beer-details-screen" v-show="isVisible">
    <div class="beer-details-screen-content">
      <button @click="returnToBeerList">Back to list</button>
      <h1>{{ pageTitle }}</h1>

      <div class="beer-item" >
        <div class="beer-item-content">
          <BeerInfo :name="beerName" :tagLine="beerTagline" :abv="beerAbv" :description="beerDescription" :initImageUrl="beerImageUrl" />
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
              <div class="methods ingredients-element" v-if="beerMethods">
                <div class="methods-heading ingredients-heading">Methods</div>
                <MethodsList
                    :initMashTemps="beerMethods.mash_temp"
                    :initFermentation="beerMethods.fermentation"
                    :initTwist="beerMethods.twist"/>
              </div> <!-- beer-item-methods //-->
            </div> <!-- ingredients-content //-->
          </div> <!-- ingredients //-->
        </div> <!-- beer-item-content //-->
      </div> <!-- beer-item //-->
    </div>  <!-- beer-details-screen-content //-->
  </div>  <!-- beer-details-screen  //-->
</template>

<script>
import HopsList from "@/components/HopsList";
import MaltsList from "@/components/MaltsList";
import MethodsList from "@/components/MethodsList";
import BeerInfo from "@/components/BeerInfo";

export default {
  name: "BeerDetails",
  components: {BeerInfo, MethodsList, HopsList, MaltsList},
  props: {
    pageTitle: String,
    initBeer: Object
  },
  computed: {
    /**
     * Determines whether this page is shown.
     * @returns {string}
     */
    isVisible() {
      return this.$attrs.isVisible;
    },
    /**
     * Computed beer name.
     * @returns {null|String} The computed value
     */
    beerName() {
      if (this.selectedBeer != null) {
        if (Object.hasOwn(this.selectedBeer, "name")) {
          return this.selectedBeer.name;
        }
      }

      return null;
    },
    /**
     * Computed beer description.
     * @returns {null|String} The computed value
     */
    beerDescription() {
      if (this.selectedBeer != null) {
        if (Object.hasOwn(this.selectedBeer, "description")) {
          return this.selectedBeer.description;
        }
      }

      return null;
    },
    /**
     * Computed beer tagline.
     * @returns {null|String} The computed value
     */
    beerTagline() {
      if (this.selectedBeer != null) {
        if (Object.hasOwn(this.selectedBeer, "tagline")) {
          return this.selectedBeer.tagline;
        }
      }

      return null;
    },
    /**
     * Computed beer ABV.
     * @returns {Number|null} The computed value
     */
    beerAbv() {
      if (this.selectedBeer != null) {
        if (Object.hasOwn(this.selectedBeer, "abv")) {
          return this.selectedBeer.abv;
        }
      }

      return null;
    },
    /**
     * Computed beer image URL.
     * @returns {null|String} The computed value
     */
    beerImageUrl() {
      if (this.selectedBeer != null) {
        if (Object.hasOwn(this.selectedBeer, "image_url")) {
          return this.selectedBeer.image_url;
        }
      }

      return null;
    },
    /**
     * Computed list of beer ingredient hops.
     *
     * Injects custom properties "state": String and "disabled": Boolean to each item,
     * which are used for keeping track of states.
     * @returns {Object[]} The computed (and injected) hops list
     */
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
    /**
     * Computed list of beer ingredient malts.
     *
     * Injects custom properties "state": String and "disabled": Boolean to each item,
     * which are used for keeping track of states.
     * @returns {Object[]} The computed (and injected) malts list
     */
    beerIngredientsMalts() {
      if (this.selectedBeer != null) {
        if (Object.hasOwn(this.selectedBeer, "ingredients")) {
          if (this.selectedBeer.ingredients != null) {
            if (Object.hasOwn(this.selectedBeer.ingredients, "malt")) {
              // Add in custom tracking of processing each item
              for (let i = 0; i < this.selectedBeer.ingredients.malt.length; i++) {
                this.$set(this.selectedBeer.ingredients.malt[i], "state", "IDLE");
                this.$set(this.selectedBeer.ingredients.malt[i], "disabled", null);
              }

              return this.selectedBeer.ingredients.malt;
            }
          }
        }
      }

      return [];
    },
    /**
     * Computed list of beer methods (mash temperatures, fermentation and twist).
     *
     * If there are no methods, returns null instead of an object with nulls.
     *
     * Injects custom properties "state": String and "disabled": Boolean to each item,
     * which are used for keeping track of states.
     *
     * In the case of mash temperatures it also injects "time_remaining": Number for use in CountdownEntry.
     *
     * In order to ensure better consistency it replaces the "twist": String with an
     * object {"description": String, "state": String, "disabled": Boolean}.
     *
     * @returns {null|{mash_temp: null|Object[], fermentation: null|Object, twist: null|Object}}
     * Computed (and injected) list of beer methods mash temperatures, fermentation and twist.
     */
    beerMethods() {
      let mashTemps = [];
      let fermentation = null;
      let twistObj = null;
      let hasNoMethods = true;

      if (this.selectedBeer != null) {
        if (Object.hasOwn(this.selectedBeer, "method")) {
          hasNoMethods = false;
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
            hasNoMethods = false;
            fermentation = this.selectedBeer.method.fermentation;

            // Add in custom tracking of processing the fermentation
            this.$set(this.selectedBeer.method.fermentation, "state", "IDLE");
            this.$set(this.selectedBeer.method.fermentation, "disabled", null);
          }

          if (Object.hasOwn(this.selectedBeer.method, "twist")) {
            hasNoMethods = false;
            let twistDescription = this.selectedBeer.method.twist;

            if (this.selectedBeer.method.twist != null) {
              // Replace twist string with an object for better consistency with rest of methods.
              twistObj = {};
              this.$set(this.selectedBeer.method, "twist", twistObj);
              this.$set(this.selectedBeer.method.twist, "description", twistDescription);

              // Add in custom tracking of processing the twist
              this.$set(this.selectedBeer.method.twist, "state", "IDLE");
              this.$set(this.selectedBeer.method.twist, "disabled", null);
            }
          }
        }
      }

      // If there are no methods, return null instead of an object with nulls.
      if (hasNoMethods === true) return null;

      return {
        mash_temp: mashTemps,
        fermentation: fermentation,
        twist: twistObj,
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
    /**
     * Reset/Unset the selected beer.
     */
    reset: function () {
      this.selectedBeer = null;
    },
    /**
     * Show the beer list.
     */
    showBeerList: function () {
      this.$emit('showBeerList');
    },
    /**
     * Emit selected beer to parent and show beer list.
     */
    returnToBeerList: function () {
      this.updateSelectedBeer();
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
.beer-details-screen {
  text-align:center;
}

.beer-details-screen-content {
  margin: auto;
  width:80vw;
}

.hops {
  float: left;
  width: 33.3%;
}

.malts {
  float: left;
  width: 33.3%;
}

.methods {
  float: left;
  width: 33.3%;
}

.ingredients {
  text-align:center;

}

.ingredients-content {
  width:100%;
  margin: auto;
  text-align: left;
  background-color: mediumpurple;
}

.ingredients-heading {
  text-align: center;
  font-weight: bold;
  font-size: 125%;
}

.methods-subheading h1 {
  font-weight: bold;
  font-size: 100%;
}

</style>