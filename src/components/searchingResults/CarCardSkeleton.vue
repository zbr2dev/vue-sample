<template>
  <v-skeleton-loader class="skeleton" type="image, paragraph" height="156px"></v-skeleton-loader>
</template>

<script>
export default {
  name: 'CarCardSkeleton',
};
</script>

<style scoped lang="scss">
  .skeleton {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    align-items: center;
  }
</style>
