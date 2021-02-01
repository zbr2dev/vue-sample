<template>
  <div>
    <trip-list-item
      v-for="(booking, index) in bookings"
      :key="index"
      :index="index"
      :booking="booking"
      @remove="$emit('remove', index)"
      @update="$emit('update', $event)"
      class="carda"
    />
  </div>
</template>

<script>
import { bookingsType } from '@/components/booking/types';
import TripListItem from '@/components/booking/step1/trip/TripListItem.vue';

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
