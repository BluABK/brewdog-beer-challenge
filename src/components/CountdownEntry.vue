<template>
  <div class="countdown-entry">
    <button class="action-button" @click="clickedButton()" :disabled="disabled">
      {{state}}
    </button>
    {{description}} <span v-if="this.state !== 'IDLE' && this.timeRemaining > 0">[Remaining: {{timeRemaining}} seconds]</span>
  </div>
</template>

<script>
export default {
  name: "CountdownEntry",
  props: {
    initTime: {
      default: null,
      type: Number
    },
    initState: {
      default: "IDLE",
      type: String
    },
    initDisabled: {
      default: false,
      type: Boolean
    },
    isDisabled: {
      default: null,
      type: Boolean
    },
    duration: {
      default: null,
      type: Number
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
  data() {
    return {
      timeRemaining: this.initTime,
      timerEnabled: false,
      state: this.initState,
      timerHandle: null,
    }
  },
  computed: {
    disabled: function() {
      if (this.isDisabled) {
        return this.isDisabled;
      }

      return this.initDisabled;
    },
    /**
     * Builds a description string based on provided properties.
     * @returns {string}
     */
    description() {
      let s = "";
      let spacing = "";

      if (this.duration) {
        s+= `${spacing}${this.duration} minutes`;
        spacing = " ";
      }
      if (this.amount) {
        s+= `${spacing}at ${this.amount}`;
        spacing = " ";
      }
      if (this.unit) {
        s+= `${spacing}${this.unit}`;
        spacing = " ";
      }

      if (s.length > 0) s += '.';

      return s;
    }
  },
  watch: {
    timerEnabled(enabled) {
      if (enabled === true) {
        this.timerHandle = setInterval(this.tick, 1000);
      } else {
        clearInterval(this.timerHandle);
      }
      this.$emit('update:timerEnabled', this.timerEnabled);
    },
    timeRemaining: {
      handler() {
        this.$emit('update:timeRemaining', this.timeRemaining);
      },
      immediate: true
    },
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
    tick: function () {
      if (this.timerEnabled) {
        if (this.timeRemaining > 0) {
          this.timeRemaining--;
        } else if (this.timeRemaining === 0) {
          this.timerEnabled = false;
          this.setDone();
        }
      }
    },
    pause: function() {
      this.timerEnabled = false;
      this.state = "PAUSED";
    },
    start: function () {
      this.timerEnabled = true;
      this.state = "RUNNING";
    },
    setDone: function() {
      this.state = "DONE";
      this.$emit("update:disabled", true);
    },
    clickedButton: function () {
      // If there is still time remaining, process timer logic.
      if (this.timeRemaining > 0) {
        if (!this.timerEnabled) {
          this.start();
        } else if (this.timerEnabled) {
          this.pause();
        }
      }
    }
  }
}
</script>

<style scoped>

</style>