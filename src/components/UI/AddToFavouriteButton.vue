<template>
  <div class="add-button" @click="$emit('click')">
    <heart-add-icon />
    <span class="add-button__text" v-if="showText">{{ text }}</span>
  </div>

</template>

<script>
import HeartAddIcon from '@/components/UI/icons/HeartAddIcon.vue';

export default {
  name: 'AddToFavouriteButton',
  components: { HeartAddIcon },
  props: {
    text: {
      type: String,
      default: () => 'Add to favourite',
    },
    showText: {
      default: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";

  .add-button {
    display: flex;
    align-items: center;

    &__text {
      margin-left: 5px;
      font-family: $Montserrat;
      font-size: 12px;
      font-weight: 600;
      line-height: 20px;
    }
  }
</style>
