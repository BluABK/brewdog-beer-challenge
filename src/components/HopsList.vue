<template>
  <div class="hops-container">
    <div class="hops-content" v-for="(hop, i) in this.computedHops" v-bind:key="'hops' + i + hop.name">
      <IngredientEntry
          :step="hop.add"
          :initState="hop.state"
          :initDisabled="hop.disabled"
          :amount="hop.amount.value"
          :unit="hop.amount.unit"
          :name="hop.name"
          :attribute="hop.attribute"
          v-bind:state.sync="hop.state"
          v-bind:disabled.sync="hop.disabled"
          @done="entryStateChanged(i)"
      />
    </div>
  </div>
</template>

<script>
import IngredientEntry from "@/components/IngredientEntry";

export default {
  name: "HopsList",
  components: {IngredientEntry},
  props: {
    initHops: {
      default: null,
      type: Array
    },
    propButtonStates: {
      default: null,
      type: Array
    }
  },
  computed: {
    // changedStates() {
    //   let watchList = [];
    //
    //   for (let hop of this.initHops) {
    //     watchList.push(hop);
    //   }
    //
    //   return watchList;
    // }
    // hopStates: function() {
    //   let items = [];
    //
    //   for (let hop of this.hops) {
    //     items.push(this.stepIsDisabled(hop.step));
    //   }
    //
    //   return items;
    // },

    buttonStates: function() {
      if (this.hops.length === 0) return [];
      let items = [];

      for (let hop of this.hops) {
        console.debug("hop", hop);
        items.push(this.stepIsDisabled(hop.add));
      }

      return items;
    },
    computedHops() {
      // Add in custom tracking of processing each item
      let hops = this.hops;

      for (let hop of hops) {
        hop["disabled"] = this.stepIsDisabled(hop.add);
      }

      return hops;
    },
    // computedButtonStates: function() {
    //   // this.updateButtonStates();
    //   // return this.propButtonStates;
    //   let items = [];
    //   for (let i = 0; i < this.hops.length; i++) {
    //     items.push(this.stepIsDisabled(this.hops[i].step));
    //   }
    //
    //   return items;
    // }

  },
  data() {
    return {
      hops: this.initHops,
      disabledHops: [],
      // buttonStates: [],
    }
  },
  methods: {
    stepIsDisabled: function(step) {
      if (step === "start") {
        console.debug("stepIsDisabled [start]", step, false);
        return false;
      }

      for (let hop of this.hops) {
        if (step === "middle" || step === "end") {
          // If there exists a start hop that is not done, then this step is disabled.
          console.debug(hop.add, hop.state ,hop.state !== "DONE");
          if (hop.add === "start" && hop.state !== "DONE") {
            console.debug("stepIsDisabled", step, true);
            return true;
          }
        } else if (step === "end") {
          // If there exists a middle hop that is not done, then this step is disabled.
          if (hop.add === "middle" && hop.state !== "DONE") {
            console.debug("stepIsDisabled", step, true);
            return true;
          }
        }
      }

      // If no prerequisite hops that were not done was found, then this step is enabled.
      console.debug("stepIsDisabled", step, false);
      return false;
    },
    updateButtonStates: function() {
      if (this.hops) {
        for (let i = 0; i < this.hops.length; i++) {
          this.buttonStates[i] = this.stepIsDisabled(this.hops[i].add);
        }
      }
    },
    processHops: function () {
      // if (this.hops) {
      //   if (this.hops.length === 0) return;
      //
      //   for (let hop of this.hops) {
      //     if (hop.add === "start") this.startStepsPending
      //   }
      // }
    },
    // getHopsByState: function() {
    //     for (let hop of this.initHops) {
    //       if (hop.add === "start")
    //     }
    // },
    entryStateChanged: function (event, index) {
      console.log("thing", event, index);
      this.updateButtonStates();
      // this.computedHops[index].disabled = true;
    }
  },
  watch: {
    state: {
      handler() {
        this.$emit('update:state', this.state);
      },
      immediate: true
    },
    buttonStates: {
      handler() {
        console.info("buttonStates");
        // if (this.hops) {
        //   this.updateButtonStates();
        // }
      },
      immediate: true
    }
    // hops: {
    //   handler() {
    //
    //   }
    // }
  },
  created: function () {
      this.processHops();
      // this.updateButtonStates();
  }
}
</script>

<style scoped>

</style>