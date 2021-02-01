<template>
  <div class="cards">
    <credit-cart-item
      v-for="(card, index) in cards"
      :key="index"
      :credit-card="card"
      :is-selected="index === 0"
      @select="$emit('select', $event)"
    />
  </div>
</template>

<script>
import CreditCartItem from '@/components/booking/step2/payments/CreditCartItem.vue';

export default {
  name: 'CreditCardList',
  components: { CreditCartItem },
  props: {
    cards: {
      type: Array,
    },
  },
};
</script>

<style scoped lang="scss">
  .cards {
    display: grid;
    grid-gap: 10px;
  }
</style>
