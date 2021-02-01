<template>
  <div class="results">
    <div class="results__body">
      <chosen-filters-and-map
        :waypoints="filters.waypoints"
        @edit="handleEditIconClick"
      />
      <all-results :trips="tripsWithoutItemsInBooking" :tripsLoading="tripsLoading" v-bind:order.sync="localOrderSorting"/>
    </div>
  </div>
</template>

<script>
import AllResults from '@/components/searchingResults/AllResults.vue';
import { createNamespacedHelpers } from 'vuex';
import { fetchTrips } from '@/store/modules/trips/constants';
import ChosenFiltersAndMap from '@/components/searchingResults/mapSection/ChosenFiltersAndMap.vue';
import MOBILE_FILTRATION_STEPS from '@/components/SearchPanel/mobile/other/steps';
import { SET_ALL_SEARCH_PANEL_FILTERS, SET_ORDER_SORTING, SET_WAYPOINTS } from '@/store/modules/searchPanel/constants';
import * as qs from 'qs';

const { mapActions: mapTripsActions, mapState: mapTripsState } = createNamespacedHelpers('trips');
const {
  mapState: mapSearchPanelState,
  mapGetters: mapSearchPanelGetters,
  mapMutations: mapSearchPanelMutations,
} = createNamespacedHelpers('searchPanel');

const {
  mapState: mapBookingState,
} = createNamespacedHelpers('booking');

export default {
  name: 'SearchResults',
  components: { ChosenFiltersAndMap, AllResults },
  computed: {
    ...mapTripsState(['trips', 'tripsLoading']),
    ...mapSearchPanelState(['filters']),
    ...mapSearchPanelGetters(['filtersForApi', 'qsFilters']),
    ...mapBookingState(['bookings']),
    localOrderSorting: {
      get() {
        return this.filters.order;
      },
      set(newValue) {
        this[SET_ORDER_SORTING](newValue);
      },
    },
    tripsWithoutItemsInBooking() {
      const bookingVehicleIds = this.bookings.map((booking) => (booking && booking.vehicle && booking.vehicle.id) || booking.vehicleId);
      console.log(this.trips);
      const items = this.trips.items.filter((trip) => !bookingVehicleIds.includes(trip.id));
      return {
        ...this.trips, items,
      };
    },
  },
  methods: {
    ...mapTripsActions([fetchTrips]),
    ...mapSearchPanelMutations([SET_ALL_SEARCH_PANEL_FILTERS, SET_WAYPOINTS, SET_ORDER_SORTING]),
    handleEditIconClick() {
      this.$router.push({ path: '/', query: { mobileStep: String(MOBILE_FILTRATION_STEPS.DETAILS) } });
    },
  },
  created() {
    const queryParams = qs.parse(window.location.href.match(/\?.*/)[0].slice(1));
    queryParams.passengers = Number(queryParams.passengers) || this.filters.passengers;
    queryParams.rangeMeters = Number(queryParams.rangeMeters) || this.filters.rangeMeters || 1234;
    queryParams.waypoints = (Array.isArray(queryParams.waypoints) && queryParams.waypoints.map((point) => (
      {
        ...point,
        lat: Number(point.lat),
        lng: Number(point.lng),
      }
    ))) || [];

    this[SET_ALL_SEARCH_PANEL_FILTERS](queryParams);
  },
  // mounted() {
  //   this[fetchTrips](this.filtersForApi);
  // },
  watch: {
    filtersForApi(newValue, oldValue) {
      this[fetchTrips](newValue);

      if (newValue.order !== oldValue.order) {
        this.$router.replace(`${this.$route.path}?${this.qsFilters}`);
      }
    },
  },
};
</script>

<style scoped lang="scss">
  .results {
    z-index: 1;

    &__body {
      display: grid;
      height: 100%;
      grid-template-columns: 24.5% 1fr;
      grid-gap: 2%;
    }
  }

  @media screen and (min-width: 768px) and (max-width: 1200px) {
    .results {
      &__body {
        grid-template-columns: 255px 1fr;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .results {
      &__body {
        grid-template-columns: 100%;
        grid-template-rows: 350px 1fr;
      }
    }
  }
</style>
