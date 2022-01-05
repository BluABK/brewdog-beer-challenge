<template>
  <div class="hops-container">
    <div class="hops-content" v-for="(hop, i) in this.computedHops" :key="'hops' + i + hop.name">
      <IngredientEntry
          :step="hop.add"
          :initState="hop.state"
          :initDisabled="stepIsDisabled(hop)"
          :amount="hop.amount.value"
          :unit="hop.amount.unit"
          :name="hop.name"
          :attribute="hop.attribute"
          :state.sync="hop.state"
          :disabled.sync="hop.disabled"
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
    // propButtonStates: {
    //   default: null,
    //   type: Array
    // }
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

    // buttonStates: function() {
    //   if (this.hops.length === 0) return [];
    //   let items = [];
    //
    //   for (let hop of this.hops) {
    //     console.debug("hop", hop);
    //     items.push(this.stepIsDisabled(hop.add));
    //   }
    //
    //   return items;
    // },
    computedHops() {
      // Add in custom tracking of processing each item
      let hops = this.hops;

      for (let hop of hops) {
        // hop["disabled"] = this.stepIsDisabled(hop.add);
        this.$set(hop, "disabled", this.stepIsDisabled(hop));
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
    }
  },
  methods: {
    stepIsDisabled: function(hop) {

      if (!Object.hasOwn(hop, "add")) {
        console.error("stepIsDisabled called with hop that has no property 'add'", hop);
        throw new Error("stepIsDisabled called with hop that has no property 'add'");
      }

      // Make sure the hop add step is of expected type, else error out.
      if (["start", "middle", "end"].includes(hop.add) === false) {
        let msg = `Unhandled hop with unexpected add '${hop.add}'`;
        console.error(msg, hop);
        throw new Error(msg);
      }

      // let hopDesc = "";
      // if (Object.hasOwn(hop, "add")) hopDesc += `[${hop.add}] `;
      // if (Object.hasOwn(hop, "amount")) hopDesc += `${hop.amount.value} `;
      // if (Object.hasOwn(hop, "amount")) hopDesc += `${hop.amount.unit} `;
      // if (Object.hasOwn(hop, "name")) hopDesc += `${hop.name} `;
      // if (Object.hasOwn(hop, "state")) hopDesc += `${hop.state} `;

      // console.info("hop", hopDesc);

      if (!Object.hasOwn(hop, "add")) {
        console.error("stepIsDisabled called with hop that has no property 'add'", hop);
        throw new Error("stepIsDisabled called with hop that has no property 'add'");
      }

      // If done, then disable regardless add step.
      if (hop.state === "DONE") {
        // console.debug("stepIsDisabled [state:DONE]", hop.add, true);
        return true;
      } else if (hop.add === "start") {
        // If add step is start then enable.
        // console.debug("stepIsDisabled [add:start]", hop.add, false);
        return false;
      }

      // Handle hop add steps past start:

      // Check current hops
      let pendingStarts = 0;
      let pendingMiddles = 0;

      for (let i = 0; i < this.hops.length; i++) {
        if (this.hops[i].add === "start" && this.hops[i].state !== "DONE") {
          // console.info("undone:start", this.hops[i]);
          pendingStarts++;
        }
        if (this.hops[i].add === "middle" && this.hops[i].state !== "DONE") {
          // console.info("undone:middle", this.hops[i]);
          pendingMiddles++;
        }
        // console.log("sss")
      }
        if (hop.add === "middle" && pendingStarts > 0) {
          // console.debug("stepIsDisabled [add:middle], reason pendingStarts > 0", hop.add, pendingStarts, true);
          return true;
        }
        if (hop.add === "end" && (pendingStarts > 0 || pendingMiddles > 0) ) {
          // console.debug("stepIsDisabled [add:end]", hop.add, true);
          // console.debug("stepIsDisabled [add:end], reason pendingStarts || pendingMiddles > 0", hop.add, pendingStarts, pendingMiddles, true);
          return true;
        }

      // If no prerequisite hops that were not done was found, then this step is enabled.
      console.debug("stepIsDisabled ENABLED", hop.add, hop, false);
      return false;
    },
    updateButtonStates: function() {
      if (this.hops) {
        // let states = [];
        for (let i = 0; i < this.hops.length; i++) {
          console.info("updateButtonState", i, this.hops[i]);
          // this.buttonStates[i] = this.stepIsDisabled(this.hops[i].add);
          // let x = this.stepIsDisabled(this.hops[i]);
          // console.info("this.hops[i].disabled --> x", this.hops[i].disabled, x);
          this.$set(this.hops[i], "disabled", this.stepIsDisabled(this.hops[i]));
          // states[i] = this.stepIsDisabled(this.hops[i].add);
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
    entryStateChanged: function (index) {
      console.log("entryStateChanged", index);
      // this.updateButtonStates();
      // this.$forceUpdate();
      // this.computedHops[index].disabled = true;
    }
  },
  watch: {
    state: {
      handler() {
        console.info("update:state")
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
    },
    hops: {
      handler(newVal, oldVal) {
        console.log("hops property changed", oldVal, newVal);
        this.updateButtonStates();
      },
      deep: true,
      immediate: true
    }
  },
  created: function () {
      this.processHops();
      // this.updateButtonStates();
  },
  mounted() {
    // this.updateButtonStates();
  }
}
</script>

<style scoped>

</style>