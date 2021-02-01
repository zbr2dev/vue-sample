import tripApi from '@/api/trexoz/TripApi';
import { LOADING_STATUSES } from '@/utils/constants';
import BookingModification from '@/store/modules/booking/BookingModification';

import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import tripsStatusOptions from '@/components/selects/TripsStatusSelect/options';
import tripTypesOptions from '@/components/selects/TripsTypesSelect/options';
import tripGroupsOptions from '@/components/selects/TripGroupsSelect/options';
import { addVehicleToTrips } from '@/store/modules/booking';
import {
  getMyTrips,
  SET_MY_TRIPS_DATA,
  SET_MY_TRIPS_ERROR,
  SET_MY_TRIPS_FILTERS,
  SET_MY_TRIPS_LOADING,
} from './constants';

const initialState = {
  myTrips: {
    loading: LOADING_STATUSES.IDLE,
    error: null,
    items: [],
    filters: {
      dateFrom: startOfMonth(new Date()),
      DateTo: endOfMonth(new Date()),
      order: 'Latest',
      statuses: [],
      vahicleTypes: [],
      socialityTypes: [],
    },
  },
};

export default {
  namespaced: true,
  state: {
    ...initialState,
  },
  getters: {
    myTripsFiltersForBack(state) {
      const { filters } = state.myTrips;
      return {
        ...filters,
        dateFrom: new Date(filters.dateFrom).toISOString(),
        DateTo: new Date(filters.DateTo).toISOString(),
        statuses: filters.statuses.length === tripsStatusOptions.length ? [] : filters.statuses,
        vahicleTypes: filters.vahicleTypes.length === tripTypesOptions.length ? [] : filters.vahicleTypes,
        socialityTypes: filters.socialityTypes.length === tripGroupsOptions.length ? [] : filters.socialityTypes,
      };
    },
  },
  mutations: {
    [SET_MY_TRIPS_LOADING](state, status) {
      state.myTrips.loading = status;
    },
    [SET_MY_TRIPS_DATA](state, data) {
      state.myTrips.items = data;
      state.myTrips.loading = LOADING_STATUSES.SUCCESS;
    },
    [SET_MY_TRIPS_ERROR](state, error) {
      state.myTrips.error = error;
      state.myTrips.loading = LOADING_STATUSES.FAILURE;
      state.myTrips.items = [];
    },
    [SET_MY_TRIPS_FILTERS](state, newFilters) {
      state.myTrips.filters = {
        ...state.myTrips.filters,
        ...newFilters,
      };
    },
  },

  actions: {
    async [getMyTrips]({ commit }, filters) {
      commit(SET_MY_TRIPS_LOADING, LOADING_STATUSES.LOADING);
      try {
        const response = await tripApi.getAllTrips(filters);
        const fullData = await addVehicleToTrips(response.data);
        const modifiedData = BookingModification.modifyBookingsFromBackend(fullData);
        commit(SET_MY_TRIPS_DATA, modifiedData);
      } catch (err) {
        commit(SET_MY_TRIPS_ERROR, LOADING_STATUSES.FAILURE);
      }
    },
  },
};
