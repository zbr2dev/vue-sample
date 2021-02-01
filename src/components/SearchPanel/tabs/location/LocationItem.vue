<template>
  <div class="location">
    <span class="location__circle"/>
    <div class="location__data">
      <span class="location__short">{{location}}</span>
      <span class="location__long">{{longLocation}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LocationItem',
  props: {
    location: {
      type: String,
      required: true,
    },
    longLocation: {
      type: String,
    },
  },
};
</script>

<style scoped lang="scss">
  @import "~@/assets/styles/variables.scss";

  .location {
    display: flex;
    align-items: center;
  }

  .location__data {
    display: flex;
    flex-direction: column;
    margin-left: 8px;
    font-family: $OpenSans;
  }

  .location__circle {
    $size: 6px;
    width: $size;
    height: $size;
    flex-shrink: 0;
    border: 1px solid $grey;
    box-sizing: border-box;
    border-radius: 50%;
  }

  .location__short {
    font-size: 14px;
  }

  .location__long {
    font-size: 10px;
  }
</style>
