<template>
  <IngredientEntry
      :initState="initState"
      :initDisabled="initDisabled"
      :amount="amount"
      :unit="unit"
      :state.sync="state"
      :disabled.sync="disabled"
  />
</template>

<script>
import IngredientEntry from "@/components/IngredientEntry";

export default {
  name: "FermentationEntry",
  components: {IngredientEntry},
  props: {
    initState: {
      default: "IDLE",
      type: String
    },
    initDisabled: {
      default: false,
      type: Boolean
    },
    amount: {
      default: null,
      type: Number
    },
    unit: {
      default: null,
      type: String
    },
  },
  computed: {
    disabled: function() {
      return this.state === "DONE";
    }
  },
  data() {
    return {
      // disabled: this.isDisabled,
      state: this.initState
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
    disabled: {
      handler() {
        this.$emit('update:disabled', this.disabled);
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>