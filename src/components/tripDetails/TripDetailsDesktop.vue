<template>
  <div class="car-page">
    <div class="car-page__header" v-if="vehicle">
      <section>
        <two-related-image-carousel :slides="carImages" :main-max-height="260" />
        <v-divider style="margin: 17px 0" />
        <agile-drivers-list type="carousel" />
      </section>

      <section>
        <trip-details-header :trip="vehicle"/>
        <vehicle-info style="margin-bottom: 20px"/>

        <template>
          <driver-detailed-card
            v-if="pageData.isVisibleDriverInfo"
            @close="CLOSE_DRIVER_INFO"
            :driver="pageData.driverForShowingInfo"
          />
          <payment-cancellation-more v-else/>
        </template>
      </section>

      <section>
        <book-now-card @addToCart="handleAddToCart" @goToBooking="handleGoToBooking" />
      </section>
    </div>
  </div>
</template>

<script>
import TwoRelatedImageCarousel from '@/components/tripDetails/desktop/TwoRelatedImageCarousel.vue';

// import { createNamespacedHelpers } from 'vuex';
import DriverDetailedCard from '@/components/tripDetails/general/drivers/DriverDetailedCard.vue';
import VehicleInfo from '@/components/tripDetails/general/VehicleInfo.vue';
import PaymentCancellationMore from '@/components/tripDetails/general/PaymentCancellationMore.vue';
import TripDetailsHeader from '@/components/tripDetails/general/TripDetailsHeader.vue';
import BookNowCard from '@/components/tripDetails/general/BookNowCard.vue';
import tripDetailsMixin from '@/components/tripDetails/tripDetailsMixin';
import AgileDriversList from '@/components/tripDetails/general/drivers/AgileDriversList.vue';

export default {
  name: 'TripDetailsDesktop',
  mixins: [tripDetailsMixin],
  components: {
    AgileDriversList,
    BookNowCard,
    TripDetailsHeader,
    PaymentCancellationMore,
    VehicleInfo,
    DriverDetailedCard,
    TwoRelatedImageCarousel,
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";

.car-page {
  &__header {
    display: grid;
    grid-template-columns: minmax(300px,558px) minmax(383px, 1fr) 206px;
    grid-gap: 24px;
    padding: 24px 30px;
  }
}

</style>
