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
    // timerEnabled: {
    //   default: false,
    //   type: Boolean
    // },
    initialState: {
      default: null,
      type: String
    }
  },
  data() {
    return {
      timeRemaining: this.initialTime,
      timerEnabled: false,
      state: this.initialState
    }
  },
  computed: {
    // timeRemaining() {
    //   if (this.countableObject != null) {
    //     if (Object.hasOwn(this.countableObject, "duration")) return this.countableObject.duration;
    //   }
    //
    //   return null;
    // },
  },
  watch: {
    timerEnabled(value) {
      if (value) {
        setTimeout(() => {
          this.timeRemaining--;
        }, 1000);
      }
    },
    timeRemaining: {
      handler(value) {
        if (value > 0 && this.timerEnabled) {
          setTimeout(() => {
              this.timeRemaining--;
          }, 1000);
        } else if (value === 0) {
          this.state = "DONE";
        }
      },
      immediate: true // Ensure watcher is triggered upon creation.
    }
  },
  methods: {
    async countdownTimer() {
      while (this.timeRemaining > 0) {
        this.timeRemaining--;
      }

      this.state = "DONE";
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