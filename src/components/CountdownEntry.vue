<template>
  <div class="countdown-entry">
    <button class="action-button" @click="clickedButton()" :disabled="disabled">
      {{state}}
    </button>
    {{description}}
    <span v-if="this.state !== 'IDLE' && this.timeRemaining > 0">[{{timeRemainingString}}]</span>
  </div>
</template>

<script>

const SECONDS_MINUTE = 60;
const SECONDS_HOUR = 60 * SECONDS_MINUTE;
const SECONDS_DAY = 24 * SECONDS_HOUR;
const SECONDS_WEEK = 7 * SECONDS_DAY;

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
     * Remaining days.
     * @returns {number} The computed value.
     */
    weeks: function() {
      return Math.floor(this.timeRemaining / SECONDS_WEEK);
    },
    /**
     * Remaining days.
     * @returns {number} The computed value.
     */
    days: function() {
      return Math.floor(this.timeRemaining / SECONDS_DAY);
    },

    /**
     * Remaining hours.
     * @returns {number} The computed value.
     */
    hours: function() {
      return Math.floor((this.timeRemaining % SECONDS_DAY) / SECONDS_HOUR);
    },

    /**
     * Remaining minutes.
     * @returns {number} The computed value.
     */
    minutes: function() {
      return Math.floor((this.timeRemaining % SECONDS_HOUR) / SECONDS_MINUTE);
    },

    /**
     * Remaining seconds.
     * @returns {number} The computed value.
     */
    seconds: function() {
      return Math.floor(this.timeRemaining % SECONDS_MINUTE);
    },
    timeRemainingString: function () {
      let s = "";

      s = `Time Remaining：${this.days} days, ${this.hours} hours, ${this.minutes} minutes, ${this.seconds} seconds.`;

      return s;

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