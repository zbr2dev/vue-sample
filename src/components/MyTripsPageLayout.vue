<template>
  <div class="page">
    <div class="page__map-wrapper">
      <google-map-direction class="page__map"  />
    </div>

    <div class="page__content-wrapper">
      <router-view />
    </div>

    <div class="cards">
      <div class="cards__item">
        Notes
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import GoogleMapDirection from '@/components/UI/googleMap/GoogleMapDirection.vue';

const {
  mapState: mapBookingState,
} = createNamespacedHelpers('booking');

export default {
  name: 'MyTripsPageLayout',
  components: {
    GoogleMapDirection,
  },
  computed: {
    ...mapBookingState(['bookings']),
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";
.page {
  display: grid;
  grid-template-columns: 24.5% 55% 16.5%;
  grid-gap: 2%;
  z-index: 1;

  &__content-wrapper {
    padding: 3% 0;
  }

  &__map-wrapper {
    position: relative;
  }
  &__map {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}

.cards {
  padding: 20px 0;
  margin-right: 2.084vw;;
  &__item {
    padding: 24px;
    background: #F2F2F2;
    font-weight: 600;
    border-radius: 8px;
    height: 200px;
    width: 100%;
  }
}

@media screen and (min-width: 768px) and (max-width: 1200px) {
  .page {
    grid-template-columns: 255px 1fr 200px;
  }
}
</style>
