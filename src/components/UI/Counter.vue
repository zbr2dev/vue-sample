<template>
  <div class="counter">
    <v-icon :style="value === 0 ? 'color: #BFBFBF' : ''" class="counter__icon counter__icon--minus" @click="minus">mdi-minus</v-icon>
    <span class="counter__number">{{value}}</span>
    <v-icon class="counter__icon counter__icon--plus" @click="plus">mdi-plus</v-icon>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  props: {
    value: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  methods: {
    plus() {
      this.$emit('input', this.value + 1);
    },
    minus() {
      if (this.value !== 0) this.$emit('input', this.value - 1);
    },
  },
};
</script>

<style scoped lang="scss">
  @import "~@/assets/styles/variables";
  .counter {
    display: flex;
    align-items: center;
    font-family: $OpenSans;
    font-size: 14px;

    &__icon {
      padding: 0 5px;
      height: 10px;
      font-size: 14px;

      &--minus {
        color: $grey;
      }
    }

    &__number, &__icon--plus {
      color: $black;
    }

    &___number {
      padding: 0 30px;
    }
  }
</style>
