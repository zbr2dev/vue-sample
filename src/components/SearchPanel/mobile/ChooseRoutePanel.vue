<template>
  <div class="mobile-route-panel card-wrapper">
    <v-btn-toggle
      class="mobile-route-panel__time-mode"
      :value="tripType"
      @change="$emit('update:tripType', $event)"
      mandatory
      outlined
    >
      <v-btn
        v-for="tab in buttonsByTimeMode"
        class="global time__button"
        :key="tab.title"
        :value="tab.mode"
        text
      >
        {{tab.title}}
      </v-btn>
    </v-btn-toggle>

    <div class="mobile-route-panel__locations">
      <v-icon @click="$emit('prev')" class="prev-icon">mdi-chevron-left</v-icon>
      <enter-locations-list
        :waypoints="waypoints"
        @changeWaypoints="$emit('changeWaypoints', $event)"
        :map-result-status="mapResultStatus"
      />
    </div>

    <div>
      <div class="popular">Popular</div>
      <old-location-list />
    </div>

    <div class="m-t-auto">
      <v-btn
        class="black-btn"
        dark
        width="100%"
        @click="$emit('next')">
        Next
      </v-btn>
    </div>
  </div>
</template>

<script>
import { buttonsByTimeMode } from '@/store/modules/searchPanel';
import OldLocationList from '@/components/SearchPanel/tabs/location/OldLocationList.vue';
import EnterLocationsList from '@/components/SearchPanel/tabs/location/EnterLocationsList.vue';
import { mapResultStatusType } from '@/components/SearchPanel/props';

export default {
  name: 'ChooseRoutePanel',
  components: { EnterLocationsList, OldLocationList },
  props: {
    waypoints: {
      type: Array,
    },
    tripType: [Number, String],
    mapResultStatus: mapResultStatusType,
  },
  data() {
    return {
      buttonsByTimeMode,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "other/variables";

  .mobile-route-panel__time-mode {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .mobile-route-panel__locations {
    display: grid;
    grid-template-columns: max-content 1fr;
    grid-gap: 16px;
    margin-top: 16px;
  }

  .mobile-route-panel {
    .prev-icon {
      align-self: flex-start;
      top: 4px;
    }

    .popular {
      margin: 10px 0;
      color: #7E7E7E;
      font-size: 12px;
    }
  }
</style>

<style lang="scss">
  @import "~@/assets/styles/variables.scss";
  .mobile-route-panel {
    background: white;

    .global.time__button {
      height: 40px !important;
      padding: 0 36px !important;
      color: rgba(41, 41, 41, 0.6) !important;
      font-weight: 600;
      text-transform: none;
      background: white;
      width: 100%;

      &.v-btn--active {
        background: $black;
        color: white !important;
        border: none;
      }
    }
  }
</style>
