<template>
  <div class="all-results" ref="rootAllResults">
    <section class="all-results__sponsored sponsored">
      <div class="sponsored__title-wrapper d-flex align-center justify-space-between">
        <div class="sponsored__title">Results: {{trips.totalCount}}</div>
        <div class="sort__wrapper">
          <filter-trips-select style="max-width: 230px;" :value="order" @input="$emit('update:order', $event)"/>
        </div>

        <div class="all-results__header-icons">
          <v-icon color="black">mdi-filter</v-icon>
          <v-icon color="black" style="margin-left: 20px">mdi-sort-variant</v-icon>
        </div>
      </div>

      <v-carousel hide-delimiters height="auto">
        <v-carousel-item
          v-for="(carArr, index) in sponsoredCars"
          :key="index"
        >
          <div class="all-results__sponsored-list">
            <sponsored-car-item
              v-for="car in carArr" :key="car.id"
              :persons="car.persons"
              :amount="car.amount"
              :luggage="car.luggage"
              :car-name="car.carName"
              class="all-results__sponsored-car-item"
            >
              <img src="~@/assets/img/cars/chevrolet-traverse.png" style="width: 100%"/>
            </sponsored-car-item>
          </div>
        </v-carousel-item>
      </v-carousel>

    </section>

    <section style="margin-top: 35px">
      <div>
        <div
          v-if="tripsLoading === LOADING_STATUSES.LOADING"
          class="all-results__cars-list">
          <car-card-skeleton />
          <car-card-skeleton />
        </div>

        <div
          v-else
          v-for="(row, index) in tripsItems"
          :key="index"
          class="all-results__cars-list"
        >
          <car-card
            v-for="trip in row"
            class="car-card"
            :key="trip.id"
            :trip="trip"
            @imgClick="goToCarPage(trip)"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { LOADING_STATUSES } from '@/utils/constants';
import SponsoredCarItem from '@/components/searchingResults/SponsoredCarItem.vue';
import CarCard from '@/components/searchingResults/CarCard.vue';
import FilterTripsSelect from '@/components/selects/FilterTripsSelect.vue';
import CarCardSkeleton from '@/components/searchingResults/CarCardSkeleton.vue';
import { getArrayWithSubArrays } from '@/utils/helpers';

// eslint-disable-next-line no-unused-vars
const sponsored = [
  {
    id: 1,
    carName: 'Chevrolet Traverse',
    persons: 2,
    luggage: 3,
    amount: 2300,
  },
  {
    id: 2,
    carName: 'Chevrolet Traverse',
    persons: 2,
    luggage: 3,
    amount: 2300,
  },
  {
    id: 3,
    carName: 'Chevrolet Traverse',
    persons: 2,
    luggage: 3,
    amount: 2300,
  },
  {
    id: 4,
    carName: 'Chevrolet Traverse',
    persons: 2,
    luggage: 3,
    amount: 2300,
  },
  {
    id: 85,
    carName: 'Chevrolet Traverse',
    persons: 2,
    luggage: 3,
    amount: 2300,
  },
  {
    id: 6,
    carName: 'Chevrolet Traverse',
    persons: 2,
    luggage: 3,
    amount: 2300,
  },
  {
    id: 7,
    carName: 'Chevrolet Traverse',
    persons: 2,
    luggage: 3,
    amount: 2300,
  },
  {
    id: 8,
    carName: 'Chevrolet Traverse',
    persons: 2,
    luggage: 3,
    amount: 2300,
  },
];

export default {
  name: 'AllResults',
  components: {
    CarCardSkeleton, FilterTripsSelect, CarCard, SponsoredCarItem,
  },
  props: {
    trips: {
      type: Object,
      validate(value) {
        return Array.isArray(value.items) && Number.isFinite(value.totalCount);
      },
    },
    tripsLoading: {
      type: String,
    },
    order: {
      type: String,
      required: true,
    },
  },
  watch: {
    // eslint-disable-next-line consistent-return,func-names
    '$vuetify.breakpoint.width': function () {
      this.setColumnsCount();
      this.setSponsoredCardList();
    },
    trips() {
      this.setColumnsCount();
    },
  },

  mounted() {
    this.setColumnsCount();
    this.setSponsoredCardList();
  },
  methods: {
    setSponsoredCardList() {
      const rootDomWidth = this.$vuetify.breakpoint.width;
      if (rootDomWidth >= 1200) {
        this.sponsoredCars = getArrayWithSubArrays(sponsored, 4);
      } else if (rootDomWidth >= 768) {
        this.sponsoredCars = getArrayWithSubArrays(sponsored, 3);
      } else {
        this.sponsoredCars = getArrayWithSubArrays(sponsored, 2);
      }
    },

    goToCarPage(car) {
      this.$router.push(`/trip/${car.id}`);
    },
    setColumnsCount() {
      // We are getting some mistakes without setTimeout
      setTimeout(() => {
        const rootDomWidth = this.$vuetify.breakpoint.width;
        if (rootDomWidth >= 1200) {
          this.tripsItems = getArrayWithSubArrays(this.trips.items, 2);
        } else this.tripsItems = getArrayWithSubArrays(this.trips.items, 1);
      }, 0);
    },
  },
  data() {
    return {
      sponsoredCarsCount: 3,
      tripsItems: [],
      carouselHeight: 0,
      LOADING_STATUSES,
      sponsoredCars: [],
    };
  },
};
</script>

<style scoped lang="scss">
  @import "~@/assets/styles/variables.scss";
  $car-list-margin-r: 20px;
  $sponsored-gap: 15px;

  .all-results {
    padding: 28px 2vw 28px 0;
    $horizontal-list-padding: 20px;
    &__sponsored-list {
      margin-top: 10px;
      display: grid;
      // Make width property of two sponsored cars the same like one .car-card
      // In this case we have to remember about margins in .car-card list ang space between sponsored items
      // We have some small mistakes without -5px. Leave it, trust me
      grid-template-columns: repeat(auto-fit, calc(25% - (#{$sponsored-gap} / 4) - (#{$car-list-margin-r} / 4) - 5px));
      grid-auto-flow: column;
      grid-gap: $sponsored-gap;
      width: 100%;
      padding: $horizontal-list-padding;
    }

    &__sponsored-car-item {
      max-width: 240px;
    }

    &__cars-list {
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: repeat(auto-fit, minmax(min-content, 1fr));
      padding: 20px $horizontal-list-padding;
      border-top: 1px solid #D4D4D4;

      .car-card {
        &:first-child {
          margin-right: $car-list-margin-r;
        }
      }
    }

    &__header-icons {
      display: none;
    }
  }

  .sponsored {
    &__title-wrapper {
      display: flex;
    }

    &__title {
      font-family: $Montserrat;
      font-size: 16px;
      color: black;
      font-weight: 600;
    }
  }

  @media screen and (min-width: 768px) and (max-width: 1200px) {
    .all-results {
      &__sponsored-list {
        grid-template-columns: repeat(auto-fit, calc(33% - (#{$sponsored-gap} / 4) - (#{$car-list-margin-r} / 4)));
      }
    }
  }

  @media screen and (max-width: 768px) {
    .sort__wrapper {
      display: none;
    }

    .all-results {
      padding: 20px 16px;

      $cars-lists-horizontal-padding: 10px;
      &__sponsored-list {
        padding-left:  $cars-lists-horizontal-padding;
        padding-right: $cars-lists-horizontal-padding;
        grid-template-columns: repeat(auto-fit, calc(50% - (#{$sponsored-gap} / 2)));
        justify-content: space-between;
      }

      &__header-icons {
        display: block;
      }

      &__cars-list {
        padding-left: $cars-lists-horizontal-padding;
        padding-right: $cars-lists-horizontal-padding;
      }
    }
  }

</style>
