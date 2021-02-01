import {
  SET_CONTACT_LIST,
  SET_CONTACT_LOADING,
  SET_CONTACT_ERROR,
  SET_CONTACT_STATUS_INVITED,
  SET_CONTACT_STATUS_PENDING,
  SET_CURRENT_CONTACT_STATUS,
  SET_IMPORT_CONTACTS,
  GET_CURRENT_CONTACT,
  REMOVE_CONTACT_BY_ID,
  GET_PROFILE_DETAIL,
  SET_NEW_CONTACT,
  addContact,
  connectContact,
  connectNewContact,
  downloadTemplated,
  getContactList,
  removeContact,
  getContactDetail,
  getProfileDetail,
  importContactList, sendInviteWithText, sendInviteWithEmail, disconnectContact,
} from '@/store/modules/contacts/constants';
import userRelationshipApi from '@/api/trexoz/UserRelationshipApi';
import { LOADING_STATUSES } from '@/utils/constants';

const initialState = {
  loading: LOADING_STATUSES.IDLE,
  items: [],
  newContact: {},
  importContacts: [],
  currentContact: {},
  currentContactStatus: 0,
  profile: undefined,
  group: [],
  error: null,
};

export default {
  namespaced: true,
  state: {
    ...initialState,
  },
  getters: {
    getContacts(state) {
      return state.items;
    },
    getNewContactData(state) {
      return state.newContact;
    },
    getImportContacts(state) {
      return state.importContacts;
    },

    getCurrentContactStatus(state) {
      return state.currentContactStatus;
    },

    getCurrentContact(state) {
      return state.currentContact;
    },
  },
  mutations: {
    [SET_CONTACT_LOADING](state, status) {
      state.loading = status;
    },
    [GET_CURRENT_CONTACT](state, data) {
      state.currentContact = data;
    },
    [GET_PROFILE_DETAIL](state, data) {
      state.profile = data;
    },
    [SET_CONTACT_LIST](state, data) {
      state.items = data.contacts;
      state.groups = data.groups;
      state.loading = LOADING_STATUSES.SUCCESS;
    },
    [SET_IMPORT_CONTACTS](state, data) {
      state.importContacts = data;
      state.loading = LOADING_STATUSES.SUCCESS;
    },
    [SET_CURRENT_CONTACT_STATUS](state, data) {
      state.currentContactStatus = data;
    },
    [SET_NEW_CONTACT](state, data) {
      state.newContact = data;
    },
    [REMOVE_CONTACT_BY_ID](state, id) {
      state.items = state.items.filter((el) => el.id !== id);
      state.loading = LOADING_STATUSES.SUCCESS;
    },
    [SET_CONTACT_STATUS_INVITED](state, id) {
      const index = state.items.findIndex((el) => el.id === id);
      state.items[index].invited = true;
    },
    [SET_CONTACT_STATUS_PENDING](state, id) {
      const index = state.items.findIndex((el) => el.id === id);
      state.items[index].status = 2;
      console.log(state.items[index]);
    },
    [SET_CONTACT_ERROR](state, error) {
      state.error = error;
      state.loading = LOADING_STATUSES.FAILURE;
      state.items = [];
    },
  },
  actions: {
    async [getContactList]({ commit }, query) {
      commit(SET_CONTACT_LOADING, LOADING_STATUSES.LOADING);
      try {
        console.log('!!!!');
        const response = await userRelationshipApi.getContactList(query);
        console.log(response);
        commit(SET_CONTACT_LIST, response.data);
      } catch (err) {
        commit(SET_CONTACT_ERROR, LOADING_STATUSES.FAILURE);
      }
    },

    // async [addContact]({ commit }, data) {
    //   commit(SET_CONTACT_LOADING, LOADING_STATUSES.LOADING);
    //   try {
    //     const response = await userRelationshipApi.createContact(data);
    //     commit(GET_NEW_CONTACT, response);
    //     commit(SET_CONTACT_LIST, response);
    //   } catch (err) {
    //     commit(SET_CONTACT_ERROR, LOADING_STATUSES.FAILURE);
    //   }
    // },

    async [addContact]({ commit }, data) {
      commit(SET_CONTACT_LOADING, LOADING_STATUSES.LOADING);
      try {
        const response = await userRelationshipApi.createContact(data);
        commit(SET_NEW_CONTACT, response.data[0]);
      } catch (err) {
        commit(SET_CONTACT_ERROR, LOADING_STATUSES.FAILURE);
      }
    },

    async [importContactList]({ commit }, file) {
      commit(SET_CONTACT_LOADING, LOADING_STATUSES.LOADING);
      try {
        const response = await userRelationshipApi.uploadTemplate(file);
        commit(SET_IMPORT_CONTACTS, response.data);
      } catch (err) {
        commit(SET_CONTACT_ERROR, LOADING_STATUSES.FAILURE);
      }
    },

    async [getContactDetail]({ commit }, user) {
      console.log(user);
      commit(SET_CONTACT_LOADING, LOADING_STATUSES.LOADING);
      try {
        let response;
        if (user.status === 3) {
          response = await userRelationshipApi.getProfileDetail(user.id);
        } else {
          response = await userRelationshipApi.getContactDetail(user.id);
        }
        commit(SET_CURRENT_CONTACT_STATUS, user.status);
        commit(GET_CURRENT_CONTACT, response.data);
      } catch (err) {
        commit(SET_CONTACT_ERROR, LOADING_STATUSES.FAILURE);
      }
    },

    async [getProfileDetail]({ commit }, id) {
      commit(SET_CONTACT_LOADING, LOADING_STATUSES.LOADING);
      try {
        const response = await userRelationshipApi.getProfileDetail(id);
        commit(GET_PROFILE_DETAIL, response);
      } catch (err) {
        commit(SET_CONTACT_ERROR, LOADING_STATUSES.FAILURE);
      }
    },

    async [removeContact]({ commit }, id) {
      try {
        // eslint-disable-next-line no-unused-vars
        await userRelationshipApi.deleteContact(id);
        commit(REMOVE_CONTACT_BY_ID, id);
      } catch (err) {
        console.log(err);
      }
    },
    async [getProfileDetail]({ commit }, id) {
      commit(SET_CONTACT_LOADING, LOADING_STATUSES.LOADING);
      try {
        const response = await userRelationshipApi.getProfileDetail(id);
        commit(GET_PROFILE_DETAIL, response);
      } catch (err) {
        commit(SET_CONTACT_ERROR, LOADING_STATUSES.FAILURE);
      }
    },
    async [sendInviteWithText]({ commit }, id) {
      try {
        await userRelationshipApi.inviteWithText(id);
        commit(SET_CONTACT_STATUS_INVITED, id);
      } catch (err) {
        console.log(err);
      }
    },
    async [sendInviteWithEmail]({ commit }, id) {
      try {
        await userRelationshipApi.inviteWithEmail(id);
        commit(SET_CONTACT_STATUS_INVITED, id);
      } catch (err) {
        console.log(err);
      }
    },
    async [connectContact]({ commit }, id) {
      try {
        await userRelationshipApi.connectContact(id);
        commit(SET_CONTACT_STATUS_PENDING, id);
      } catch (err) {
        commit(SET_CONTACT_STATUS_PENDING, id);
        console.log(err);
      }
    },
    // eslint-disable-next-line no-empty-pattern
    async [connectNewContact]({}, id) {
      try {
        await userRelationshipApi.connectContact(id);
        // commit(SET_CONTACT_STATUS_PENDING, id);
      } catch (err) {
        // commit(SET_CONTACT_STATUS_PENDING, id);
        console.log(err);
      }
    },
    async [disconnectContact]({ commit }, id) {
      try {
        await userRelationshipApi.disconnectContact(id);
        commit(SET_CONTACT_STATUS_INVITED, id);
      } catch (err) {
        console.log(err);
      }
    },
    async [downloadTemplated]() {
      try {
        const response = await userRelationshipApi.downLoadTemplated();
        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        const fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'TrexozUploadTemplate.xlsx');
        document.body.appendChild(fileLink);
        fileLink.click();
        document.body.removeChild(fileLink);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
