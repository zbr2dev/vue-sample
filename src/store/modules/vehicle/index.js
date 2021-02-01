import tripApi from '@/api/trexoz/TripApi';
import {
  fetchSingleVehicle,
  SET_VEHICLE,
  SET_VEHICLE_LOADING,
} from '@/store/modules/vehicle/constants';
import { LOADING_STATUSES } from '@/utils/constants';

export default {
  namespaced: true,
  state: {
    vehicle: null,
    vehicleLoading: LOADING_STATUSES.IDLE,
  },
  getters: {
    vehicle(state) {
      return state.vehicle;
    },
  },
  mutations: {
    [SET_VEHICLE](state, data) {
      state.vehicle = data;
    },
    [SET_VEHICLE_LOADING](state, status) {
      state.vehicleLoading = status;
    },
  },
  actions: {
    async [fetchSingleVehicle]({ commit }, id) {
      try {
        commit(SET_VEHICLE_LOADING, LOADING_STATUSES.LOADING);
        const response = await tripApi.getVehicle(id);
        commit(SET_VEHICLE, { id, ...response.data });
        commit(SET_VEHICLE_LOADING, LOADING_STATUSES.SUCCESS);
      } catch (err) {
        commit(SET_VEHICLE_LOADING, LOADING_STATUSES.FAILURE);
      }
    },
  },
};
