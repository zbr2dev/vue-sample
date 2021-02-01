<template>
  <div class="car-info">
    <h1 class="car-info__header">
      <span>{{fullCarName}}</span>
      <add-to-favourite-button :show-text="false" v-if="isMobile"/>
    </h1>
    <div class="car-info__link">Maybe car link</div>

    <div class="d-flex align-center" style="margin-top: 9px">
      <ui-detailed-rating :value="trip.rating"/>
      <span class="car-info__answers">123 answers</span>
      <add-to-favourite-button style="margin-left: 16px;" v-if="!isMobile" />
    </div>

    <div class="car-info__description">
      {{ trip.description }}
    </div>
  </div>
</template>

<script>
import UiDetailedRating from '@/components/UI/UiDetailedRating.vue';
import AddToFavouriteButton from '@/components/UI/AddToFavouriteButton.vue';
import { getVehicleFullName } from '@/utils/helpers';

export default {
  name: 'TripDetailsHeader',
  components: { AddToFavouriteButton, UiDetailedRating },
  props: {
    trip: {
      type: Object,
    },
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.width < 1000;
    },
    fullCarName() {
      return getVehicleFullName(this.trip);
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";

.car-info {
  &__header {
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
    font-family: $Montserrat;
    font-size: 24px;
    font-weight: 800;
    text-transform: uppercase;
  }

  &__link {
    font-family: $OpenSans;
    font-size: 12px;
    color: $link-color;
  }

  &__answers {
    margin-left: 16px;
    font-family: $OpenSans;
    font-size: 14px;
    color: $link-color;
  }

  &__description {
    margin-top: 13px;
    font-family: $OpenSans;
    font-size: 14px;
    line-height: 24px;
    color: #333333;
  }
}

@media screen and (max-width: 1000px) {
  .car-info {
    &__header {
      font-size: 18px;
    }
  }
}
</style>
