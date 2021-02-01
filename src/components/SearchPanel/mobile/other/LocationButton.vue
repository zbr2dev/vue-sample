<template>
  <button class="location-button" @click="$emit('click')">
    <v-icon class="location-button__icon">mdi-map-marker</v-icon>
    <span class="location-button__text">{{ text }}</span>
  </button>
</template>

<script>
export default {
  name: 'LocationButton',
  props: {
    text: {
      type: String,
      default: () => 'Location',
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";

  .location-button {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid $grey;
    height: 40px;
    background-color: white;
    outline: none;
    border-radius: 4px;
    width: 100%;

    &__icon {
      margin-left: 16px;
      color: $black;
    }

    &__text {
      margin-left: 12px;
      font-family: $OpenSans;
      font-size: 14px;
      color: $grey;
    }
  }
</style>
