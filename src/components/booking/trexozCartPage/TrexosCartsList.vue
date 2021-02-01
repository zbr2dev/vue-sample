<template>
  <div>
    <trexoz-cart-item
      v-for="(booking, index) in bookings"
      :key="index"
      :index="index"
      :booking="booking"
      @remove="$emit('remove', index)"
      class="carda"
    />
  </div>
</template>

<script>
// Todo: key must not be index

import TrexozCartItem from '@/components/booking/trexozCartPage/trexozSingleCart/TrexozCartItem.vue';

export default {
  name: 'TrexosCartsList',
  components: { TrexozCartItem },
  props: {
    bookings: Array,
  },
};
</script>

<style scoped lang="scss">
@import "../styles";
</style>
