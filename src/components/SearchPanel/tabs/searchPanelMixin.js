import {
  CHANGE_TRIP_TYPE,
  SET_DATE,
  SET_PASSENGERS_COUNT, SET_RANGE_METERS, SET_VEHICLE_TYPE,
  SET_WAYPOINTS,
} from '@/store/modules/searchPanel/constants';
import { createNamespacedHelpers } from 'vuex';
import { TRIP_TYPE } from '@/store/modules/searchPanel';
import { LOADING_STATUSES } from '@/utils/constants';

const {
  mapMutations: mapSearchPanelMutations,
  mapState: mapSearchPanelState,
  mapGetters: mapSearchPanelGetters,
} = createNamespacedHelpers('searchPanel');

export default {
  data() {
    return {
      mapResultStatus: LOADING_STATUSES.IDLE,
    };
  },
  computed: {
    ...mapSearchPanelState(['filters']),
    ...mapSearchPanelGetters(['originAddress', 'destinationAddress', 'readableDate', 'qsFilters']),
    localDate: {
      get() {
        return this.filters.date;
      },
      set(newValue) {
        this[SET_DATE](newValue);
      },
    },
    localTripType: {
      get() {
        return this.filters.tripType;
      },
      set(newValue) {
        this[CHANGE_TRIP_TYPE](newValue);
      },
    },
    localPassengers: {
      get() {
        return this.filters.passengers;
      },
      set(newValue) {
        this[SET_PASSENGERS_COUNT](newValue);
      },
    },
    localVehicleType: {
      get() {
        return this.filters.vehicleType;
      },
      set(newValue) {
        this[SET_VEHICLE_TYPE](newValue);
      },
    },
    isSearchButtonActive() {
      return this.mapResultStatus === LOADING_STATUSES.SUCCESS && this.localPassengers > 0;
    },
  },
  methods: {
    ...mapSearchPanelMutations([
      CHANGE_TRIP_TYPE,
      SET_WAYPOINTS,
      SET_DATE,
      SET_PASSENGERS_COUNT,
      SET_VEHICLE_TYPE,
      SET_RANGE_METERS,
    ]),
    changeMode(mode) {
      this[CHANGE_TRIP_TYPE](mode);
      this.localDate = mode === TRIP_TYPE.ONE_WAY
        ? new Date()
        : { start: new Date(), end: new Date(new Date().setDate(31)) };
    },
    changeWaypoints(data) {
      this[SET_WAYPOINTS](data);
    },
    getResults() {
      this.$router.push({
        path: `search-results?${this.qsFilters}`,
      });
    },
    setMapResults(status) {
      this.mapResultStatus = status;
    },
    handleZeroMapResults() {
      this.mapResultStatus = LOADING_STATUSES.FAILURE;
    },
    setRangeMeters(data) {
      this.setMapResults(LOADING_STATUSES.SUCCESS);
      this[SET_RANGE_METERS](data);
    },
  },
};
