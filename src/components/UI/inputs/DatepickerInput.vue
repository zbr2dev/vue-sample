<template>
  <div class="root" style="position: relative" v-click-outside="close">
    <base-input v-bind="$attrs" :value="readableValue" @click.native="toggle" style="width: 100%">
      <template v-slot:append-icon>
        <v-icon color="black" size="18">mdi-calendar</v-icon>
      </template>
    </base-input>

    <div v-if="opened" class="calendar">
      <v-card class="card"><ui-calendar is-range @input="setLocalValue" :value="value" /></v-card>
    </div>
  </div>
</template>

<script>
import BaseInput from '@/components/UI/inputs/BaseInput.vue';
import UiCalendar from '@/components/UI/UiCalendar.vue';
import { format } from 'date-fns';

export default {
  name: 'DatepickerInput',
  components: { UiCalendar, BaseInput },
  props: ['value'],
  data() {
    return {
      opened: false,
      localValue: '',
    };
  },
  computed: {
    readableValue() {
      const getReadableDate = (date) => format(new Date(date), 'EEE, MMM d');
      const firstDate = getReadableDate(this.value.start);
      const secondDate = getReadableDate(this.value.end);
      return `${firstDate} - ${secondDate}`;
    },
  },
  methods: {
    toggle() {
      this.opened = !this.opened;
    },
    close() {
      this.opened = false;
    },
    setLocalValue(data) {
      this.$emit('input', data);
    },
  },
};
</script>

<style scoped lang="scss">
  @import "~@/assets/styles/variables.scss";
  .root {
    position: relative;
    width: 100%;
  }

  .calendar {
    position: absolute;
    margin-top: 10px;
    z-index: 2;
  }

  .card {
    border: 2px solid $light-grey;
    background: white;
  }
</style>
