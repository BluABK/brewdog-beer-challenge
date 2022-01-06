<template>
  <div class="two-state-element">
    <button class="action-button" @click="clickedButton()" :disabled="disabled">
      {{state}}
    </button>
    <span class="description">
      {{description}}
    </span>
  </div>
</template>

<script>
export default {
  name: "IngredientEntry",
  props: {
    initState: {
      default: "IDLE",
      type: String
    },
    step: {
      default: null,
      type: String,
    },
    initDisabled: {
      default: false,
      type: Boolean
    },
    isDisabled: {
      default: null,
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
    name: {
      default: null,
      type: String
    },
    attribute: {
      default: null,
      type: String
    },
    twistDescription: {
      default: null,
      type: String
    }
  },
  computed: {
    /**
     * Builds a description string based on provided properties.
     * @returns {string}
     */
    description() {
      if (this.twistDescription) return `${this.twistDescription}.`;

      let s = "";
      let spacing = "";

      if (this.amount) {
        s+= `${spacing}${this.amount}`;
        spacing = " ";
      }
      if (this.unit) {
        s+= `${spacing}${this.unit}`;
        spacing = " ";
      }
      if (this.name) {
        s+= `${spacing}${this.name}`;
        spacing = " ";
      }
      if (this.attribute) {
        s+= `${spacing}(${this.attribute})`;
        spacing = " ";
      }

      if (s.length > 0) s += '.';

      return s;
    },
    disabled: function() {
      if (this.isDisabled) {
        return this.isDisabled;
      }

      return this.initDisabled;
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
  },
  methods: {
    setDone: function() {
      this.state = "DONE";
      this.$emit("update:disabled", true);
    },
    clickedButton: function () {
      if (this.disabled) return;
      this.setDone();
    }
  }
}
</script>

<style scoped>

</style>