import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import searchPanel from './modules/searchPanel';
import trips from './modules/trips';
import vehicle from './modules/vehicle';
import booking from './modules/booking';
import tripDetailsPage from './modules/tripDetailsPage';
import auth from './modules/auth';
import myTrips from './modules/myTrips';
import contacts from './modules/contacts';
import profile from './modules/profile';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    auth,
    searchPanel,
    trips,
    vehicle,
    booking,
    tripDetailsPage,
    myTrips,
    contacts,
    profile,
  },
  plugins: [createPersistedState({
    paths: ['booking', 'tripDetailsPage', 'contacts', 'profile'],
  })],
});
