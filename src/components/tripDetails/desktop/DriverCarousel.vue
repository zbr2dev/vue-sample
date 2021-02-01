<template>
  <simple-carousel :is-arrows-visible="isArrowsVisible">
    <template v-slot:caption>
      <span class="driver-title">Chauffeurs ({{driversLength}})</span>
    </template>

    <div v-for="(slide, index) in localDrivers" :key="index" >
      <drivers-list
        class="drivers-list"
        @showClickedDriver="handleShowClickedDriver"
        @selectDriver="$emit('selectDriver', $event)"
        :drivers="slide"
        :selected-driver="selectedDriver"
      />
    </div>
  </simple-carousel>
</template>

<script>
import SimpleCarousel from '@/components/UI/carousels/SimpleCarousel.vue';
import DriversList from '@/components/tripDetails/general/drivers/DriversList.vue';

import { getArrayWithSubArrays } from '@/utils/helpers';
import fullDriversCardMixin from '@/components/tripDetails/general/drivers/fullDriversCardMixin';

export default {
  name: 'DriverCarousel',
  mixins: [fullDriversCardMixin],
  components: { DriversList, SimpleCarousel },
  props: {
    drivers: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    localDrivers() {
      return getArrayWithSubArrays(this.drivers, 8);
    },
    isArrowsVisible() {
      return this.localDrivers.length > 1;
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";

.driver-title {
  font-family: $Montserrat;
  font-weight: 600;
  font-size: 18px;
}

.drivers-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, 132px);
  grid-gap: 10px;
}
</style>
