<template>
  <div class="methods-container">
    <div class="methods-subheading" v-if="this.mashTemps.length > 0">
      <h1>Mash temperatures</h1>
      <MethodMashTempList :initMashTemps="this.mashTemps"/>
    </div>

    <div class="methods-fermentation methods-subheading" v-if="this.fermentation">
      <h1 class="">Fermentation</h1>
      <IngredientEntry
          :initState="this.fermentation.state"
          :amount="this.fermentation.temp.value"
          :unit="this.fermentation.temp.unit"
          v-bind:state.sync="this.fermentation.state"
      />
    </div>

    <div class="methods-twist methods-subheading" v-if="this.twist">
      <h1>Twist</h1>
      <IngredientEntry
          :initState="this.twist.state"
          :twistDescription="this.twist.description"
          v-bind:state.sync="this.twist.state" />
    </div>
  </div>

</template>

<script>
import IngredientEntry from "@/components/IngredientEntry";
import MethodMashTempList from "@/components/MethodMashTempList";
export default {
  name: "MethodsList",
  components: {IngredientEntry, MethodMashTempList},
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