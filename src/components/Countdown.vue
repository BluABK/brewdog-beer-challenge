<template>
  <div class="countdown-element">
    <button class="action-button" @click="clickedButton()">
      {{timerState}}
    </button>
    {{description}} [Remaining: {{timeRemaining}} seconds]
  </div>
</template>

<script>
export default {
  name: "Countdown",
  props: {
    description: {
      default: "Description N/A",
      type: String
    },
    initialTime: {
      default: null,
      type: Number
    },
    initialTimerState: {
      default: "IDLE",
      type: String
    }
  },
  data() {
    return {
      timeRemaining: this.initialTime,
      timerEnabled: false,
      timerState: this.initialTimerState,
      timerHandle: null,
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
    timerState: {
      handler() {
        this.$emit('update:timerState', this.timerState);
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
          this.timerState = "DONE";
        }
      }
    },
    pause: function() {
      this.timerEnabled = false;
      this.timerState = "PAUSED";
    },
    start: function () {
      this.timerEnabled = true;
      this.timerState = "RUNNING";
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