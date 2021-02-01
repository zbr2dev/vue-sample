import Vue from 'vue';
import {
  ADD_OR_UPDATE_BOOKING,
  ADD_OR_UPDATE_BOOKINGS,
  createOrUpdateTrips,
  getAllBookings,
  REMOVE_ALL_BOOKINGS,
  REMOVE_BOOKING,
  REMOVE_BOOKING_NOT_AUTHORIZED,
} from '@/store/modules/booking/constants';
import tripApi from '@/api/trexoz/TripApi';
import BookingModification from '@/store/modules/booking/BookingModification';

export async function addVehicleToTrips(trips) {
  // Get trips only with Boolean(vehicleId) === true;
  const filteredTrips = trips.filter((booking) => booking.vehicleId);

  // Get array of promises. Every callback gets vehicle info from backend
  const vehicleRequests = filteredTrips
    .map((booking) => tripApi.getVehicle(booking.vehicleId));

  // Wait for all responses
  const vehicleResponses = await Promise.all(vehicleRequests);

  // Add every vehicle to related trip
  filteredTrips.forEach((trip, index) => {
    // eslint-disable-next-line no-param-reassign
    trip.vehicle = { ...vehicleResponses[index].data };
  });

  return BookingModification.modifyBookingsFromBackend(filteredTrips);
}

const initialState = {
  bookings: [],
  bookNowCards: [],
};

export const updateBookings = (stateBookings, bookings) => {
  const newBookings = [...stateBookings];
  bookings.forEach((booking) => {
    const index = newBookings
      .findIndex((el) => (el.id && el.id === booking.id) || (el.customId && el.customId === booking.customId));
    if (index >= 0) {
      newBookings.splice(index, 1, booking);
    } else {
      newBookings.push(booking);
    }
  });
  return newBookings;
};

export default {
  namespaced: true,
  state: {
    ...initialState,
  },
  getters: {
    getBooking(state) {
      return ({ customId, id }) => state.bookings.find((el) => (id && el.id === id) || (customId && el.customId === customId));
    },
    getSubTotalSumBooking(state) {
      return (stateVar = 'bookings') => state[stateVar].reduce((sum, booking) => sum + booking.price, 0);
    },
  },
  mutations: {
    [ADD_OR_UPDATE_BOOKING](state, { booking, stateVar = 'bookings' }) {
      state[stateVar] = updateBookings(state[stateVar], [booking]);
    },
    [ADD_OR_UPDATE_BOOKINGS](state, { bookings, stateVar = 'bookings' }) {
      state[stateVar] = updateBookings(state[stateVar], bookings);
    },
    [REMOVE_BOOKING](state, { index, stateVar = 'bookings' }) {
      try {
        tripApi.deleteTrip(state[stateVar][index].id);
        Vue.delete(state[stateVar], index);
      } catch {
        Vue.delete(state[stateVar], index);
      }
    },
    [REMOVE_BOOKING_NOT_AUTHORIZED](state, { index, stateVar = 'bookings' }) {
      Vue.delete(state[stateVar], index);
    },
    [REMOVE_ALL_BOOKINGS](state, { stateVar = 'bookings' }) {
      state[stateVar] = [];
    },
  },

  actions: {
    async [createOrUpdateTrips]({ commit }, { trips, stateVar = 'bookings', userId }) {
      console.log(BookingModification.modifyBookingsForBack(trips, userId));

      const response = await tripApi.createOrUpdateTrip(BookingModification.modifyBookingsForBack(trips, userId));

      // Add an id to every item. We don`t have id when we upload it first time
      const bookings = trips.map((trip, index) => ({ ...trip, id: response.data[index] }));
      console.log(bookings);
      commit(ADD_OR_UPDATE_BOOKINGS, { bookings, stateVar });
    },

    async [getAllBookings]({ commit }) {
      const response = await tripApi.getInCart();
      const fullData = await addVehicleToTrips(response.data);
      const modifiedData = BookingModification.modifyBookingsFromBackend(fullData);
      commit(ADD_OR_UPDATE_BOOKINGS, { bookings: modifiedData });
    },
  },
};
