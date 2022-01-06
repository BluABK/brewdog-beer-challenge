<template>
  <div class="malts-container">
    <div class="malts-content" v-for="(malt, i) in this.computedMalts" :key="'malt' + i + malt.name">
      <StateEntry
          :initState="malt.state"
          :initDisabled="stepIsDisabled(malt)"
          :amount="malt.amount.value"
          :unit="malt.amount.unit"
          :name="malt.name"
          :state.sync="malt.state"
          :disabled.sync="malt.disabled"
      />
    </div>
  </div>
</template>

<script>
import StateEntry from "@/components/StateEntry";
export default {
  name: "MaltsList",
  components: {StateEntry},
  props: {
    initMalts: {
      default: null,
      type: Array
    }
  },
  computed: {
    computedMalts() {
      // Add in custom tracking of processing each item
      let malts = this.malts;

      for (let malt of malts) {
        this.$set(malt, "disabled", this.stepIsDisabled(malt));
      }

      return malts;
    }
  },
  data() {
    return {
      malts: this.initMalts,
    }
  },
  methods: {
    stepIsDisabled: function(malt) {
      // If done, then disable.
      return malt.state === "DONE";
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