<template>
  <div class="card-wrapper details">
    <div>
      <panel-title @prev="$emit('prev')" title="Details"/>

      <div class="details__section section">
        <section-header text="Location" @edit="moveToChosenStep(steps.ROUTE)"/>
        <div class="section__body">
          <div class="section__row">
            <span class="section__variable">From</span>
            <span class="section__value">{{ originAddress }}</span>
          </div>
          <div class="section__row">
            <span class="section__variable">To</span>
            <span class="section__value">{{ destinationAddress }}</span>
          </div>
        </div>
      </div>

      <div class="details__section">
        <section-header text="Time and date" @edit="moveToChosenStep(steps.DATE)"/>
        <div class="section__body">
          <div class="section__row">
            <span class="section__variable">Pick up</span>
            <span class="section__value">{{ readableDate }}</span>
          </div>
        </div>
      </div>

      <div class="details__section">
        <section-header text="Passengers" @edit="moveToChosenStep(steps.PASSENGER_OTHER)" />
        <div class="section__body">
          <div class="section__row">
            <span class="section__value">{{ passengers }}</span>
          </div>
        </div>
      </div>

      <div class="details__section">
        <section-header text="Options" @edit="moveToChosenStep(steps.PASSENGER_OTHER)" />
        <div class="section__body">
          <div class="section__row">
            <span class="section__variable">Vehicle</span>
            <span class="section__value">{{ vehicleType | arrayToString }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PanelTitle from '@/components/SearchPanel/mobile/other/PanelTitle.vue';
import SectionHeader from '@/components/SearchPanel/mobile/other/SectionHeader.vue';
import MOBILE_FILTRATION_STEPS from '@/components/SearchPanel/mobile/other/steps';
import { vehicleTypeTypes } from '@/components/SearchPanel/props';

export default {
  name: 'DetailsPanel',
  components: { SectionHeader, PanelTitle },
  props: {
    originAddress: String,
    destinationAddress: String,
    readableDate: String,
    passengers: Number,
    vehicleType: vehicleTypeTypes,
  },
  data() {
    return {
      steps: MOBILE_FILTRATION_STEPS,
    };
  },
  filters: {
    arrayToString(value = []) {
      return value.join(',');
    },
  },
  methods: {
    moveToChosenStep(step) {
      this.$emit('moveToStep', step);
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";

  .details {
    &__section {
      margin-top: 16px;
    }
  }

  .section {
    &__body {
      margin-top: 10px;
    }

    &__row {
      display: grid;
      grid-template-columns: 55px 1fr;
      grid-gap: 12px;
      margin-bottom: 8px;
    }

    &__variable, &__value {
      font-family: $OpenSans;
      font-size: 14px;
    }

    &__variable {
      color: #7E7E7E;
    }
  }
</style>
