<template>
  <div>
    <div
      class="d-flex justify-center"
      v-if="isPageLoaderVisible"
    >
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>

    <div class="details" v-else>
      <section class="details__header">
        <div class="details__header-row">
          <img
            class="pointer"
            src="~@/assets/img/arrow-left.svg"
            alt="Arrow left"
            @click="handleArrowLeftClick"
          />

          <div class="global__icon-block">
            <v-icon color="black" size="18px">mdi-calendar</v-icon>
            <span class="details__header-date-time">{{ dateAndTime }}</span>
          </div>
        </div>

        <div
          class="details__header-row"
          style="justify-self: end"
        >
          <img
            src="~@/assets/img/logo-shield.png"
            alt="Company logo"
            width="114px"
            height="16px"
            style="visibility: hidden"
          />
          <div class="details__header-pending">
<!--            <span :class="`details__status&#45;&#45;${currentTrip.tripStatus.toLowerCase()}`">{{ currentTrip.tripStatus }}</span>-->
            <img src="~@/assets/img/grey-clock.png" alt="Grey clock"/>
          </div>
        </div>
      </section>

      <v-divider class="details__main-divider"/>

      <section class="details__body">
        <div class="details__body-short-info">
          <div>
            <div class="text-row">
              <span class="text-row__label">Trip: </span>
              <span class="text-row__value">{{ currentTrip.id }}</span>
            </div>

            <div class="global__icon-block location">
              <v-icon color="black" size="18px">mdi-map-marker</v-icon>
              <div>Point to point</div>
            </div>

            <div
              v-for="(location, index) in currentTrip.locations"
              :key="index"
              class="global__icon-block location"
            >
              <template>
                <arrow-route-from v-if="index === 0"/>
                <arrow-route-to v-else-if="index === currentTrip.locations.length - 1" />
                <arrow-route-between v-else />
              </template>
              <div>
                {{ location.address }}
              </div>
            </div>

          </div>
          <div>
            <div class="text-row">
              <span class="text-row__label">Service: </span>
              <span class="text-row__value">Inside pick-up</span>
            </div>

            <div class="text-row">
              <span class="text-row__label">Luggage: </span>
              <luggage-icon-list />
            </div>

            <div class="text-row">
              <span class="text-row__label">Special seats: </span>
              <seats-icon-list />
            </div>

            <div class="text-row">
              <span class="text-row__label">Temperature: </span>
              <span class="text-row__value">Warm (75-77 °F)</span>
            </div>

            <div class="text-row">
              <span class="text-row__label">Conversation: </span>
              <span class="text-row__value">I like talk</span>
            </div>

            <div class="text-row">
              <span class="text-row__label">Other: </span>
              <span class="text-row__value">Move passenger seat forward</span>
            </div>
          </div>
          <trip-total-price :price="currentTrip.price" />
        </div>
        <div class="text-row" style="margin-top: 10px">
          <span class="text-row__label">Business: </span>
          <span class="text-row__value">Loooooong business company name</span>
        </div>
        <div class="text-row" style="margin-top: 10px">
          <span class="text-row__label">Comment: </span>
          <span class="text-row__value">{{ currentTrip.notes || '...' }}</span>
        </div>
      </section>

      <section>
        <car-card :vehicle="currentTrip.vehicle" />
        <driver-card style="margin-top: -1px" />
        <dispatcher-card style="margin-top: -1px" />
        <passenger-card style="margin-top: -1px" :user="{passengers: [{}, {}, {}]}"/>
      </section>

      <section class="details__end-section">
        <payment-cancellation-more />
        <div>
          <div class="details__change-request">Change request</div>
          <div v-if="currentTrip.tripStatus !== 'Canceled'" class="details__cancel-trip" @click="tryCancelTrip">Cancel trip</div>
        </div>

      </section>

      <confirm-cancel-trip-modal
        v-model="isCancelTripModalVisible"
        @cancel="cancelTrip"
        :loading="cancelTripsStatus === loadingStatuses.LOADING"
      />

      <cancel-trip-success-modal
        v-model="isCancelTripSuccessModalVisible"
      />
    </div>
  </div>

</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import ArrowRouteFrom from '@/components/UI/icons/routing/ArrowRouteFrom.vue';
import ArrowRouteBetween from '@/components/UI/icons/routing/ArrowRouteBetween.vue';
import ArrowRouteTo from '@/components/UI/icons/routing/ArrowRouteTo.vue';
import SeatsIconList from '@/components/booking/general/iconsList/SeatsIconList.vue';
import LuggageIconList from '@/components/booking/general/iconsList/LuggageIconList.vue';
import TripTotalPrice from '@/components/booking/general/TripTotalPrice.vue';
import PaymentCancellationMore from '@/components/tripDetails/general/PaymentCancellationMore.vue';
import PassengerCard from '@/components/myTripsDetails/PassengerCard.vue';
import { getReadableTime } from '@/components/myTripsDetails/helpers';
import CarCard from '@/components/myTripsDetails/CarCard.vue';
import DriverCard from '@/components/myTripsDetails/DriverCard.vue';
import DispatcherCard from '@/components/myTripsDetails/DispatcherCard.vue';
import { LOADING_STATUSES } from '@/utils/constants';
import tripApi from '@/api/trexoz/TripApi';
import BookingModification from '@/store/modules/booking/BookingModification';
import ConfirmCancelTripModal from '@/components/myTripsDetails/ConfirmCancelTripModal.vue';
import CancelTripSuccessModal from '@/components/myTripsDetails/CancelTripSuccessModal.vue';
import { addVehicleToTrips } from '@/store/modules/booking';

const {
  mapState: mapBookingState,
} = createNamespacedHelpers('myTrips');

export default {
  name: 'MyDetailedTrip',
  components: {
    CancelTripSuccessModal,
    ConfirmCancelTripModal,
    DispatcherCard,
    DriverCard,
    CarCard,
    PassengerCard,
    PaymentCancellationMore,
    TripTotalPrice,
    LuggageIconList,
    SeatsIconList,
    ArrowRouteTo,
    ArrowRouteBetween,
    ArrowRouteFrom,
  },
  data() {
    return {
      currentTrip: null,
      currentTripLoadingStatus: LOADING_STATUSES.IDLE,
      tryCancelTripStatus: LOADING_STATUSES.IDLE,
      cancelTripsStatus: LOADING_STATUSES.IDLE,
      isCancelTripModalVisible: false,
      isCancelTripSuccessModalVisible: false,
    };
  },
  computed: {
    ...mapBookingState(['myTrips']),
    dateAndTime() {
      const date = this.currentTrip && this.currentTrip.filters.date;
      return getReadableTime(date);
    },
    isPageLoaderVisible() {
      return this.currentTripLoadingStatus === this.loadingStatuses.LOADING;
    },
  },
  methods: {
    handleArrowLeftClick() {
      this.$router.push('/my-trips');
    },

    async tryCancelTrip() {
      this.tryCancelTripStatus = LOADING_STATUSES.LOADING;
      await tripApi.tryCancelTrip(this.currentTrip.id);
      this.isCancelTripModalVisible = true;
    },
    async cancelTrip() {
      try {
        this.cancelTripsStatus = this.loadingStatuses.LOADING;
        await tripApi.cancelTrip(this.currentTrip.id);
        this.cancelTripsStatus = this.loadingStatuses.SUCCESS;
        this.isCancelTripModalVisible = false;
        this.isCancelTripSuccessModalVisible = true;
        const response = await tripApi.getSingleTrip(this.$route.params.id);
        const vehiclesWithTrip = await addVehicleToTrips([response.data]);
        // eslint-disable-next-line prefer-destructuring
        this.currentTrip = BookingModification.modifyBookingsFromBackend(vehiclesWithTrip)[0];
        this.currentTripLoadingStatus = this.loadingStatuses.SUCCESS;
      } catch (err) {
        this.cancelTripsStatus = this.loadingStatuses.FAILURE;
        console.log('my detailed trips error', err);
      }
    },
  },
  async created() {
    const currentTripId = this.$route.params.id;
    const foundTrip = this.myTrips.items.find((trip) => trip.id === currentTripId);
    if (foundTrip) {
      this.currentTrip = foundTrip;
      console.log(this.currentTrip);
      this.currentTripLoadingStatus = LOADING_STATUSES.SUCCESS;
    } else {
      try {
        this.currentTripLoadingStatus = this.loadingStatuses.LOADING;
        const response = await tripApi.getSingleTrip(currentTripId);
        const vehiclesWithTrip = await addVehicleToTrips([response.data]);
        // eslint-disable-next-line prefer-destructuring
        this.currentTrip = BookingModification.modifyBookingsFromBackend(vehiclesWithTrip)[0];
        this.currentTripLoadingStatus = this.loadingStatuses.SUCCESS;
        console.log(this.currentTrip);
      } catch (err) {
        console.log('get my trip err', err);
        this.currentTripLoadingStatus = this.loadingStatuses.FAILURE;
      }
    }
  },
};
</script>

<style scoped lang="scss">
@import "../../components/myTrips/styles";
@import "~@/assets/styles/variables.scss";

  .details {
    &__header {
      margin-top: 10px;

      display: grid;
      grid-template-columns: 1fr 1fr;
      justify-content: space-between;
    }

    &__header-row {
      display: grid;
      grid-gap: 25px;
    }

    &__header-date-time {
      font-weight: 600;
      font-size: 14px;
    }

    &__header-pending {
      justify-self: end; //because of grid

      display: flex;
      align-items: center;
      color: #7E7E7E;
      font-weight: 600;
      & > *:first-child {
        margin-right: 10px;
      }
    }

    &__status {
      &--confirmed {
        color: #0DA503;
      }
      &--canceled {
        color: #EB5757;
      }
    }

    &__main-divider {
      margin: 15px 0 12px;
    }

    &__body-short-info {
      display: grid;
      grid-template-columns: 1fr 1fr 70px;
      grid-gap: 20px;
    }

    &__end-section {
      margin-top: 10px;
      display: grid;
      grid-template-columns: 1fr 100px;
    }

    &__change-request, &__cancel-trip {
      font-family: $Montserrat;
      font-size: 12px;
      font-weight: 600;
      line-height: 20px;
      cursor: pointer;
      text-align: end;
    }

    &__cancel-trip {
      margin-top: 12px;
      color: #EB5757;
    }
  }

.location {
  font-size: 14px;
  margin-top: 10px;
}

  .global {
    &__icon-block {
      display: grid;
      align-items: center;
      grid-gap: 3px;
      grid-template-columns: 20px 1fr;

      & > *:first-child {
        justify-self: center;
      }
    }
  }
</style>
