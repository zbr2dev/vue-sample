import tripApi from '@/api/trexoz/TripApi';
import {
  CLOSE_DRIVER_INFO,
  SET_DRIVER_FOR_SHOWING_INFO, SET_DRIVER_INFO_VISIBILITY, SET_SELECTED_DRIVER,
  SET_BOOKING_NOTIFY_MODAL_VISIBILITY, showClickedDriver, SET_CURRENT_PREPARED_TRIP,
} from '@/store/modules/tripDetailsPage/constants';

const initialState = {
  pageData: {
    isVisibleDriverInfo: false,
    driverForShowingInfo: {},
    isBookingNotifyModalVisible: false,
  },

  // Example: currentTrip: { driver: {} }
  currentPreparedTrip: null,
};

export default {
  namespaced: true,
  state: {
    ...initialState,
  },

  mutations: {
    [CLOSE_DRIVER_INFO](state) {
      state.pageData.isVisibleDriverInfo = false;
      state.pageData.driverForShowingInfo = {};
    },
    [SET_SELECTED_DRIVER](state, driver) {
      // driver can be null
      console.log(state.currentPreparedTrip);
      state.currentPreparedTrip = { ...state.currentPreparedTrip, driver };
    },
    [SET_BOOKING_NOTIFY_MODAL_VISIBILITY](state, status) {
      state.pageData.isBookingNotifyModalVisible = status;
    },
    [SET_DRIVER_INFO_VISIBILITY](state, status) {
      state.pageData.isVisibleDriverInfo = status;
    },
    [SET_DRIVER_FOR_SHOWING_INFO](state, driver) {
      state.pageData.driverForShowingInfo = driver;
    },
    [SET_CURRENT_PREPARED_TRIP](state, data) {
      console.log(data);
      state.currentPreparedTrip = data;
    },
  },

  actions: {
    async [showClickedDriver]({ commit, state }, driver) {
      if (state.pageData.driverForShowingInfo.id === driver.id && state.pageData.isVisibleDriverInfo) {
        commit(CLOSE_DRIVER_INFO);
      } else {
        const response = await tripApi.getDriver(driver.id);
        commit(SET_DRIVER_FOR_SHOWING_INFO, response.data);
        commit(SET_DRIVER_INFO_VISIBILITY, true);
      }
    },
  },
};
