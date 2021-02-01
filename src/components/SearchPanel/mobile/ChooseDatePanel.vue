<template>
  <div class="card-wrapper">
    <div>
      <panel-title @prev="$emit('prev')" title="Pick-up date"/>
      <ui-calendar v-model="localDate" style="margin: 20px auto 0"/>
    </div>

    <v-btn
      class="black-btn m-t-auto"
      dark
      @click="$emit('next')"
      :disabled="!localDate"
    >
      Next
    </v-btn>
  </div>
</template>

<script>
import UiCalendar from '@/components/UI/UiCalendar.vue';
import PanelTitle from '@/components/SearchPanel/mobile/other/PanelTitle.vue';
import { dateType } from '@/components/SearchPanel/props';

export default {
  name: 'ChooseDatePanel',
  components: { PanelTitle, UiCalendar },
  props: {
    date: dateType,
  },
  computed: {
    localDate: {
      get() {
        return this.date;
      },
      set(newValue) {
        this.$emit('update:date', newValue);
      },
    },
  },
};
</script>

<style scoped>
  @import "other/variables.scss";
</style>
