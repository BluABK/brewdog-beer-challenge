<template>
  <div class="countdown-element">
    <button class="action-button">

    </button>
    <p class="info">
      {{info}}
    </p>
    <p class="description">
      {{info}}
    </p>
  </div>
</template>

<script>
export default {
  name: "Countdown",
  props: {
  },
  computed: {
    info: "Sample text",
    description: "Sample text",
    duration: null,
    state: "IDLE",
    timeRemaining() {
      if (this.countableObject != null && Object.hasOwn(this.countableObject, "duration")) return this.countableObject.duration;
      return null;
    },
  },
  data() {
    return {
      countableObject: {
        default: null,
        type: Object
      },
    }
  }
}
</script>

<style scoped>

</style>