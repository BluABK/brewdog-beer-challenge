<template>
  <div class="methods-container">
    <div class="methods-subheading" v-if="mashTemps.length > 0">
      <h1>Mash temperatures</h1>
      <MethodMashTempList :initMashTemps="mashTemps"/>
    </div>

    <div class="methods-fermentation methods-subheading" v-if="fermentation">
      <h1 class="">Fermentation</h1>
      <StateEntry
          :initState="fermentation.state"
          :initDisabled="stepIsDisabled(fermentation)"
          :amount="fermentation.temp.value"
          :unit="fermentation.temp.unit"
          :state.sync="fermentation.state"
          :disabled.sync="fermentation.disabled"
      />
    </div>

    <div class="methods-twist methods-subheading" v-if="twist">
      <h1>Twist</h1>
      <StateEntry
          :initState="twist.state"
          :initDisabled="stepIsDisabled(twist)"
          :twistDescription="twist.description"
          :state.sync="twist.state"
          :disabled.sync="twist.disabled"
      />
    </div>
  </div>

</template>

<script>
import StateEntry from "@/components/StateEntry";
import MethodMashTempList from "@/components/MethodMashTempList";
export default {
  name: "MethodsList",
  components: {StateEntry, MethodMashTempList},
  props: {
    initMashTemps: {
      default: () => [],
      type: Array
    },
    initFermentation: {
      default: null,
      type: Object
    },
    initTwist: {
      default: null,
      type: Object
    }
  },
  computed: {
  },
  data() {
    return {
      mashTemps: this.initMashTemps,
      fermentation: this.initFermentation,
      twist: this.initTwist,
    }
  },
  methods: {
    stepIsDisabled: function(entry) {
      // If done, then disable.
      return entry.state === "DONE";
    }
  },
  watch: {
  }
}
</script>

<style scoped>
.methods-subheading {
  padding-bottom: 5px;
}

.methods-subheading h1 {
  font-weight: bold;
  font-size: 100%;
}
</style>