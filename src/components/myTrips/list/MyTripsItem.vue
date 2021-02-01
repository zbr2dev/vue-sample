<template>
  <div class="item">
    <car-and-driver :vehicle="trip.vehicle" :show-remove-btn="false"/>
    <div class="item__info">
      <div class="item__date-section">
        <div class="item__date">
          <v-icon color="black" style="font-size: 18px">mdi-calendar</v-icon>
          <span>{{ readableDate }}</span>
        </div>

        <div class="item__eta">ETA: 10:05</div>

        <div class="chauffering-section" style="margin-left: auto">
          <span style="font-size: 12px" :class="trip.tripStatus === 'Canceled' ? 'canceled' : ''">{{ trip.tripStatus }}</span>
          <check-half-dashed-outlined v-if="trip.tripStatus !== 'Canceled' && trip.tripStatus !== 'Pending'"/>
        </div>
      </div>

      <div class="item__other">
        <div>
          <div class="text-row" style="margin-bottom: 8px">
            <span class="text-row__label">Trip:</span>
            <span class="text-row__value">{{ randomNumber }}</span>
          </div>

          <div class="location">
            <div class="location__row-icon">
              <arrow-route-from />
            </div>
            <span class="location__address">{{ originAddress }}</span>
          </div>

          <div class="location" style="margin-bottom: 8px">
            <div class="location__row-icon">
              <arrow-route-to />
            </div>
            <span class="location__address">{{ destinationAddress }}</span>
          </div>

          <div class="d-flex point">
            <v-icon class="point__icon">mdi-map-marker</v-icon>

            <div style="margin-left: 8px">
              <span style="font-size: 13px">Point to point</span>
              <span class="point__stops-count" v-if="otherWaypointsCount">(+{{otherWaypointsCount}} stops)</span>
            </div>
          </div>

          <div class="text-row" style="margin-top: 8px">
            <span class="text-row__label">Service:</span>
            <span class="text-row__value">Inside pick-up</span>
          </div>
        </div>

        <div style="margin-left: 20px">
          <div class="text-row">
            <span class="text-row__label">Passenger:</span>
            <span class="text-row__value">Inside pick-up</span>
          </div>

          <div class="text-row">
            <span class="text-row__label">Observers:</span>
            <span class="text-row__value">Jacob M</span>
          </div>

          <div class="text-row">
            <span class="text-row__label">Special seats:</span>
            <span class="text-row__value"><seats-icon-list /></span>
          </div>

          <div class="text-row">
            <span class="text-row__label">Comment:</span>
            <span class="text-row__value">Jacob M...</span>
          </div>

        </div>

        <div class="d-flex flex-column">
          <trip-total-price :price="trip.price" :is-subtitle-visible="false" />
          <ui-button type="dark-border" size="small" style="margin-top: auto" @click="$emit('tripDetailsClick', trip)">Details</ui-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CarAndDriver from '@/components/booking/general/CarAndDriver.vue';
import TripInfo from '@/utils/TripInfo';
import ArrowRouteFrom from '@/components/UI/icons/routing/ArrowRouteFrom.vue';
import ArrowRouteTo from '@/components/UI/icons/routing/ArrowRouteTo.vue';
import SeatsIconList from '@/components/booking/general/iconsList/SeatsIconList.vue';
import TripTotalPrice from '@/components/booking/general/TripTotalPrice.vue';
import UiButton from '@/components/UI/UiButton.vue';
import CheckHalfDashedOutlined from '@/components/UI/icons/CheckHalfDashedOutlined.vue';
import { getReadableTime } from '@/components/myTripsDetails/helpers';

export default {
  name: 'MyTripsItem',
  components: {
    CheckHalfDashedOutlined,
    UiButton,
    TripTotalPrice,
    SeatsIconList,
    ArrowRouteTo,
    ArrowRouteFrom,
    CarAndDriver,
  },
  props: {
    trip: {
      type: Object,
    },
  },
  computed: {
    readableDate() {
      return getReadableTime(this.trip.filters.date);
    },
    originAddress() {
      return TripInfo.getOriginAddress(this.trip.locations);
    },
    destinationAddress() {
      return TripInfo.getDestinationAddress(this.trip.locations);
    },
    otherWaypointsCount() {
      return TripInfo.getOtherWaypointsCount(this.trip.filters);
    },
    randomNumber() {
      return Math.floor(1000000 + Math.random() * 9000000);
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";
@import "../styles";

  .chauffering-section {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #0DA503;
    .canceled {
      color: red;
    }
    & > *:first-child {
      font-size: 12px;
      margin-right: 10px;
    }
  }

  .point {
    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      color: black;
      font-size: 18px;
    }

    &__stops-count {
      font-size: 12px;
      margin-left: 10px;
      color: $grey;
    }
  }

  .item {
    display: flex;

    &__date-section {
      display: flex;
      align-items: center;
      font-family: $OpenSans;
    }

    &__date > *:first-child {
      margin-right: 10px;
    }

    &__info {
      margin-left: 21px;
      flex-basis: 100%;
    }

    &__eta {
      margin-left: 12px;
      font-weight: 700;
      color: #0DA503;
      font-size: 14px;
    }

    &__date {
      display: flex;
      align-items: center;
      font-weight: 700;
      color: #141414;
      font-size: 14px;
    }

    &__other {
      margin-top: 16px;
      display: flex;
      justify-content: space-between;
    }
  }

  .location {
    display: grid;
    grid-template-columns: 15px 1fr;
    grid-gap: 10px;
    min-height: 18px;
    font-family: $OpenSans;

    &__row-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      color: black;
    }

    &__address {
      font-size: 14px;
      line-height: 18px;
      color: #141414;
      margin-bottom: 4px;
    }
  }
</style>
