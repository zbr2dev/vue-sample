<template>
  <div class="card" v-if="vehicle">
    <div class="card__return" >
      <left-arrow-icon @click.native="$router.push('/search-results')" class="pointer"/>
    </div>
    <trip-details-header :trip="vehicle"/>

    <simple-dots-carousel class="card__carousel">
      <div v-for="(slide, index) in carImages" :key="index" style="text-align: center;">
        <div class="card__carousel-slide">
          <img :src="slide.url" alt="Car img"/>
        </div>
      </div>
    </simple-dots-carousel>

    <agile-drivers-list />

    <book-now-card style="margin-top: 10px" @addToCart="handleAddToCart" @goToBooking="handleGoToBooking" />

    <v-divider style="margin: 17px 0" />

    <driver-detailed-card
      v-if="pageData.isVisibleDriverInfo"
      @close="CLOSE_DRIVER_INFO"
      :driver="pageData.driverForShowingInfo"
    />
    <payment-cancellation-more v-else />

    <v-divider style="margin: 17px 0" />

    <vehicle-info />
  </div>
</template>

<script>
import TripDetailsHeader from '@/components/tripDetails/general/TripDetailsHeader.vue';
import SimpleDotsCarousel from '@/components/UI/carousels/SimpleDotsCarousel.vue';
import VehicleInfo from '@/components/tripDetails/general/VehicleInfo.vue';
import BookNowCard from '@/components/tripDetails/general/BookNowCard.vue';
import PaymentCancellationMore from '@/components/tripDetails/general/PaymentCancellationMore.vue';
import DriverDetailedCard from '@/components/tripDetails/general/drivers/DriverDetailedCard.vue';
import tripDetailsMixin from '@/components/tripDetails/tripDetailsMixin';
import LeftArrowIcon from '@/components/UI/icons/LeftArrowIcon.vue';
import AgileDriversList from '@/components/tripDetails/general/drivers/AgileDriversList.vue';

export default {
  name: 'TripDetailsMobile',
  mixins: [tripDetailsMixin],
  components: {
    AgileDriversList,
    LeftArrowIcon,
    DriverDetailedCard,
    PaymentCancellationMore,
    BookNowCard,
    VehicleInfo,
    SimpleDotsCarousel,
    TripDetailsHeader,
  },
  props: {
    slides: {
      type: Array,
    },
  },
};
</script>

<style scoped lang="scss">
  .card {
    padding: 16px;

    &__return {
      padding: 18px 0;
    }

    &__carousel-slide {
      height: 255px;

      img {
        height: 98%;
        max-width: 100%;
        object-fit: contain;
      }
    }
  }
</style>
