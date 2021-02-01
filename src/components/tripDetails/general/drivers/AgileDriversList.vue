<template>
  <component
    :is="selectedComponent"
    @showClickedDriver="showClickedDriver"
    @selectDriver="SET_SELECTED_DRIVER"
    :drivers="vehicle.drivers"
    :selectedDriver="currentPreparedTrip.driver"
  />
</template>

<script>
import FullDriversCard from '@/components/tripDetails/mobile/FullDriversCard.vue';
import DriverCarousel from '@/components/tripDetails/desktop/DriverCarousel.vue';
import tripDetailsMixin from '@/components/tripDetails/tripDetailsMixin';

export default {
  name: 'AgileDriversList',
  mixins: [tripDetailsMixin],
  components: {
    FullDriversCard,
    DriverCarousel,
  },
  props: {
    type: {
      type: String,
      validate(value) {
        return ['carousel', 'scroll-list'].includes(value);
      },
      default: () => 'scroll-list',
    },
  },
  computed: {
    selectedComponent() {
      return this.type === 'carousel' ? 'DriverCarousel' : 'FullDriversCard';
    },
  },
};
</script>

<style scoped>

</style>
