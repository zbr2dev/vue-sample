import { createNamespacedHelpers } from 'vuex';
import LocalStorageApi from '@/utils/LocalStorage';
import {
  ADD_OR_UPDATE_BOOKING, createOrUpdateBookNow,
  createOrUpdateTrips,
} from '@/store/modules/booking/constants';
import {
  CLOSE_DRIVER_INFO, SET_BOOKING_NOTIFY_MODAL_VISIBILITY,
  SET_SELECTED_DRIVER,
  showClickedDriver,
  SET_CURRENT_PREPARED_TRIP,
} from '@/store/modules/tripDetailsPage/constants';
import TripInfo from '@/utils/TripInfo';
import { getUniqueId } from '@/utils/helpers';

const {
  mapGetters: mapVehicleGetters,
} = createNamespacedHelpers('vehicle');

const {
  mapGetters: mapBookingGetters,
  mapMutations: mapBookingMutations,
  mapActions: mapBookingActions,
} = createNamespacedHelpers('booking');

const {
  mapGetters: mapSearchPanelGetters,
} = createNamespacedHelpers('searchPanel');

const {
  mapActions: mapTripDetailsPageActions,
  mapMutations: mapTripDetailsPageMutations,
  mapState: mapTripDetailsPageState,
} = createNamespacedHelpers('tripDetailsPage');

const {
  mapState: mapTripsState,
} = createNamespacedHelpers('trips');

const {
  mapState: mapAuthState,
} = createNamespacedHelpers('auth');

function getSortedPhotos(arr) {
  const newArr = [...arr];
  const variants = {
    'right back': 1, 'right front': 2, front: 3, 'left front': 4, 'left back': 5,
  };
  newArr.sort((a, b) => {
    const aTags = a.tags.join(' ').toLowerCase();
    const bTags = b.tags.join(' ').toLowerCase();
    return variants[aTags] - variants[bTags];
  });
  return newArr;
}

export const modifyBookingsForBack = (bookings) => bookings.map((oldEl) => {
  const el = { ...oldEl };
  return {
    companyId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    vehicleId: el.vehicle.id,
    tripStatusId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    createdDateTime: '2020-12-01T16:18:41.865Z',
    // It is pulocationLat, pulocationLon, dolocationLat, dolocationLon, stops
    ...TripInfo.getMainLocationsAndStops(el.filters.waypoints),
    pudateTime: '2020-12-03T11:10:53.299Z',
    dodateTime: '2020-12-03T11:10:53.299Z',
    price: 0,
    reservationNumber: 0,
    tripStatus: 'string',
    users: [{
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      role: 'string',
    }],
    notes: el.notes,
  };
});

export default {
  computed: {
    ...mapVehicleGetters(['vehicle']),
    ...mapSearchPanelGetters(['filtersForBooking', 'filtersForApi', 'qsFilters']),
    ...mapTripDetailsPageState(['pageData', 'currentPreparedTrip']),
    ...mapAuthState(['userProfile']),
    ...mapBookingGetters(['getBooking']),
    ...mapTripsState(['trips']),
    carImages() {
      return getSortedPhotos(this.vehicle.images);
    },
    isBookingNotifyModalVisible: {
      get() {
        return this.pageData.isBookingNotifyModalVisible;
      },
      set(newValue) {
        this[SET_BOOKING_NOTIFY_MODAL_VISIBILITY](newValue);
      },
    },
  },
  methods: {
    ...mapBookingMutations([ADD_OR_UPDATE_BOOKING]),
    ...mapTripDetailsPageActions([showClickedDriver]),
    ...mapTripDetailsPageMutations([
      CLOSE_DRIVER_INFO,
      SET_SELECTED_DRIVER,
      SET_BOOKING_NOTIFY_MODAL_VISIBILITY,
      SET_CURRENT_PREPARED_TRIP,
    ]),
    ...mapBookingActions([createOrUpdateTrips, createOrUpdateBookNow]),
    async createTrip(stateVar) {
      console.log(this.currentPreparedTrip);
      console.log(stateVar);
      // debugger;
      return this[createOrUpdateTrips]({ trips: [this.currentPreparedTrip], stateVar, userId: this.userProfile.UserId });
    },
    async goToTripDetails() {
      this.addBooking();
      if (this.userProfile) {
        try {
          await this.createTrip();
          this.goToSearchResults();
        } catch (error) {
          // eslint-disable-next-line no-alert
          console.log(error);
          alert(error.message);
        }
      } else {
        this.goToSearchResults();
      }
    },
    goToSearchResults() {
      this.$router.push({ path: `/search-results?${this.qsFilters}` });
    },
    addBooking() {
      console.log(this.booking);
      // console.log(this.getBooking());
      // const preparedObject = JSON.parse(JSON.stringify(this.currentPreparedTrip));
      this[ADD_OR_UPDATE_BOOKING]({
        booking: this.currentPreparedTrip,
      });
    },
    handleAddToCart() {
      // console.log(this.currentPreparedTrip);
      if (LocalStorageApi.getBookingNotificationShowing()) {
        this[SET_BOOKING_NOTIFY_MODAL_VISIBILITY](true);
      } else {
        this.goToTripDetails();
      }
    },
    handleNotifyGotIt(data) {
      this[SET_BOOKING_NOTIFY_MODAL_VISIBILITY](false);
      if (data.dontShowMeAgain) {
        LocalStorageApi.setBookingNotification(data.dontShowMeAgain);
      }
      this.goToTripDetails();
    },

    async handleGoToBooking() {
      // this.addBooking();
      if (this.userProfile) {
        try {
          await this.createTrip('bookNowCards');
          this.$router.push('/booking-1?bookNow');
        } catch (error) {
          // eslint-disable-next-line no-alert
          console.log(error);
          alert(error.message);
        }
        // eslint-disable-next-line no-alert
      } else if (window.confirm('You must login before. Are you sure want to leave this page?')) {
        LocalStorageApi.setRedirectUri(this.$route.path);
        this.$mainOidc.signinRedirect();
      }
    },
    $_setCurrentPreparedTrip() {
      if (!this.currentPreparedTrip || (this.currentPreparedTrip.vehicle.id !== this.vehicle.id)) {
        const customId = getUniqueId();
        const vehicleFromTrip = this.trips.items.find((trip) => trip.id === this.vehicle.id);
        // console.log(this.filtersForApi);
        // console.log(this.filtersForBooking);
        const data = {
          customId,
          filters: { ...this.filtersForBooking, rangeMeters: this.filtersForApi.rangeMeters },
          vehicle: this.vehicle,
          price: (vehicleFromTrip && vehicleFromTrip.price) || 0,
          locations: this.filtersForBooking.waypoints,
          distanceMeters: this.filtersForApi.rangeMeters,
        };

        this[SET_CURRENT_PREPARED_TRIP](data);
      }
    },
  },
};
