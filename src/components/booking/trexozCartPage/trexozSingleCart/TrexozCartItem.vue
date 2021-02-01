<template>
  <div class="cart-item">
    <car-and-driver
      :driver="booking.driver"
      :vehicle="booking.vehicle"
      @remove="$emit('remove')"
    />

    <trip-details-block :trip-details="booking" class="cart-item__details"/>

    <img src="../../../../../public/map.png" class="cart-item__map" />

    <trip-total-price :price="booking.price" class="cart-item__price-section"/>
  </div>
</template>

<script>
import CarAndDriver from '@/components/booking/general/CarAndDriver.vue';
import TripDetailsBlock from '@/components/booking/general/TripDetailsBlock.vue';
import TripTotalPrice from '@/components/booking/general/TripTotalPrice.vue';

export default {
  name: 'TrexozCartItem',
  components: { TripTotalPrice, CarAndDriver, TripDetailsBlock },
  mounted() {
    console.log('book', this.props);
  },
  props: {
    booking: Object,
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";

  .cart-item {
    display: flex;
    &__details {
      margin: 0 33px;
      flex-basis: 350px;
    }

    &__map {
      background: #7E7E7E;
      flex-basis: 400px;
    }

    &__price-section {
      margin-left: auto;
    }
  }
</style>
