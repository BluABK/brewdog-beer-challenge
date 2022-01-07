<template>
  <div class="method-mashtemps-container">
    <div class="mashtemp-content" v-for="(mashTemp, i) in this.computedMashTemps" v-bind:key="'mashTemp' + i + mashTemp.temp.value">
      <CountdownEntry v-if="mashTemp.duration"
                 :initState="mashTemp.state"
                 :initDisabled="stepIsDisabled(mashTemp)"
                 :initTime="mashTemp.time_remaining"
                 :duration="mashTemp.duration"
                 :amount="mashTemp.temp.value"
                 :unit="mashTemp.temp.unit"
                 :timeRemaining.sync="mashTemp.time_remaining"
                 :state.sync="mashTemp.state"
                 :disabled.sync="mashTemp.disabled"
      />
      <StateEntry v-else
                 :initState="mashTemp.state"
                 :initDisabled="stepIsDisabled(mashTemp)"
                 :amount="mashTemp.temp.value"
                 :unit="mashTemp.temp.unit"
                 :state.sync="mashTemp.state"
                 :disabled.sync="mashTemp.disabled"
      />
    </div>
  </div>
</template>

<script>
import StateEntry from "@/components/StateEntry";
import CountdownEntry from "@/components/CountdownEntry";
export default {
  name: "MethodMashTempList",
  components: {StateEntry, CountdownEntry},
  props: {
    initMashTemps: {
      default: () => [],
      type: Array
    }
  },
  computed: {
    computedMashTemps() {
      // Add in custom tracking of processing each item
      let mashTemps = this.mashTemps;

      for (let mashTemp of mashTemps) {
        this.$set(mashTemp, "disabled", this.stepIsDisabled(mashTemp));
      }

      return mashTemps;
    }
  },
  data() {
    return {
      mashTemps: this.initMashTemps,
    }
  },
  methods: {
    stepIsDisabled: function(mashTemp) {
      // If done, then disable.
      return mashTemp.state === "DONE";
    }
  },
  watch: {
    state: {
      handler() {
        this.$emit('update:state', this.state);
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>