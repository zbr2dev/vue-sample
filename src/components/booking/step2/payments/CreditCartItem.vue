<template>
  <div :class="['card', { 'card--selected': isSelected }]" @click="$emit('select', creditCard)">
    <img :src="creditCardImg" class="card__image" />
    <div class="card__number">{{ creditCard.number }}</div>
  </div>
</template>

<script>
export default {
  name: 'CreditCartItem',
  props: {
    creditCard: {
      type: Object,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    creditCardImg() {
      // Todo: props.cardType or something else
      return 'data:image/png;base64,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';
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";

  .card {
    display: flex;
    align-items: center;
    height: 32px;
    border-radius: 4px;
    padding: 0 4px;
    cursor: pointer;

    &__image {
      margin-right: 15px;

      $size: 24px;
      height: $size;
      width: $size;
      border-radius: 100%;
      object-fit: contain;
    }

    &--selected {
      background: #F2F2F2;
    }

    &__number {
      font-family: $OpenSans;
      font-weight: 600;
      font-size: 14px;
    }
  }
</style>
