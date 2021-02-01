<template>
  <div>
    <my-trips-item
      v-for="(trip, index) in trips"
      :trip="trip"
      :key="index"
      class="carda"
      @tripDetailsClick="$emit('tripDetailsClick', $event)"
    />
  </div>
</template>

<script>
import MyTripsItem from '@/components/myTrips/list/MyTripsItem.vue';

export default {
  name: 'MyTripsList',
  components: { MyTripsItem },
  props: {
    trips: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../booking/styles";
</style>
