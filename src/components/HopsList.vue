<template>
  <div class="hops-container">
    <div class="hops-content" v-for="(hop, i) in this.hops" v-bind:key="'hops' + i + hop.name">
      <IngredientEntry
          :step="hop.add"
          :initState="hop.state"
          :initDisabled="true"
          :amount="hop.amount.value"
          :unit="hop.amount.unit"
          :name="hop.name"
          :attribute="hop.attribute"
          v-bind:state.sync="hop.state" />
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
  data() {
    return {
      hops: this.initHops
    }
  },
  methods: {

  },
}
</script>

<style scoped>

</style>