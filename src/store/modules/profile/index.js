import {
  GET_PROFILE_DETAIL,
  getMyProfileDetail,
  putCurrentProfileDetail,
  GET_PROFILE_DETAIL_AVATAR,
  updateAvatar,
  SET_AVATAR,
  SET_USER_PROFILE_PHOTO,
  getMyProfilePhoto,
} from '@/store/modules/profile/constants';
import userRelationshipApi from '@/api/trexoz/UserRelationshipApi';
import router from '../../../router/index';

const initialState = {
  avatar: null,
  profileData: undefined,
  profilePhoto: undefined,
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
    getProfileAvatar(state) {
      return state.avatar;
    },
    getUserProfilePhoto(state) {
      return state.profilePhoto;
    },
  },
  mutations: {
    [GET_PROFILE_DETAIL](state, payload) {
      state.profileData = payload;
    },
    [GET_PROFILE_DETAIL_AVATAR](state, payload) {
      state.avatar = payload;
    },
    [SET_AVATAR](state, data) {
      state.avatar = data;
    },
    [SET_USER_PROFILE_PHOTO](state, data) {
      state.profilePhoto = data;
    },
  },
  actions: {
    async [getMyProfilePhoto]({ commit }) {
      try {
        const response = await userRelationshipApi.getCurrentProfilePhoto();
        commit(SET_USER_PROFILE_PHOTO, `data:image/jpeg;base64,${response.data.photoBase64}`);
      } catch (err) {
        console.log(err);
      }
    },
    async [getMyProfileDetail]({ commit }, data) {
      try {
        const response = await userRelationshipApi.getCurrentProfileDetail(data);
        commit(GET_PROFILE_DETAIL, response.data);
      } catch (err) {
        console.log(err);
      }
    },
    async [putCurrentProfileDetail](_, data) {
      try {
        await userRelationshipApi.putCurrentProfileDetail(data);
        await router.push({ name: 'Home' });
      } catch (err) {
        alert(err);
        console.log(err);
      }
    },
    async [updateAvatar]({ commit }, { file, avatar }) {
      try {
        const formData = new FormData();
        formData.append('file', file, file.name);
        await userRelationshipApi.uploadAvatar(formData);
        commit(SET_AVATAR, avatar);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
