<template>
  <div class="filters">
    <google-map-direction :waypoints="waypoints" class="filters__map"/>
    <chosen-location-card
      @edit="$emit('edit')"
      @filter="handleFilterButtonClick"
      :style="locationCardStyle"
      ref="locationCard"
    />

    <trip-filters v-if="isFilterSectionVisible" class="filters__trip-filters" :style="{width: tripFiltersWidth}"/>
  </div>
</template>

<script>
import ChosenLocationCard from '@/components/searchingResults/mapSection/ChosenLocationCard.vue';
import { michiganCoordinates } from '@/utils/constants';
import GoogleMapDirection from '@/components/UI/googleMap/GoogleMapDirection.vue';
import TripFilters from '@/components/searchingResults/mapSection/TripFilters.vue';

export default {
  name: 'ChosenFiltersAndMap',
  props: {
    waypoints: {
      type: Array, required: true,
    },
    locationCardStyle: {
      type: Object,
    },
  },
  components: {
    TripFilters,
    GoogleMapDirection,
    ChosenLocationCard,
  },
  data() {
    return {
      isFilterSectionVisible: false,
      tripFiltersWidth: 0,
      michiganCoordinates,
    };
  },
  methods: {
    handleFilterButtonClick() {
      this.isFilterSectionVisible = !this.isFilterSectionVisible;
    },
    changeTripFiltersWidth() {
      this.tripFiltersWidth = `${this.$refs.locationCard.$el.offsetWidth}px`;
    },
  },
  watch: {
    // eslint-disable-next-line func-names
    '$vuetify.breakpoints.width': function () {
      this.changeTripFiltersWidth();
    },
  },
  mounted() {
    this.changeTripFiltersWidth();
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";

  .filters {
    position: relative;
    padding: 28px 20px;

    &__map {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    &__trip-filters {
      margin-top: 20px;
      min-height: 100px;
      //max-width: 310px; // todo: fix
      //width: 100%;
      position: absolute;
      z-index: 2;
      max-height: 500px;
      overflow-y: auto;

      @include scrollbar;
    }
  }
</style>
