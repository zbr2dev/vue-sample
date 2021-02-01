<template>
  <div class="basket" @click="$emit('click')">
    <span :class="['basket__count', { 'basket__count--small': count > 9 }]">{{ count || '+' }}</span>
    <basket-icon />
  </div>
</template>

<script>
import BasketIcon from '@/components/UI/icons/BasketIcon.vue';

export default {
  name: 'ExtendedBasketIcon',
  components: { BasketIcon },
  props: {
    count: {
      type: [Number, String],
      default: () => 3,
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";
  .basket {
    cursor: pointer;
    position: relative;
    display: flex;
    &__count {
      font-family: $OpenSans;
      position: absolute;
      font-weight: bold;
      top: -12px;
      left: 7px;

      &--small {
        font-size: 12px;
        top: -10px;
        left: 4px;
      }
    }
  }
</style>
