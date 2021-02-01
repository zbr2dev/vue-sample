<template>
  <div class="block trips">
    <div class="block__type-panel">
      <div class="block__type-list">
        <ui-button size="small" type="grey">All trips (0)</ui-button>
        <ui-button size="small" type="dark">Booked ({{ myTrips.items.length }})</ui-button>
        <ui-button size="small" type="grey">Observed (0)</ui-button>
        <ui-button size="small" type="grey">Travelled (0)</ui-button>
      </div>
    </div>

    <div class="block__filters-panel">
      <datepicker-input readonly v-model="filterDates"/>
      <trips-status-select
        :value="filters.statuses"
        @input="(v) => changeFilter('statuses',  v)"
      />
      <trip-groups-select
        :value="filters.socialityTypes"
        @input="(v) => changeFilter('socialityTypes',  v)"
      />
      <trips-types-select
        :value="filters.vahicleTypes"
        @input="(v) => changeFilter('vahicleTypes',  v)"
      />
      <my-trips-order-select
        :value="filters.order"
        @input="(v) => changeFilter('order',  v)"
      />
    </div>

    <div class="trips__list-wrapper">
      <div
        v-if="myTrips.loading === loadingStatuses.LOADING"
        class="trips__skeletons-wrapper"
      >
        <car-card-skeleton />
        <car-card-skeleton />
      </div>

      <my-trips-list
        v-else-if="myTrips.items.length"
        style="min-height: 70vh;"
        :trips="myTrips.items"
        @tripDetailsClick="tripDetailsClick"
      />

      <div v-else class="trips__no-data d-flex justify-center" style="min-height: 70vh;">No results</div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import UiButton from '@/components/UI/UiButton.vue';
import MyTripsList from '@/components/myTrips/list/MyTripsList.vue';
import TripsStatusSelect from '@/components/selects/TripsStatusSelect/TripsStatusSelect.vue';
import TripGroupsSelect from '@/components/selects/TripGroupsSelect/TripGroupsSelect.vue';
import TripsTypesSelect from '@/components/selects/TripsTypesSelect/TripsTypesSelect.vue';
import DatepickerInput from '@/components/UI/inputs/DatepickerInput.vue';
import MyTripsOrderSelect from '@/components/selects/MyTripsOrderSelect.vue';
import CarCardSkeleton from '@/components/searchingResults/CarCardSkeleton.vue';
import { getMyTrips, SET_MY_TRIPS_FILTERS } from '@/store/modules/myTrips/constants';

const {
  mapState: mapBookingState,
  mapGetters: mapBookingGetters,
  mapMutations: mapBookingMutations,
  mapActions: mapBookingsActions,
} = createNamespacedHelpers('myTrips');

function deleteEmptyFieldsInObj(obj) {
  const newObj = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== undefined) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

const dataToArray = (data) => {
  if (Array.isArray(data)) {
    return data;
  } if (typeof data === 'string') {
    return [data];
  } return data;
};

const dataToString = (data) => {
  if (typeof data === 'string' && data.length) {
    return data;
  } return null;
};

const getDateForUrl = (date) => new Date(date).toISOString().replace(/T.*/g, '');

export default {
  name: 'MyTrips',
  components: {
    CarCardSkeleton,
    MyTripsOrderSelect,
    DatepickerInput,
    TripsTypesSelect,
    TripGroupsSelect,
    TripsStatusSelect,
    MyTripsList,
    UiButton,
  },
  computed: {
    ...mapBookingState(['myTrips']),
    ...mapBookingGetters(['myTripsFiltersForBack']),
    filters() {
      return this.myTrips.filters;
    },
    filterDates: {
      get() {
        return {
          start: new Date(this.myTrips.filters.dateFrom),
          end: new Date(this.myTrips.filters.DateTo),
        };
      },
      set(newDate) {
        this[SET_MY_TRIPS_FILTERS]({
          dateFrom: newDate.start.toUTCString(),
          DateTo: newDate.end.toUTCString(),
        });
      },
    },
  },
  methods: {
    ...mapBookingMutations([SET_MY_TRIPS_FILTERS]),
    ...mapBookingsActions([getMyTrips]),
    tripDetailsClick(trip) {
      this.$router.push(`/my-trips/${trip.id}`);
    },
    changeFilter(fieldName, value) {
      this[SET_MY_TRIPS_FILTERS]({ [fieldName]: value });
    },
  },
  watch: {
    async filters(newParams) {
      const { dateFrom, DateTo, ...otherParams } = newParams;
      await this.$router.replace({
        query: {
          ...otherParams,
          dateFrom: getDateForUrl(dateFrom),
          DateTo: getDateForUrl(DateTo),
        },
      });
      this[getMyTrips](this.myTripsFiltersForBack);
    },
  },
  created() {
    const { query } = this.$route;
    const newQuery = {
      statuses: dataToArray(query.statuses),
      socialityTypes: dataToArray(query.socialityTypes),
      vahicleTypes: dataToArray(query.vahicleTypes),
      order: dataToString(query.order),
      dateFrom: query.dateFrom,
      DateTo: query.DateTo,
    };
    this[SET_MY_TRIPS_FILTERS](deleteEmptyFieldsInObj(newQuery));
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";
@import "./styles";
.trips {
  height: 100%;

  &__skeletons-wrapper {
    margin-top: 15px;
    display: grid;
    grid-gap: 20px;
  }

  &__no-data {
    margin-top: 20px;
    font-weight: 600;
  }
}

</style>
