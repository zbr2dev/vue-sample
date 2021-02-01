<template>
  <div class="car-item">
    <car-and-driver
      :driver="booking.driver"
      :vehicle="booking.vehicle"
      :show-remove-btn="false"
    />

    <div style="margin-left: 28px">
      <div class="details__row availability availability--true" v-if="booking.isAvailable">
        <v-icon class="details__row-icon">mdi-checkbox-marked-circle-outline</v-icon>
        <span class="availability__text">Available</span>
      </div>

      <div v-else class="details__row availability availability--false">
        <v-icon class="details__row-icon">mdi-close</v-icon>
        <span class="availability__text">Unavailable</span>
      </div>

      <date-and-routes
        :origin-address="originAddress"
        :destination-address="destinationAddress"
        :readable-date="readableDate"
      />
    </div>
  </div>
</template>

<script>
import CarAndDriver from '@/components/booking/general/CarAndDriver.vue';
import DateAndRoutes from '@/components/booking/general/DateAndRoutes.vue';
import TripInfo from '@/utils/TripInfo';

export default {
  name: 'TripsListItem',
  components: { DateAndRoutes, CarAndDriver },
  props: {
    booking: Object,
  },
  computed: {
    readableDate() {
      console.log(this.booking);
      return TripInfo.getReadableTripDate(this.booking.pudateTime);
    },
    originAddress() {
      return TripInfo.getOriginAddress(this.booking.locations);
    },
    destinationAddress() {
      console.log(this.booking);
      return TripInfo.getDestinationAddress(this.booking.locations);
    },
    otherWaypointsCount() {
      return TripInfo.getOtherWaypointsCount(this.booking.locations);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../general/details-styles.scss";
  .car-item {
    display: flex;
  }

  .availability--true {
    color: #0DA503;

    & > :first-child {
      color: #0DA503;
    }
  }

  .availability--false, .details__row-icon {
    color: #EB5757;
  }

  .availability {
    margin-bottom: 12px;
    &__text {
      font-weight: 600;
      font-size: 12px;
    }
  }
</style>
