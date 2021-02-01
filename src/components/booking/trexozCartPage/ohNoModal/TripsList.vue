<template>
  <div>
    <trips-list-item
      v-for="(booking, index) in bookings"
      :booking="booking"
      :key="index"
      class="carda"
    />
  </div>
</template>

<script>
import TripsListItem from '@/components/booking/trexozCartPage/ohNoModal/TripsListItem.vue';

export default {
  name: 'TripsList',
  components: {
    TripsListItem,
  },
  props: {
    bookings: {
      type: Array,
    },
  },
};
</script>

<style scoped lang="scss">
.carda {
  border-bottom: 1.5px solid #D4D4D4;
  padding: 40px 0 23px;
}
</style>
