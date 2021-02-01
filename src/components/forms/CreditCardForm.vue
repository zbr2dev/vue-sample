<template>
  <div class="credit">
    <div class="credit__card-number-section">
      <base-input label="Card Number" placeholder="XXXX - XXXX - XXXX - XXXX" />
      <base-input label="Exp Date" placeholder="MM / YY" />
      <base-input label="CVV" placeholder="•••" />
    </div>

    <base-input label="Name on card" placeholder="JOHN SMITH" />
    <base-input label="Billing address" placeholder="4517 Washington Ave. Manchester, Kentucky 39495" />
  </div>
</template>

<script>
import BaseInput from '@/components/UI/inputs/BaseInput.vue';

export default {
  name: 'CreditCardForm',
  components: { BaseInput },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";

.credit {
    display: grid;
    grid-gap: 16px;

    &__card-number-section {
      display: grid;
      grid-template-columns: 232px 88px 88px;
      grid-gap: 16px;
    }
}
</style>
