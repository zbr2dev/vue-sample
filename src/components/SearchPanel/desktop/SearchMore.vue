<template>
  <search-tab-layout class="more">
    <section style="flex-basis: 500px">
      <titled-section title="Vehicle type">
        <vehicle-types-list
          class="more__list"
          :all-vehicle-types-styles="mainVehicleItemStyles"
          :vehicle-type="vehicleType"
          :vehicle-type-wrapper-styles="vehicleTypeWrapperStyles"
          show-vehicle-type-wrapper
          @update:vehicleType="$emit('update:vehicleType', $event)"
        />
      </titled-section>
    </section>

    <section style="flex-shrink: 0; padding: 0 20px">
      <div>
        <titled-section title="Luggage">
          <luggage />
        </titled-section>
      </div>

      <div style="margin-top: 15px;">
        <titled-section title="Special seats">
          <special-seats />
        </titled-section>
      </div>

    </section>

    <section style="flex-shrink: 0; padding: 0 20px">
      <titled-section title="Services">
        <services />
      </titled-section>
    </section>
  </search-tab-layout>
</template>

<script>
import SearchTabLayout from '@/components/SearchPanel/desktop/other/SearchTabLayout.vue';
import Services from '@/components/SearchPanel/tabs/searchMore/Services.vue';
import Luggage from '@/components/SearchPanel/tabs/searchMore/Luggage.vue';
import SpecialSeats from '@/components/SearchPanel/tabs/searchMore/SpecialSeats.vue';
import VehicleTypesList from '@/components/SearchPanel/tabs/searchMore/VehicleTypesList.vue';
import TitledSection from '@/components/SearchPanel/tabs/TitledSection.vue';

export default {
  name: 'SearchMore',
  components: {
    TitledSection,
    VehicleTypesList,
    SpecialSeats,
    Luggage,
    Services,
    SearchTabLayout,
  },
  props: {
    vehicleType: [String, Array],
  },
  data() {
    return {
      checkbox: false,
    };
  },
  computed: {
    mainVehicleItemStyles() {
      return {
        'align-self': 'stretch',
      };
    },
    vehicleTypeWrapperStyles() {
      return {
        display: 'grid',
        'grid-template-columns': 'repeat(auto-fill, 84px)',
        'grid-gap': '15px',
      };
    },
  },
};
</script>

<style scoped lang="scss">
  @import "~@/assets/styles/variables.scss";
  .more {
    display: flex;
    &__list {
      display: grid;
      grid-template-columns: min-content 1fr;
      grid-gap: 15px;
      align-items: center;
    }
  }
</style>
