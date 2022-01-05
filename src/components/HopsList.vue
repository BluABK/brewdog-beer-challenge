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
    }
  },
  computed: {
    computedHops() {
      // Add in custom tracking of processing each item
      let hops = this.hops;

      for (let hop of hops) {
        this.$set(hop, "disabled", this.stepIsDisabled(hop));
      }

      return hops;
    }
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

      if (!Object.hasOwn(hop, "add")) {
        console.error("stepIsDisabled called with hop that has no property 'add'", hop);
        throw new Error("stepIsDisabled called with hop that has no property 'add'");
      }

      // If done, then disable regardless add step.
      if (hop.state === "DONE") {
        return true;
      } else if (hop.add === "start") {
        // If add step is start then enable.
        return false;
      }

      // Handle hop add steps past start:
      // Check current hops
      let pendingStarts = 0;
      let pendingMiddles = 0;

      for (let i = 0; i < this.hops.length; i++) {
        if (this.hops[i].add === "start" && this.hops[i].state !== "DONE") {
          pendingStarts++;
        }
        if (this.hops[i].add === "middle" && this.hops[i].state !== "DONE") {
          pendingMiddles++;
        }
      }

      if (hop.add === "middle" && pendingStarts > 0) {
        return true;
      }
      if (hop.add === "end" && (pendingStarts > 0 || pendingMiddles > 0) ) {
        return true;
      }

      // If no prerequisite hops that were not done was found, then this step is enabled.
      return false;
    }
  },
  watch: {
    state: {
      handler() {
        console.info("update:state")
        this.$emit('update:state', this.state);
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>