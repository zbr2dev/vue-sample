<template>
  <div class="d-flex align-center">
    <v-icon color="black" @click="$emit('prev')" class="prev-icon">mdi-chevron-left</v-icon>
    <span class="title">{{title}}</span>
  </div>
</template>

<script>
export default {
  name: 'PanelTitle',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
  @import "~@/assets/styles/variables.scss";
  .title {
    margin-left: 13px;
    font-family: $Montserrat;
    font-size: 18px;
    font-weight: 600;
    color: $black;
  }
</style>
