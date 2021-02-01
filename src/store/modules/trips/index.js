import { fetchTrips, SET_TRIPS, SET_TRIPS_LOADING } from '@/store/modules/trips/constants';
import tripApi from '@/api/trexoz/TripApi';
import { LOADING_STATUSES } from '@/utils/constants';

export default {
  namespaced: true,
  state: {
    trips: {
      items: [],
      totalCount: 0,
    },
    tripsLoading: LOADING_STATUSES.IDLE,
  },
  mutations: {
    [SET_TRIPS](state, data) {
      state.trips = data;
    },
    [SET_TRIPS_LOADING](state, data) {
      state.tripsLoading = data;
    },
  },
  actions: {
    async [fetchTrips]({ commit }, params) {
      try {
        commit(SET_TRIPS_LOADING, LOADING_STATUSES.LOADING);
        const response = await tripApi.getTripList(params);
        commit(SET_TRIPS, response.data);
        commit(SET_TRIPS_LOADING, LOADING_STATUSES.SUCCESS);
      } catch (err) {
        commit(SET_TRIPS_LOADING, LOADING_STATUSES.FAILURE);
      }
    },
  },

};
