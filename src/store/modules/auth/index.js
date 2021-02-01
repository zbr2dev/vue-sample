import {
  SET_USER_PROFILE,
} from '@/store/modules/auth/constants';
import LocalStorage from '@/utils/LocalStorage';
import TrexozApi from '@/api/common/TrexozApi';

const initialState = {
  userProfile: null,
};

export default {
  namespaced: true,
  state: {
    ...initialState,
  },
  getters: {
    getProfileData(state) {
      return state.profileData;
    },
  },
  mutations: {
    [SET_USER_PROFILE](state, payload) {
      state.userProfile = payload;
    },
  },
  actions: {
    checkUserStatus(state, payload) {
      if (!payload) {
        // logout
        LocalStorage.setAccessToken('');
        new TrexozApi().setAuthHeader(null);
        state.commit('SET_USER_PROFILE', null);
      } else {
        state.commit('SET_USER_PROFILE', payload.profile);
      }
    },
  },
};
