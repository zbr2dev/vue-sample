<template>
  <date-picker
    v-bind="$attrs"
    v-model="localDate"
    :attributes="attributes"
    :theme='themeStyles'
    :is-range="isRange"
    class="wrapper__calendar" :columns="columns"
  />
</template>

<script>
import { DatePicker } from 'v-calendar';

export default {
  name: 'UiCalendar',
  components: {
    DatePicker,
  },
  props: {
    value: {
      type: [Date, Object, String],
    },
    isRange: Boolean,
  },
  data() {
    return {
      themeStyles: {
        dayNotInMonth: 'not-in-month',
      },
    };
  },
  computed: {
    columns() {
      return this.isRange
        ? this.$screens({ default: 1, lg: 2 })
        : this.$screens({ default: 1, lg: 1 });
    },
    localDate: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit('input', newValue);
      },
    },
    attributes() {
      return [
        {
          key: 'today',
          highlight: { class: 'my-calendar__today' },
          dates: new Date(),
        },
        {
          key: 'chosen',
          highlight: {
            contentClass: 'my-calendar__chosen',
            class: 'my-calendar__chosen',
          },
          dates: this.localDate,
        },
      ];
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/styles/variables";
.wrapper__calendar {
  font-family: $OpenSans;
  border: none !important;

  .is-today .vc-highlights + .vc-day-content {
    background: none !important;
  }

  .vc-day-content {
    &:hover, &:focus {
      background: none;
    }
  }

  .vc-highlight-base-middle {
    color: white !important;
  }

  .vc-weekday {
    color: black;
    font-weight: 500;
  }

  .vc-title {
    font-family: $OpenSans !important;
    font-weight: normal;
    font-size: 14px;
  }

 .vc-highlight.vc-highlight-base-end {
   height: 85% !important;
   background-color: #BFBFBF !important;
  }

  .vc-highlight.vc-highlight-base-start {
    height: 85% !important;
    background-color: #BFBFBF !important;
  }

  .vc-highlight.vc-highlight-base-middle {
    background-color: #bfbfbf !important;
    height: 85%;
  }

  .in-prev-month, .in-next-month {
    color: #BFBFBF !important;
  }
  .is-not-in-month.not-in-month {
    color: #bfbfbf !important; // change this
    border-radius: 2px;
  }

  .vc-highlights {
  }

  .my-calendar__chosen {
    border-radius: 4px;
    background: black !important;
    color: white !important;
    z-index: 2;

    &:hover, &:focus {
      background: red;
    }
  }

  .vc-day {
    //min-height: auto;
    //width: 24px !important;
    //height: 24px !important;
  }
}

.my-calendar__today {
  border: 1px solid black;
  border-radius: 4px;
  background: none;
}

</style>
