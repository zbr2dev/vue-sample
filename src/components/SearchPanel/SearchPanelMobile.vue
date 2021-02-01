<template>
  <div class="search-panel-mobile">
    <google-map-direction
      :waypoints="filters.waypoints"
      class="map"
      @pathLoaded="setRangeMeters"
      @zeroDirectionResults="handleZeroMapResults"/>

    <div class="search-panel-mobile__content">
      <location-button @click="isModalOpened = true"/>
    </div>

    <v-dialog v-model="isModalOpened" fullscreen>
      <v-stepper v-model="currentStep">
        <v-stepper-items>
          <v-stepper-content :step="steps.ROUTE" class="no-padding">
            <choose-route-panel
              v-bind:time-mode.sync="localTripType"

              :waypoints="filters.waypoints"
              @changeWaypoints="changeWaypoints"

              @prev="closeModal"
              @next="changeStep(steps.DATE)"

              :map-result-status="mapResultStatus"
            />
          </v-stepper-content>

          <v-stepper-content :step="steps.DATE" class="no-padding">
            <choose-date-panel
              v-bind:date.sync="localDate"
              @prev="changeStep(steps.ROUTE)"
              @next="changeStep(steps.TIME)"
            />
          </v-stepper-content>

          <v-stepper-content :step="steps.TIME" class="no-padding">
            <choose-time-panel
              v-model="localDate"
              @prev="changeStep(steps.DATE)"
              @next="changeStep(steps.PASSENGER_OTHER)"
            />
          </v-stepper-content>

          <v-stepper-content :step="steps.PASSENGER_OTHER" class="no-padding">
            <choose-passengers-and-more
              v-bind:passengers.sync="localPassengers"
              v-bind:vehicle-type.sync="localVehicleType"
              @prev="changeStep(steps.TIME)"
              @next="getResults"
            />
          </v-stepper-content>

          <v-stepper-content :step="steps.DETAILS" class="no-padding">
            <details-panel
              @prev="getResults"
              @moveToStep="changeStep"

              :origin-address="originAddress"
              :destination-address="destinationAddress"
              :readableDate="readableDate"
              :passengers="localPassengers"
              :vehicle-type="localVehicleType"
            />
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-dialog>

  </div>
</template>

<script>
import ChooseRoutePanel from '@/components/SearchPanel/mobile/ChooseRoutePanel.vue';
import ChooseDatePanel from '@/components/SearchPanel/mobile/ChooseDatePanel.vue';
import ChooseTimePanel from '@/components/SearchPanel/mobile/ChooseTimePanel.vue';
import ChoosePassengersAndMore from '@/components/SearchPanel/mobile/ChoosePassengersAndMorePanel.vue';
import DetailsPanel from '@/components/SearchPanel/mobile/DetailsPanel.vue';
import MOBILE_FILTRATION_STEPS from '@/components/SearchPanel/mobile/other/steps';
import searchPanelMixin from '@/components/SearchPanel/tabs/searchPanelMixin';
import GoogleMapDirection from '@/components/UI/googleMap/GoogleMapDirection.vue';
import LocationButton from '@/components/SearchPanel/mobile/other/LocationButton.vue';

export default {
  components: {
    LocationButton,
    GoogleMapDirection,
    DetailsPanel,
    ChoosePassengersAndMore,
    ChooseTimePanel,
    ChooseDatePanel,
    ChooseRoutePanel,
  },
  mixins: [searchPanelMixin],
  data() {
    return {
      isModalOpened: false,
      currentStep: MOBILE_FILTRATION_STEPS.ROUTE,
      steps: MOBILE_FILTRATION_STEPS,
    };
  },
  methods: {
    changeStep(step) {
      this.currentStep = step;
    },
    closeModal() {
      this.isModalOpened = false;
    },
    handlePrevStep() {
      console.log('prev step click');
    },
  },
  created() {
    const currentStep = this.$route.query.mobileStep;
    if (currentStep) {
      this.isModalOpened = true;
      this.currentStep = currentStep;
    }
  },
};
</script>

<style lang="scss" scoped>
  @import "mobile/other/variables";
  .no-padding {
    padding: $card-padding;
  }

  .search-panel-mobile {
    position: relative;
    height: 100%;
    min-height: 65vh;

    .map {
      position: absolute;
      min-height: 386px;
      width: 100%;
      height: 100%;
      top: 0;
      //z-index:0;
    }

    &__content {
      position: relative;
      z-index: 4;
      margin: 24px 16px;
    }
  }
</style>
