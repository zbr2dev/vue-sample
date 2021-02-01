<template>
  <search-tab-layout class="date">
    <div class="mode-switch">
      <v-btn-toggle :value="localTripType" @change="changeMode" mandatory outlined>
        <v-btn
          v-for="tab in buttonsByTimeMode"
          :key="tab.title"
          text
          :value="tab.mode"
          class="global time-btn">
          {{tab.title}}
        </v-btn>
      </v-btn-toggle>
    </div>
     <ui-calendar v-model="localSimpleDate" :is-range="isRange"/>

     <v-divider></v-divider>

    <div class="date__other d-flex">
      <template v-if="isRange">
        <div class="date__time">
          <div class="date__time-title">Pick-Up Time</div>
          <choose-time-picker v-model="start" />
        </div>

        <div class="date__time">
          <div class="date__time-title">Drop-Off Time</div>
          <choose-time-picker v-model="end" />
        </div>
      </template>

      <template v-else>
        <div class="date__time">
          <div class="date__time-title">Pick-Up Time</div>
          <choose-time-picker v-model="localSimpleDate" />
        </div>
      </template>
    </div>

  </search-tab-layout>
</template>

<script>
import SearchTabLayout from '@/components/SearchPanel/desktop/other/SearchTabLayout.vue';
import ChooseTimePicker from '@/components/SearchPanel/tabs/searchTimeDate/ChooseTimePicker.vue';
import UiCalendar from '@/components/UI/UiCalendar.vue';
import searchTimeMixin from '@/components/SearchPanel/tabs/searchTimeDate/searchTimeMixin';
import { buttonsByTimeMode } from '@/store/modules/searchPanel';
import searchPanelMixin from '@/components/SearchPanel/tabs/searchPanelMixin';

export default {
  name: 'SearchTimeDate',
  mixins: [searchTimeMixin, searchPanelMixin],
  components: {
    UiCalendar,
    ChooseTimePicker,
    SearchTabLayout,
  },
  data() {
    return {
      buttonsByTimeMode,
    };
  },
  props: {
    value: {
      type: [Date, Object, String],
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/variables.scss";

.global.time-btn {
  height: 36px;
  width: 132px;
  padding: 0 36px ;
  color: rgba(41, 41, 41, 0.6);
  font-weight: 600;
  text-transform: none;
  background: white;
  font-size: 12px;

  &.v-btn--active {
    background: $black;
    color: white;
  }
}

.mode-switch .v-btn-toggle {
//  border-bottom-left-radius: 0;
// border-bottom-right-radius: 0;
  border-color: unset;
  margin-left: 16px;
}

.date {
  width: max-content;

  &__time {
    padding: 12px 0;
  }

  &__time:last-child:not(:first-child) {
    margin-left: 10px;
  }

  &__time-title {
    font-family: $OpenSans;
    font-size: 14px;
    margin-bottom: 4px;
  }
}
</style>
