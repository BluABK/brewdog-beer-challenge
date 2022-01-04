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
    /**
     * Watch for changes to enable/disable timer.
     *
     * @param enabled
     */
    timerEnabled(enabled) {
      if (enabled === true) {
        this.timerHandle = setInterval(this.tick, 1000);
      } else {
        clearInterval(this.timerHandle);
      }
    },
  },
  methods: {
    emitState: function () {
      this.$emit('update:timerEnabled', this.timerEnabled);
      this.$emit('update:timerState', this.timerState);
    },
    tick: function () {
      if (this.timerEnabled) {
        if (this.timeRemaining > 0) {
          this.timeRemaining--;
        } else if (this.timeRemaining === 0) {
          this.timerEnabled = false;
          this.timerState = "DONE";
          this.emitState();
        }

        this.$emit('update:timeRemaining', this.timeRemaining);
      }
    },
    pause: function() {
      this.timerEnabled = false;
      this.timerState = "PAUSED";
      this.emitState();
    },
    start: function () {
      this.timerEnabled = true;
      this.timerState = "RUNNING";
      this.emitState();
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