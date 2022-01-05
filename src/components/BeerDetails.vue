<template>
  <div class="beer-details-screen" v-show="isVisible">
    <div class="beer-details-screen-content">
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
          <div class="ingredients">
            <div class="ingredients-content">
              <div class="hops ingredients-element" v-if="beerIngredientsHops.length > 0">
                <div class="hops-heading ingredients-heading">Hops</div>
                <HopsList :initHops="beerIngredientsHops"/>
              </div>
              <div class="malts ingredients-element" v-if="beerIngredientsMalts.length > 0">
                <div class="malts-heading ingredients-heading">Malts</div>
                  <div class="malts-content" v-for="(malt, i) in beerIngredientsMalts" v-bind:key="'malt' + i + malt.name">
                    <IngredientEntry
                        :initState="beerIngredientsMalts[i].state"
                        :amount="beerIngredientsMalts[i].amount.value"
                        :unit="beerIngredientsMalts[i].amount.unit"
                        :name="beerIngredientsMalts[i].name"
                        v-bind:state.sync="beerIngredientsMalts[i].state" />
                  </div>
              </div>
              <div class="methods ingredients-element">
                <div class="methods-heading ingredients-heading">Methods</div>

                  <div class="methods-subheading" v-if="beerMethods.mash_temp.length > 0">
                    <h1>Mash temperatures</h1>
                    <div class="methods-mashtemp-content" v-for="(mashTemp, i) in beerMethods.mash_temp" v-bind:key="'mash_temp' + i + mashTemp.temp.value">
                        <Countdown v-if="mashTemp.duration"
                            :initialTime="beerMethods.mash_temp[i].time_remaining"
                            :description="beerMethods.mash_temp[i].duration + ' minutes at ' + beerMethods.mash_temp[i].temp.value + ' ' + beerMethods.mash_temp[i].temp.unit"
                            v-bind:timeRemaining.sync="beerMethods.mash_temp[i].time_remaining"
                            v-bind:timerState.sync="beerMethods.mash_temp[i].state"
                        />
                        <IngredientEntry v-else
                            :initState="beerMethods.mash_temp[i].state"
                            :amount="beerMethods.mash_temp[i].temp.value"
                            :unit="beerMethods.mash_temp[i].temp.unit"
                            v-bind:state.sync="beerMethods.mash_temp[i].state"
                        />
                    </div>
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
import Countdown from "@/components/Countdown";
import IngredientEntry from "@/components/IngredientEntry";
import HopsList from "@/components/HopsList";
export default {
  name: "BeerDetails",
  components: {HopsList, Countdown, IngredientEntry},
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
          if (this.selectedBeer.method.mash_temp.length > 0) {
            // Add in custom tracking of processing each item
            mashTemps = this.selectedBeer.method.mash_temp;

            for (let mashTemp of mashTemps) {
              mashTemp["state"] = "IDLE";
              // Convert duration in minutes to more easily computable seconds.
              mashTemp["time_remaining"] = mashTemp.duration * 60
            }
          }
        }

        if (Object.hasOwn(this.selectedBeer.method, "fermentation")) {
          // Add in custom tracking of processing the fermentation
          fermentation = this.selectedBeer.method.fermentation;
          fermentation["state"] = "IDLE";
        }

        if (Object.hasOwn(this.selectedBeer.method, "twist")) {
          if (this.selectedBeer.method.twist != null) {
            // Add in custom tracking of processing the twist
            twist = this.selectedBeer.method.twist;
            twistState = "IDLE";
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
      // isVisible: false
    }
  },
  methods: {
    // Utils
    uuid: function() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },
    // Own
    showBeerList: function(beer) {
      this.$emit('showBeerList');

      // Emit the updated beer object to parent upon exiting current screen.
      // this.$emit('selectBeer', this.selectedBeer);
      this.$emit('selectBeer', null);

      console.info("Show beer list", beer);
    },
    // /**
    //  * Emits the updated beer object to parent.
    //  */
    // updateBeer: function() {
    //   this.$emit('updateBeer');
    // },
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