<template>
  <div class="countdown-element">
    <button class="action-button" @click="clickedButton()">
      {{state}}
    </button>
    {{description}} [Remaining: {{timeRemaining}} seconds]
  </div>
</template>

<script>
export default {
  name: "Countdown",
  props: {
    countableObject: {
      default: null,
      type: Object
    },
    description: {
      default: "Description N/A",
      type: String
    },
    info: {
      default: "Info N/A",
      type: String
    },
    duration: {
      default: null,
      type: Number
    },
    initialTime: {
      default: null,
      type: Number
    },
    initialState: {
      default: null,
      type: String
    },
  },
  data() {
    return {
      timeRemaining: this.initialTime,
      timerEnabled: false,
      state: this.initialState,
      timerHandle: null
    }
  },
  computed: {

  },
  watch: {
    /**
     * Watch for changes to enable/disable timer.
     *
     * When
     * @param enabled
     */
    timerEnabled(enabled) {
      if (enabled === true) {
        this.timerHandle = setInterval(this.tickTimer, 1000);
      } else {
        clearInterval(this.timerHandle);
      }
    },
  },
  methods: {
    tickTimer: function () {
      if (this.timerEnabled) {
        this.timeRemaining--;
      }
    },
    pauseTimer: function() {
      this.state = "PAUSED";
      this.timerEnabled = false;
      console.info("paused timer");
    },
    startTimer: function () {
      this.state = "RUNNING";
      this.timerEnabled = true;
      console.info("started timer");
    },
    clickedButton: function () {
      if (this.state === "IDLE" || this.state === "PAUSED") {
        this.startTimer();
      } else if (this.state === "RUNNING") {
        this.pauseTimer();
      }
    }
  }
}
</script>

<style scoped>

</style>