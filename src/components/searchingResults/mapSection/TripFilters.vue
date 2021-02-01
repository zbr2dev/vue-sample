<template>
  <v-card style="padding: 15px; font-weight: 600; display: grid; grid-gap: 25px;">
    <titled-section title="Price">
      ...
    </titled-section>

    <titled-section title="Color">
      <color-picker-list />
    </titled-section>

    <titled-section title="Rating">
      <ui-detailed-rating
        v-for="rating in ratings"
        :key="rating"
        :value="rating"
        count-text="& Up"
        :class="['rating' ,{'active-rating': currentRating === rating }]"
        @click.native="currentRating = rating"
      />
    </titled-section>

    <titled-section title="Vehicle type">
      <vehicle-types-list
        class="vehicle-list"
        :all-vehicle-types-styles="mainVehicleItemStyles"
        :vehicle-type="vehicleType"
        @update:vehicleType="vehicleType = $event"
      />
    </titled-section>

    <titled-section title="Luggage">
      <luggage />
    </titled-section>

    <titled-section title="Special seats">
      <special-seats />
    </titled-section>

    <titled-section title="Services">
      <services />
    </titled-section>

    <div class="clear-all">Clear all</div>

  </v-card>
</template>

<script>
import TitledSection from '@/components/SearchPanel/tabs/TitledSection.vue';
import Luggage from '@/components/SearchPanel/tabs/searchMore/Luggage.vue';
import SpecialSeats from '@/components/SearchPanel/tabs/searchMore/SpecialSeats.vue';
import Services from '@/components/SearchPanel/tabs/searchMore/Services.vue';
import VehicleTypesList from '@/components/SearchPanel/tabs/searchMore/VehicleTypesList.vue';
import UiDetailedRating from '@/components/UI/UiDetailedRating.vue';
import ColorPickerList from '@/components/UI/simpleColorPicker/ColorPickerList.vue';

export default {
  name: 'TripFilters',
  components: {
    ColorPickerList,
    UiDetailedRating,
    VehicleTypesList,
    Services,
    SpecialSeats,
    Luggage,
    TitledSection,
  },
  data() {
    return {
      vehicleType: 'All',
      currentRating: null,
      // colors: [
      //   { name: 'White', style: 'white', active: true },
      //   { name: 'Blue', style: 'blue', active: false },
      //   { name: 'Green', style: 'green', active: true },
      //   { name: 'Red', style: '$EB5757' },
      // ],
      ratings: [400, 300, 200, 100],
      mainVehicleItemStyles: {
        'grid-column': '1/-1',
      },
    };
  },
};
</script>

<style scoped lang="scss">
  .vehicle-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(70px,80px));
    justify-content: space-between;
    grid-gap: 5px;
  }

  .clear-all {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #EB5757;
    padding: 16px;
    cursor: pointer;
    font-weight: 600;
    font-size: 12px;
  }

  .rating {
    border: 1px solid transparent;
    padding: 2px;
    cursor: pointer;
  }

  .active-rating {
    border: 1px solid #333333;
    border-radius: 2px;
  }

</style>
