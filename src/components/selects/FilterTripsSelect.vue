<template>
  <ui-select label="Filter" :items="items" v-bind="$attrs" @input="$emit('input', $event)" />
</template>

<script>
import UiSelect from '@/components/UI/selects/UiSelect.vue';

export default {
  name: 'FilterTripsSelect',
  components: { UiSelect },
  data() {
    return {
      items: [
        {
          text: 'Best match',
          value: 'BestMatch',
        },
        {
          text: 'Lowest price',
          value: 'LowestPrice',
        },
        {
          text: 'Highest price',
          value: 'HighestPrice',
        },
        {
          text: 'Most reviewed',
          value: 'MostReviewed',
        },
        {
          text: 'Highest rated',
          value: 'HighestRated',
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>
