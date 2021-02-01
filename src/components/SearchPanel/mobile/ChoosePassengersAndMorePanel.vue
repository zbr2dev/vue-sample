<template>
  <div class="card-wrapper more">
    <panel-title @prev="$emit('prev')" title="Add passengers"/>
    <titled-counter
      class="more__passengers"
      title="Passengers"
      :value="passengers"
      @input="$emit('update:passengers', $event)"
    />

    <div class="d-flex align-center expander" @click="opened = !opened" style="margin-top: 36px;">
      <div class="expander__title">More options</div>
      <v-icon
        color="black"
        :class="['expander__icon', {'expander__icon--opened': opened}]"
      >
        mdi-menu-down
      </v-icon>
    </div>

    <slide-up-down :active="opened">
      <section class="more__section">
        <div class="more__title">Vehicle type</div>
        <vehicle-types-list
          class="more__list"
          :vehicle-type="vehicleType"
          @update:vehicleType="$emit('update:vehicleType', $event)" />
      </section>

      <section class="more__section">
        <div>
          <div class="more__title">Luggage</div>
          <luggage />
        </div>

        <div style="margin-top: 15px;">
          <div class="more__title">Special seats</div>
          <special-seats />
        </div>

      </section>

      <section class="more__section">
        <div class="more__title">Services</div>
        <services />
      </section>
    </slide-up-down>

    <v-btn
      class="black-btn m-t-auto"
      @click="$emit('next')"
      dark
    >
      Search
    </v-btn>
  </div>
</template>

<script>
import PanelTitle from '@/components/SearchPanel/mobile/other/PanelTitle.vue';
import TitledCounter from '@/components/SearchPanel/tabs/TitledCounter.vue';
import SlideUpDown from 'vue-slide-up-down';
import Luggage from '@/components/SearchPanel/tabs/searchMore/Luggage.vue';
import SpecialSeats from '@/components/SearchPanel/tabs/searchMore/SpecialSeats.vue';
import Services from '@/components/SearchPanel/tabs/searchMore/Services.vue';
import VehicleTypesList from '@/components/SearchPanel/tabs/searchMore/VehicleTypesList.vue';

export default {
  name: 'ChoosePassengersAndMore',
  components: {
    VehicleTypesList,
    Services,
    SpecialSeats,
    Luggage,

    TitledCounter,
    PanelTitle,
    SlideUpDown,
  },
  props: {
    passengers: Number,
    vehicleType: [String, Array],
  },
  data() {
    return {
      opened: false,
    };
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";

  .more {
    &__passengers {
      margin-top: 23px;
    }

    &__section {
      margin: 17px 0;
    }

    &__title {
      font-family: $Montserrat;
      font-weight: 600;
      font-size: 14px;
      color: $black;
      margin-bottom: 17px;
    }

    &__list {
      display: grid;
      grid-auto-flow: column;
      grid-gap: 5px;
      overflow-x: auto;
      > * {
        width: 90px;
      }
    }
  }

  .expander {
    &__title {
      font-family: $Montserrat;
      font-size: 18px;
      font-weight: 600;
    }

    &__icon {
      font-size: 30px;

      &--opened {
        transform: rotate(180deg);
      }
    }
  }
</style>
