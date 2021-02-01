<template>
  <div class="card-wrapper">
    <div>
      <panel-title @prev="$emit('prev')" title="Pick-up time"/>
      <div class="d-flex date">
        <v-icon color="black" class="date__icon">mdi-calendar</v-icon>
        <span class="date__text">May 23, 2020</span>
      </div>
    </div>

    <div class="time-pickers">
      <template v-if="isRange">
        <div class="date__time">
          <choose-time-picker v-model="start" />
        </div>

        <div class="date__time" style="margin-top: 20px">
          <choose-time-picker v-model="end" />
        </div>
      </template>

      <template v-else>
        <div class="date__time">
          <choose-time-picker v-model="localSimpleDate" />
        </div>
      </template>
    </div>

    <v-btn class="black-btn m-t-auto" dark @click="$emit('next')">Next</v-btn>
  </div>
</template>

<script>
import PanelTitle from '@/components/SearchPanel/mobile/other/PanelTitle.vue';
import { dateType } from '@/components/SearchPanel/props';
import ChooseTimePicker from '@/components/SearchPanel/tabs/searchTimeDate/ChooseTimePicker.vue';
import searchTimeMixin from '@/components/SearchPanel/tabs/searchTimeDate/searchTimeMixin';

export default {
  name: 'ChooseTimePanel',
  mixins: [searchTimeMixin],
  components: { ChooseTimePicker, PanelTitle },
  props: {
    value: dateType,
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";
@import "other/variables";

.date {
  margin-left: 35px;
  margin-top: 9px;

  &__text {
    font-family: $OpenSans;
    font-size: 14px;
    color: $black;
    margin-left: 10px;
  }

  &__icon {
    font-size: 15px;
  }
}

.time-pickers {
  margin-top: 24px;
}
</style>
