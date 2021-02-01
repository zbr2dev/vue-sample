<template>
  <div class="car">
    <div>
      <img
        :src="imageUrl"
        class="car__image"
        @click="$emit('imgClick')"
      />
    </div>
    <div style="margin-left: 15px;">
      <div class="car__name">{{trip.modelName}}</div>

      <ui-detailed-rating :value="trip.rating" />
      <passengers-and-luggage :persons="trip.seat" :luggage="trip.cargo" with-details/>

      <div class="car__amount">{{localAmount}}</div>

    </div>
  </div>
</template>

<script>
import { formatNumberToAmount } from '@/utils/helpers';
import PassengersAndLuggage from '@/components/PassengersAndLuggage.vue';
import UiDetailedRating from '@/components/UI/UiDetailedRating.vue';

export default {
  name: 'CarCard',
  components: { UiDetailedRating, PassengersAndLuggage },
  props: {
    trip: {
      type: Object,
    },
  },
  computed: {
    localAmount() {
      return formatNumberToAmount(this.trip.price);
    },
    imageUrl() {
      // return 'https://auto-prigon.com/upload/iblock/b37/b374ce9b90ab6eb699e22361e1b8e51b.jpg';
      return `${this.trip.image}` || 'https://www.carhuddle.com/images/default/car-default?.jpg';
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/variables.scss";

  .car {
    display: flex;
    align-items: center;

    &__image {
      width: 100%;
      min-width: 120px;
      max-width: 280px;
      height: 150px;
      object-fit: cover;
      cursor: pointer;
    }

    &__reviews-count {
      margin-left: 6px;
      font-size: 14px;
      color: #403F46;
    }

    &__name {
      max-width: 110px;
      font-weight: 600;
      font-size: 16px;
    }

    &__amount {
      font-family: $Montserrat;
      margin-top: 15px;
      font-weight: 600;
      font-size: 18px;
      color: #141414;
    }
  }

  @media screen and (min-width: 1600px) {
    .car {
      &__image {
        max-width: 400px;
        height: 200px;
      }
    }
  }
</style>
