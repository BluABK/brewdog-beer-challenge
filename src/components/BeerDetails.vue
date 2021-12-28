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
                  <div class="hops-content" v-for="(hop, i) in beerIngredientsHops" v-bind:key="'hops' + i + hop.name">
                    <p>
                      <button class="double-state-button app-button" @click="clickedTwoStateButton($event, hop)">
                        {{hop.state}}
                      </button>
                      [Add: {{hop.add}}] {{hop.amount.value}} {{hop.amount.unit}} {{hop.name}} ({{hop.attribute}})
                    </p>
                  </div>
              </div>
              <div class="malts ingredients-element" v-if="beerIngredientsMalts.length > 0">
                <div class="malts-heading ingredients-heading">Malts</div>
                  <div class="malts-content" v-for="(malt, i) in beerIngredientsMalts" v-bind:key="'malt' + i + malt.name">
                    <p>
                      <button class="double-state-button app-button" @click="clickedTwoStateButton($event, malt)">
                        {{malt.state}}
                      </button>
                      {{malt.amount.value}} {{malt.amount.unit}} {{malt.name}}
                    </p>
                  </div>
              </div>
              <div class="methods ingredients-element">
                <div class="methods-heading ingredients-heading">Methods</div>
                  <div v-if="beerMethods.mash_temp.length > 0">
                    <div class="methods-mashtemp-heading">
                      <p>Mash temperatures:</p>
                    </div>
                    <div class="methods-mashtemp-content" v-for="(mashTemp, i) in beerMethods.mash_temp" v-bind:key="'mash_temp' + i + mashTemp.temp.value">
                      <p>
                        <button class="timer-button app-button" @click="clickedTimerButton($event, mashTemp)" v-bind:value="mashTemp.duration">{{mashTemp.state}}</button> {{mashTemp.duration}} minutes at {{mashTemp.temp.value}} {{mashTemp.temp.unit}}.
                        <span class="timer"></span>
                      </p>
                    </div>
                  </div>

                  <div class="methods-fermentation" v-if="beerMethods.fermentation">
                    <p>Fermentation: <button class="double-state-button app-button" @click="clickedTwoStateButton($event, beerMethods.fermentation)">{{beerMethods.fermentation.state}}</button>{{beerMethods.fermentation.temp.value}} {{beerMethods.fermentation.temp.unit}}.</p>
                  </div>

                  <div class="methods-twist" v-if="beerMethods.twist">
                    <p>Twist: {{beerMethods.twist}}.</p>
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
          // Add in custom tracking of processing each item
          let hops = this.selectedBeer.ingredients.hops;

          for (let hop of hops) {
            hop["state"] = "IDLE";
          }

          return hops;
        }
      }

      return [];
    },
    beerIngredientsMalts() {
      if (this.selectedBeer != null && Object.hasOwn(this.selectedBeer, "ingredients")) {
        if (this.selectedBeer.ingredients != null && Object.hasOwn(this.selectedBeer.ingredients, "malt")) {
          // Add in custom tracking of processing each item
          let malts = this.selectedBeer.ingredients.malt;

          for (let malt of malts) {
            malt["state"] = "IDLE";
          }

          return malts;
        }
      }

      return [];
    },
    beerMethods() {
      let mashTemps = [];
      let fermentation = null;
      let twist = null;

      if (this.selectedBeer != null && Object.hasOwn(this.selectedBeer, "method")) {
        fermentation = this.selectedBeer.method.fermentation;
        twist = this.selectedBeer.method.twist;

        if (Object.hasOwn(this.selectedBeer.method, "mash_temp")) {
          if (this.selectedBeer.method.mash_temp.length > 0) {
            // Add in custom tracking of processing each item
            mashTemps = this.selectedBeer.method.mash_temp;

            for (let mashTemp of mashTemps) {
              mashTemp["state"] = "IDLE";
              // Convert duration in minutes to more easily computable seconds.
              mashTemp["time_remaining"] = mashTemp.duration * 3600
            }
          }
        }
      }

      return {
        mash_temp: mashTemps,
        fermentation: fermentation,
        twist: twist
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
      this.$emit('selectBeer', null);
      console.info("Show beer list", beer);
    },
    clickedTwoStateButton: function (event, obj) {
      obj.state = "DONE";
      event.target.textContent = obj.state;
    },
    clickedTimerButton: function (event, obj) {
      console.log(event);
      console.log(obj);
      obj.state = "RUNNING";
      event.target.textContent = obj.state;
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

</style>