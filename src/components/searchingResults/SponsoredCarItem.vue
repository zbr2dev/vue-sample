<template>
  <div class="car-item">
    <div><slot></slot></div>

    <div class="car-item__car-name">{{ carName }}</div>

    <div class="car-item__content">
      <passengers-and-luggage :persons="persons" :luggage="luggage" />
      <div class="car-item__amount">{{ localAmount }}</div>
    </div>

  </div>
</template>

<script>
import { formatNumberToAmount } from '@/utils/helpers';
import PassengersAndLuggage from '@/components/PassengersAndLuggage.vue';

export default {
  name: 'SponsoredCarItem',
  components: { PassengersAndLuggage },
  props: {
    persons: {
      type: Number,
      required: true,
    },
    luggage: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    carName: {
      type: String,
      required: true,
    },
  },
  computed: {
    localAmount() {
      return formatNumberToAmount(this.amount);
    },
  },
};
</script>

<style scoped lang="scss">
  @import "~@/assets/styles/variables.scss";
  .car-item {
    &__content {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }

    &__amount {
      font-family: $Montserrat;
      font-size: 18px;
      font-weight: 600;
      color: $black;
    }

    &__car-name {
      font-family: $Montserrat;
      color: $black;
      font-size: 14px;
      font-weight: 600;
      margin: 4px 0;
    }
  }
</style>
