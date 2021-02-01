<template>
  <div class="time">
    <div class="time__selects">
      <hours-select :value="time.hours"  @input="setHours"/>
      <minutes-select :value="time.minutes" @input="setMinutes"/>
    </div>

    <div class="time__icon">
      <template v-if="time.hours === 12">
        <v-icon
          v-if="time.timeType === 'am'"
          style="font-size: 20px">mdi-weather-night</v-icon>
        <v-icon
          v-else-if="time.timeType === 'pm'"
          style="font-size: 20px">mdi-weather-sunny</v-icon>
      </template>
    </div>

    <div class="time__part-of-day">
      <v-btn-toggle :value="time.timeType" @change="changeTimeType" mandatory outlined>
        <v-btn
          v-for="tab in partsOfDay"
          :key="tab.title"
          text
          :value="tab"
          class="global time__button"
          >
          {{tab}}
        </v-btn>
      </v-btn-toggle>
    </div>
  </div>
</template>

<script>
import HoursSelect from '@/components/SearchPanel/tabs/searchTimeDate/HoursSelect.vue';
import MinutesSelect from '@/components/SearchPanel/tabs/searchTimeDate/MinutesSelect.vue';

function getFullTimeInfo(date) {
  const shortTime = new Date(date)
    .toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  const [hoursMinutes, timeType] = shortTime.split(' ');
  const [hours, minutes] = hoursMinutes.split(':');
  return { hours: +hours, minutes: +minutes, timeType: timeType.toLowerCase() };
}

function setHoursByAmOrPm(date, newHours) {
  const { timeType } = getFullTimeInfo(date);
  const newDate = new Date(date);
  if (timeType === 'am') {
    newDate.setHours(newHours === 12 ? 0 : newHours);
  } else {
    newDate.setHours(newHours === 12 ? 12 : (newHours + 12));
  }
  return newDate;
}

export default {
  name: 'ChooseTimePicker',
  components: { MinutesSelect, HoursSelect },
  props: {
    value: {
      type: Date,
      required: false, // Todo: later change to true
    },
  },
  data() {
    return {
      partsOfDay: ['am', 'pm'],
    };
  },

  computed: {
    time() {
      if (!this.value) return { hours: 12, minutes: 0, timeType: 'am' };
      const { hours, minutes, timeType } = getFullTimeInfo(this.value);
      return { hours, minutes, timeType };
    },
  },

  methods: {
    changeTimeType(selectedDayPart) {
      const newDate = new Date(this.value);
      newDate.setHours(selectedDayPart === 'am'
        ? newDate.getHours() - 12
        : newDate.getHours() + 12);
      this.$emit('input', newDate);
    },
    setHours(value) {
      this.$emit('input', setHoursByAmOrPm(this.value, +value));
    },
    setMinutes(value) {
      this.$emit('input', new Date(this.value.setMinutes(+value)));
    },
  },
};
</script>

<style scoped lang="scss">
  .time {
    display: flex;
    justify-content: space-between;

    &__selects {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 8px;
    }

    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
    }
  }
</style>

<style lang="scss">
@import "~@/assets/styles/variables";

    .global.time__button {
      font-family: $OpenSans;
      font-size: 14px;
      height: 32px !important;
      color: $grey;
      background: white;
      text-transform: uppercase;
      border-radius: 4px;
      padding: 4px;
      width: 40px;
      &.v-btn--active {
        background: black !important;
        color: white !important;
      }
    }
</style>
