<template>
  <button class="button">
    <v-icon color="white">mdi-plus</v-icon>
  </button>
</template>

<script>
export default {
  name: 'PlusBtn',
};
</script>

<style scoped lang="scss">
  .button {
    $size: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: $size;
    height: $size;
    border-radius: 50%;
    background: #333333;
    outline: none;

    &:hover {
      opacity: 0.8;
    }
  }
</style>
