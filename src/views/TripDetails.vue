<template>
  <div style="height: 100%">
    <div
      v-if="vehicleLoading === loadingStatuses.LOADING"
      class="loader-container"
    >
      <v-progress-circular indeterminate />
    </div>

    <template v-else>
      <TripDetailsDesktop v-if="$vuetify.breakpoint.width >= 1000" />
      <TripDetailsMobile v-else />
    </template>

    <booking-notify-modal v-model="pageData.isBookingNotifyModalVisible" @gotIt="handleNotifyGotIt"/>
  </div>
</template>

<script>
import TripDetailsDesktop from '@/components/tripDetails/TripDetailsDesktop.vue';
import TripDetailsMobile from '@/components/tripDetails/TripDetailsMobile.vue';
import { createNamespacedHelpers } from 'vuex';
import { fetchSingleVehicle } from '@/store/modules/vehicle/constants';
import tripDetailsMixin from '@/components/tripDetails/tripDetailsMixin';
import BookingNotifyModal from '@/components/tripDetails/general/BookingNotifyModal.vue';

const {
  mapActions: mapVehicleActions,
  mapState: mapVehicleState,
} = createNamespacedHelpers('vehicle');

export default {
  name: 'TripDetails',
  mixins: [tripDetailsMixin],
  components: { BookingNotifyModal, TripDetailsMobile, TripDetailsDesktop },
  computed: {
    ...mapVehicleState(['vehicleLoading']),
  },
  methods: {
    ...mapVehicleActions([fetchSingleVehicle]),
  },
  async created() {
    const vehicleId = this.$route.params.id;
    await this[fetchSingleVehicle](vehicleId);
  },
  watch: {
    vehicle(newData) {
      if (newData) {
        this.$_setCurrentPreparedTrip();
      }
    },
  },
};
</script>

<style scoped lang="scss">
  .loader-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: auto;
    height: 100%;
  }
</style>
