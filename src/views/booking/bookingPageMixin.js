import { createNamespacedHelpers } from 'vuex';
import {
  ADD_OR_UPDATE_BOOKING, createOrUpdateBookNow,
  createOrUpdateTrips, getAllBookings,
  REMOVE_BOOKING, REMOVE_BOOKING_NOT_AUTHORIZED,
} from '@/store/modules/booking/constants';

const {
  mapState: mapBookingState,
  mapGetters: mapBookingGetters,
  mapMutations: mapBookingMutations,
  mapActions: mapBookingActions,
} = createNamespacedHelpers('booking');

const {
  mapState: mapAuthState,
} = createNamespacedHelpers('auth');

export default {
  computed: {
    ...mapBookingState(['bookings', 'bookNowCards']),
    ...mapBookingGetters(['getSubTotalSumBooking']),
    ...mapAuthState(['userProfile']),
    $_isFromBookNow() {
      return Object.keys(this.$route.query).includes('bookNow');
    },

    currentBookings() {
      return this.$_isFromBookNow ? this.bookNowCards : this.bookings;
    },

    currentStateVariable() {
      return this.$_isFromBookNow ? 'bookNowCards' : 'bookings';
    },
    sumBooking() {
      return this.getSubTotalSumBooking(this.currentStateVariable);
    },
  },
  methods: {
    ...mapBookingMutations([REMOVE_BOOKING, REMOVE_BOOKING_NOT_AUTHORIZED, ADD_OR_UPDATE_BOOKING]),
    ...mapBookingActions([createOrUpdateTrips, createOrUpdateBookNow, getAllBookings]),
    handleRemoveTrexozCard(index) {
      if (this.userProfile) this[REMOVE_BOOKING]({ index, stateVar: this.currentStateVariable });
      else this[REMOVE_BOOKING_NOT_AUTHORIZED]({ index, stateVar: this.currentStateVariable });
    },
    updateBooking(booking) {
      this[ADD_OR_UPDATE_BOOKING]({ booking, stateVar: this.currentStateVariable });
    },
    updateServerBookingData() {
      console.log("I'm called!");
      console.log('book', this.currentBookings);
      return this[createOrUpdateTrips]({ trips: this.currentBookings, stateVar: this.currentStateVariable, userId: this.userProfile.UserId });
    },
  },
};
