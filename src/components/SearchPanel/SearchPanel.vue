<template>
  <div class="search-section-desktop">
    <google-map-direction
      :waypoints="filters.waypoints"
      class="map"
      @pathLoaded="setRangeMeters"
      @zeroDirectionResults="handleZeroMapResults"
    />
    <div class="search-wrapper" v-click-outside="resetStep">
      <div class="search-bar">
        <v-card elevation="2">
          <div class="d-flex justify-space-between">
            <div class="d-flex align-center">
              <search-bar-item
                text="Time and date"
                subtext="Select pick-up time"
                @click.native="subMode = steps.TIME_AND_DATE"
              >
                <template v-slot:icon>
                  <v-icon style="vertical-align: middle" color="black"> mdi-calendar </v-icon>
                </template>
              </search-bar-item>
            </div>
            <div class="d-flex align-center">
              <v-divider vertical class="divider"></v-divider>
            <search-bar-item
              text="Location"
              subtext="Where are you going?"
              @click.native="subMode = steps.LOCATION"
            >
              <template v-slot:icon><v-icon color="black">mdi-arrow-right-bold</v-icon></template>
            </search-bar-item>
            </div>
            <div class="d-flex align-center">
              <v-divider vertical class="divider"></v-divider>
              <search-bar-item
                text="Passengers & Luggage"
                subtext="Add passengers"
                @click.native="subMode = steps.PASSENGERS">
                <template v-slot:icon>
                  <v-icon
                    style="vertical-align: middle"
                    color="black"> mdi-account-multiple </v-icon>
                </template>
              </search-bar-item>
            </div>

            <div class="d-flex align-center">
              <v-divider vertical class="divider"></v-divider>
              <search-bar-item
                text="More options"
                subtext="Advanced search"
                @click.native="subMode = steps.MORE"
              />
              <v-btn class="mx-2 search-btn" fab icon dark name="Search" @click="getResults" :disabled="!isSearchButtonActive">
                <v-icon dark> mdi-magnify </v-icon>
              </v-btn>
            </div>
          </div>
        </v-card>

        <section>
          <slide-up-down :active="subMode === steps.LOCATION"  v-if="typeof subMode === 'number'">
            <SearchLocation
              @changeWaypoints="changeWaypoints"
              :waypoints="filters.waypoints"
              :map-result-status="mapResultStatus"
            />
          </slide-up-down>

          <slide-up-down :active="subMode === steps.TIME_AND_DATE">
            <SearchTimeDate v-model="localDate"/>
          </slide-up-down>

          <slide-up-down :active="subMode === steps.PASSENGERS">
            <SearchPassengers v-model="localPassengers" style="margin-left: 50%"/>
          </slide-up-down>

          <slide-up-down :active="subMode === steps.MORE">
            <SearchMore v-bind:vehicle-type.sync="localVehicleType" :is-search-button-active="isSearchButtonActive" />
          </slide-up-down >
        </section>

      </div>
    </div>
  </div>
</template>

<script>
import SearchMore from '@/components/SearchPanel/desktop/SearchMore.vue';
import { buttonsByTimeMode } from '@/store/modules/searchPanel';
import SlideUpDown from 'vue-slide-up-down';
import searchPanelMixin from '@/components/SearchPanel/tabs/searchPanelMixin';
import GoogleMapDirection from '@/components/UI/googleMap/GoogleMapDirection.vue';
import SearchBarItem from './desktop/other/SearchBarItem.vue';
import SearchLocation from './desktop/SearchLocation.vue';
import SearchPassengers from './desktop/SearchPassengers.vue';
import SearchTimeDate from './desktop/SearchTimeDate.vue';

const DESKTOP_FILTER_STEPS = {
  LOCATION: 0,
  TIME_AND_DATE: 1,
  PASSENGERS: 2,
  MORE: 3,
};

export default {
  components: {
    GoogleMapDirection,
    SearchPassengers,
    SearchBarItem,
    SearchLocation,
    SearchMore,
    SearchTimeDate,
    SlideUpDown,
  },
  mixins: [searchPanelMixin],
  data() {
    return {
      subMode: null,
      steps: DESKTOP_FILTER_STEPS,
      buttonsByTimeMode,
    };
  },
  methods: {
    resetStep() {
      this.subMode = null;
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/styles/variables";
.search-section-desktop {
  .search-btn {
    background: linear-gradient(143.42deg, #FF5C00 0%, #F99C69 115.15%) !important;
  }

  .divider {
    height: 36px;
    min-height: max-content;
    align-self: auto;
  }
}
</style>

<style lang="scss" scoped>
.search-section-desktop {
  position: relative;
  //height: 100%;
  min-height: 710px;

  .search-wrapper {
    padding: 6% 17.7%;
  }

  .map {
    position: absolute;
    min-height: 386px;
    width: 100%;
    height: 100%;
    top: 0;
    //z-index:0;
  }
}

@media screen and (max-width: 1200px){
  .search-section-desktop {
    .search-wrapper {
      display: flex;
      justify-content: center;
      padding: 6% 20px;
    }
  }
}
</style>
