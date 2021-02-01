<template>
  <div class="spinner-wrapper">
    <v-progress-circular indeterminate size="90" color="primary"></v-progress-circular>
  </div>
</template>

<script>
import TrexozApi from '@/api/common/TrexozApi';
import LocalStorage from '@/utils/LocalStorage';
import { createOrUpdateTrips, getAllBookings } from '@/store/modules/booking/constants';
import { getMyProfilePhoto } from '@/store/modules/profile/constants';
import { createNamespacedHelpers } from 'vuex';
import bookingPageMixin from '@/views/booking/bookingPageMixin';

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

const {
  mapActions: mapProfileActions,
} = createNamespacedHelpers('profile');

export default {
  name: 'Home',
  mixins: [bookingPageMixin],
  components: {},
  computed: {
    ...mapVehicleState(['vehicle']),
    ...mapSearchPanelState(['filters']),
    ...mapBookingState(['booking']),
    ...mapAuthState(['userProfile']),
  },
  methods: {
    ...mapBookingActions([createOrUpdateTrips]),
    ...mapProfileActions([getMyProfilePhoto]),
    callback() {
      this.$root.callbackLoading = this.loadingStatuses.LOADING;
      this.$mainOidc.signinCallback().then(async (res) => {
        this.$store.commit('auth/SET_USER_PROFILE', res.profile);

        const accessToken = res.access_token;
        LocalStorage.setAccessToken(accessToken);
        new TrexozApi().setAuthHeader(accessToken);

        await this.$store.dispatch(`booking/${getAllBookings}`);
        await this[createOrUpdateTrips]({ trips: this.bookings, userId: this.userProfile.UserId });
        await this[getMyProfilePhoto]();
        const redirectUri = LocalStorage.getRedirectUri();
        LocalStorage.setRedirectUri('');
        await this.$router.push(redirectUri || '/');
      });
    },
  },
  mounted() {
    this.callback();
  },
};
</script>

<style scoped>
.spinner-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
