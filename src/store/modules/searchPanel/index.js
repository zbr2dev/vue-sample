import {
  CHANGE_TRIP_TYPE, SET_ALL_SEARCH_PANEL_FILTERS,
  SET_DATE, SET_ORDER_SORTING,
  SET_PASSENGERS_COUNT, SET_RANGE_METERS, SET_VEHICLE_TYPE,
  SET_WAYPOINTS,
} from '@/store/modules/searchPanel/constants';
import TripInfo from '@/utils/TripInfo';
import * as qs from 'qs';

export const TRIP_TYPE = {
  ONE_WAY: 'Way',
  BY_HOUR: 'Hour',
};

export const buttonsByTimeMode = [
  { title: 'Point-to-point', mode: TRIP_TYPE.ONE_WAY },
  { title: 'By the hour', mode: TRIP_TYPE.BY_HOUR },
];

const initialState = {
  filters: {
    tripType: TRIP_TYPE.ONE_WAY,
    waypoints: [],
    date: new Date(),
    passengers: 1,
    vehicleType: ['All'],
    rangeMeters: 0,
    order: 'BestMatch',
    limit: 10, // hardcode
  },
};

export default {
  namespaced: true,
  state: {
    ...initialState,
  },
  getters: {
    originAddress(state) {
      return TripInfo.getOriginAddress(state.filters.waypoints);
    },
    destinationAddress(state) {
      console.log(state);
      return TripInfo.getDestinationAddress(state.filters.waypoints);
    },
    readableDate(state) {
      return TripInfo.getReadableTripDate(new Date(state.filters.date).getTime());
    },
    readableTripType(state) {
      return buttonsByTimeMode.find((el) => el.mode === state.filters.tripType).title;
    },

    qsFilters(state) {
      const {
        vehicleType, passengers, tripType, rangeMeters, order, limit, waypoints, date,
      } = state.filters;
      return qs.stringify({
        vehicleType, passengers, tripType, rangeMeters, order, limit, waypoints, date,
      });
    },
    filtersForApi(state) {
      const {
        vehicleType, passengers, tripType, rangeMeters, order, limit,
      } = state.filters;

      return {
        vehicleType,
        passengers,
        tripType,
        rangeMeters,
        order,
        limit,
      };
    },

    filtersForBooking(state) {
      const {
        vehicleType, passengers, waypoints, date,
      } = state.filters;

      return {
        vehicleType,
        passengers,
        waypoints,
        date,
      };
    },
  },
  mutations: {
    [CHANGE_TRIP_TYPE](state, mode) {
      state.filters.tripType = mode;
    },
    [SET_WAYPOINTS](state, waypoints) {
      state.filters.waypoints = waypoints;
    },
    [SET_DATE](state, date) {
      state.filters.date = date;
    },
    [SET_PASSENGERS_COUNT](state, count) {
      state.filters.passengers = count;
    },
    [SET_VEHICLE_TYPE](state, type) {
      state.filters.vehicleType = type;
    },
    [SET_RANGE_METERS](state, data) {
      state.filters.rangeMeters = data.distance;
    },
    [SET_ORDER_SORTING](state, value) {
      state.filters.order = value;
    },
    [SET_ALL_SEARCH_PANEL_FILTERS](state, data) {
      state.filters = {
        ...state.filters,
        ...data,
      };
    },
  },
};
