<template>
  <div class="details">
    <date-and-routes
      :destination-address="destinationAddress"
      :readable-date="readableDate"
      :origin-address="originAddress"
    />

    <div class="details__row">
      <div class="details__row-icon">
        <v-icon class="details__row-icon">mdi-map-marker</v-icon>
      </div>
      <div>
        <span class="font-simple">Point to point</span>
        <span class="details__stops-count" v-if="otherWaypointsCount > 0">(+{{otherWaypointsCount}} stops)</span>
      </div>
    </div>

    <div class="details__other-row">
      <span class="font-bold">Passengers</span>
      <div>
        <div class="icon-block">
          <v-icon class="font-icon">mdi-account-multiple</v-icon>
          <span>{{tripDetails.passengers}}</span>
        </div>
      </div>
    </div>

    <div class="details__other-row">
      <span class="font-bold">Luggage</span>
      <seats-icon-list />
    </div>

    <div class="details__other-row">
      <span class="font-bold">Special seats</span>
      <seats-icon-list />
    </div>

    <div class="details__other-row"  style="line-height: 24px;">
      <span class="font-bold">Services</span>
      <div class="font-simple">
        Airport pick-up (inside), Lorem ipsum, Lorem ipsum, Lorem ipsum, Lorem ipsum
      </div>
    </div>

  </div>
</template>

<script>
import TripInfo from '@/utils/TripInfo';
import DateAndRoutes from '@/components/booking/general/DateAndRoutes.vue';
import SeatsIconList from '@/components/booking/general/iconsList/SeatsIconList.vue';

export default {
  name: 'TripDetailsBlock',
  components: {
    SeatsIconList,
    DateAndRoutes,
  },
  props: {
    tripDetails: Object,
  },
  computed: {
    readableDate() {
      const { date } = this.tripDetails.filters;
      const isSingleDate = date && (typeof date === 'string' || date instanceof Date);
      const puDateTime = isSingleDate
        ? new Date(date).getTime()
        : new Date(date.start).getTime();

      return TripInfo.getReadableTripDate(puDateTime || this.tripDetails.pudateTime);
    },
    originAddress() {
      return TripInfo.getOriginAddress(this.tripDetails.locations);
    },
    destinationAddress() {
      return TripInfo.getDestinationAddress(this.tripDetails.locations);
    },
    otherWaypointsCount() {
      return TripInfo.getOtherWaypointsCount(this.tripDetails.locations);
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";
@import "details-styles";

  .details {
    font-size: 14px;

    .font-icon {
      color: black;
      font-size: 18px;
    }

    &__other-row {
      display: grid;
      grid-template-columns: max-content 1fr;
      grid-gap: 10px;
      margin-top: 10px;
    }
  }
</style>
