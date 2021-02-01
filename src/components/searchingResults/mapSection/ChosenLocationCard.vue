<template>
  <v-card class="chosen-location">
    <div class="chosen-location__row">
      <div class="chosen-location__row-first-icon">
        <v-icon color="black">mdi-map-marker</v-icon>
      </div>
      <span class="chosen-location__place">{{ readableTripType }}</span>

      <v-icon class="icon-pencil">mdi-pencil</v-icon>
    </div>

    <section>

    </section>
    <div class="chosen-location__row">
      <div class="chosen-location__row-first-icon">
        <arrow-route-from />
      </div>
      <span class="chosen-location__place">{{ originAddress }}</span>
      <v-icon class="icon-pencil" @click="$emit('edit')">mdi-pencil</v-icon>
    </div>

    <div class="chosen-location__row" style="margin-top: 8px; margin-bottom: 12px;">
      <div class="chosen-location__row-first-icon">
        <arrow-route-to />
      </div>
      <span class="chosen-location__place">{{ destinationAddress }}</span>
      <v-icon class="icon-pencil" @click="$emit('edit')">mdi-pencil</v-icon>

    </div>

    <div v-if="otherWaypointsCount >= 1" class="chosen-location__row" style="margin-top: -8px">
      <div/>
      <div class="chosen-location__other-locations">(+{{otherWaypointsCount}} stops)</div>
    </div>

    <div class="chosen-location__row">
      <div class="chosen-location__row-first-icon">
        <v-icon color="black" style="font-size: 18px">mdi-calendar</v-icon>
      </div>
      <span class="chosen-location__dates">{{ readableDate }}</span>
      <v-icon class="icon-pencil" @click="$emit('edit')">mdi-pencil</v-icon>
    </div>

    <div class="chosen-location__row">
      <div class="chosen-location__row-first-icon d-flex align-center">
        <v-icon color="black" style="font-size: 18px;">mdi-account-multiple</v-icon>
      </div>
      <div class="chosen-location__passengers d-flex align-center">
        {{ filters.passengers }} passengers with
        <div class="icon-text"><bag-icon /> <span>4</span></div>
        <div class="icon-text"><suitcase-icon /> <span>4</span> </div>
        <div class="icon-text"><golf-icon /> <span>4</span> </div>
      </div>
      <v-icon color="black" style="font-size: 18px" @click="$emit('filter')">mdi-filter</v-icon>
    </div>

  </v-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import ArrowRouteFrom from '@/components/UI/icons/routing/ArrowRouteFrom.vue';
import ArrowRouteTo from '@/components/UI/icons/routing/ArrowRouteTo.vue';
import BagIcon from '@/components/UI/icons/BagIcon.vue';
import SuitcaseIcon from '@/components/UI/icons/SuitcaseIcon.vue';
import GolfIcon from '@/components/UI/icons/GolfIcon.vue';
import TripInfo from '@/utils/TripInfo';

const { mapState: mapSearchPanelState, mapGetters: mapSearchPanelGetters } = createNamespacedHelpers('searchPanel');

export default {
  name: 'ChosenLocationCard',
  components: {
    GolfIcon,
    SuitcaseIcon,
    BagIcon,
    ArrowRouteTo,
    ArrowRouteFrom,
  },
  computed: {
    ...mapSearchPanelState(['filters']),
    ...mapSearchPanelGetters(['originAddress', 'destinationAddress', 'readableDate', 'readableTripType']),
    otherWaypointsCount() {
      return TripInfo.getOtherWaypointsCount(this.filters);
    },
  },

};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";

.icon-text {
  display: flex;
  align-items: center;
  margin-left: 5px;

  svg {
    margin-right: 5px;
  }
}

.chosen-location {
  position: relative;
  padding: 15px;
  font-family: $OpenSans;
  color: $black;

  &__map {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  &__place {
    font-size: 14px;
  }

  &__passengers, &__dates {
    font-size: 12px;
  }

  &__row-first-icon {
    display: flex;
    justify-content: center;
    margin-right: 5px;
  }

  &__other-locations {
    font-family: $OpenSans;
    font-size: 12px;
    color: $grey;
  }

  &__row {
    //display: grid;
    //grid-template-columns: 22px max-content 18px;
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    .icon-pencil {
      display: none;
      cursor: pointer;
      font-size: 16px;
    }

    &:hover {
      .icon-pencil {
        display: block;
        color: black;
      }
    }

    >:nth-child(1) {
      width: 22px;
      margin-right: 5px;
    }
    //>:nth-child(2) {
    //  margin: 0 10px;
    //}
    >:nth-child(3) {
      margin-left: auto;
    }
  }
}
</style>
