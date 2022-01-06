<template>
  <StateEntry
      :initState="initState"
      :initDisabled="initDisabled"
      :twistDescription="description"
      :state.sync="state"
      :disabled.sync="disabled"
  />
</template>

<script>
import StateEntry from "@/components/StateEntry";

export default {
  name: "TwistEntry",
  components: {StateEntry},
  props: {
    initState: {
      default: "IDLE",
      type: String
    },
    initDisabled: {
      default: false,
      type: Boolean
    },
    description: {
      default: null,
      type: String
    }
  },
  computed: {
    disabled: function() {
      return this.state === "DONE";
    }
  },
  data() {
    return {
      state: this.initState
    }
  },
  watch: {
    state: {
      handler() {
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