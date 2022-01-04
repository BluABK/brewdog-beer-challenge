<template>
  <div class="two-state-element">
    <button class="action-button" @click="clickedButton()" :disabled="disabled">
      {{state}}
    </button>
    <span v-if="this.step != null">
      [{{step}}]
    </span>
     {{description}}
  </div>
</template>

<script>
export default {
  name: "IngredientEntry",
  props: {
    description: {
      default: "Description N/A",
      type: String
    },
    initState: {
      default: "IDLE",
      type: String
    },
    step: {
      default: null,
      type: String,
      // immutable: true
    },
    initDisabled: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      state: this.initState,
      disabled: this.initDisabled
    }
  },
  watch: {
    state: {
      handler() {
        this.$emit('update:state', this.state);
      },
      immediate: true
    }
  },
  methods: {
    clickedButton: function () {
      if (this.disabled) return;

      this.state = "DONE";
    }
  }
}
</script>

<style scoped>

</style>