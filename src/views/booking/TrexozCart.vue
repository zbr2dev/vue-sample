<template>
  <booking-page-layout :show-step="false" header="Trexoz Cart" class="card trexoz-card">
    <trexos-carts-list
      :bookings="bookings"
      @remove="handleRemoveTrexozCard"
    />

    <booking-subtotal
      button-label="Go to booking"
      :bookings-length="bookings.length"
      :booking-sum="sumBooking"
      @btnClick="createTrip"
    />

    <oh-no-modal v-model="isOhNoModalVisible" :bookings="availableBookings" @continueBooking="$router.push('/booking-1')" />
  </booking-page-layout>
</template>

<script>
import TrexosCartsList from '@/components/booking/trexozCartPage/TrexosCartsList.vue';
import OhNoModal from '@/components/booking/trexozCartPage/ohNoModal/OhNoModal.vue';
import bookingPageMixin from '@/views/booking/bookingPageMixin';
import BookingSubtotal from '@/components/booking/general/BookingSubtotal.vue';
import BookingPageLayout from '@/components/booking/general/BookingPageLayout.vue';
import { createNamespacedHelpers } from 'vuex';
import tripApi from '@/api/trexoz/TripApi';
import LocalStorageApi from '@/utils/LocalStorage';
import { createOrUpdateTrips, getAllBookings } from '@/store/modules/booking/constants';

const {
  mapState: mapVehicleState,
} = createNamespacedHelpers('vehicle');
const {
  mapState: mapBookingState,
  mapActions: mapBookingActions,
} = createNamespacedHelpers('booking');
const {
  mapState: mapSearchPanelState,
} = createNamespacedHelpers('searchPanel');

const {
  mapState: mapAuthState,
} = createNamespacedHelpers('auth');

export default {
  name: 'TrexozCart',
  mixins: [bookingPageMixin],
  components: {
    BookingPageLayout,
    BookingSubtotal,
    OhNoModal,
    TrexosCartsList,
  },
  data() {
    return {
      isOhNoModalVisible: false,
      availableBookings: [],
    };
  },
  computed: {
    ...mapVehicleState(['vehicle']),
    ...mapSearchPanelState(['filters']),
    ...mapBookingState(['booking']),
    ...mapAuthState(['userProfile']),
  },
  methods: {
    ...mapBookingActions([createOrUpdateTrips, getAllBookings]),
    async createTrip() {
      try {
        if (this.userProfile) {
          const response = await tripApi.checkTripAvailability(this.bookings.map((booking) => booking.id));
          if (!response.data.status) {
            // merge response bookings with bookings in vuex
            this.availableBookings = this.bookings.map((item, index) => ({ ...item, ...response.data.trips[index] }));
            this.isOhNoModalVisible = true;
          } else {
            this.$router.push('/booking-1');
          }
        } else {
          // eslint-disable-next-line no-unused-expressions,no-alert,no-lonely-if
          if (window.confirm('You must login before. Are you sure want to leave this page?')) {
            LocalStorageApi.setRedirectUri(this.$route.path);
            this.$mainOidc.signinRedirect();
          }
        }
      } catch (err) {
        // Todo: Oh no modal
        // this.isOhNoModalVisible = true;
        // this.$mainOidc.signinRedirect();
      }
    },
  },
  mounted() {
    console.log('book', this);
  },
  beforeMount() {
    if (this.userProfile) {
      this.$store.dispatch(`booking/${getAllBookings}`);
    }
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";
  .trexoz-card {
    &__finish {
      margin-top: 38px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  }
</style>
