<template>
  <div>
    <trip-list-item
      v-for="(booking, index) in bookings"
      :key="index"
      :index="index"
      :booking="booking"
      @remove="$emit('remove', index)"
      @updateBooking="$emit('updateBooking', $event)"
      class="carda"
    />
  </div>
</template>

<script>
import { bookingsType } from '@/components/booking/types';
import TripListItem from './TripListItem.vue';

export default {
  name: 'TripsList',
  components: { TripListItem },
  props: {
    bookings: bookingsType,
  },
};
</script>

<style scoped lang="scss">
@import "../../styles";
</style>
