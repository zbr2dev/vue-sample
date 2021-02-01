<template>
  <ui-select label="Filter" :items="items" v-bind="$attrs" @input="$emit('input', $event)" />
</template>

<script>
import UiSelect from '@/components/UI/selects/UiSelect.vue';

export default {
  name: 'MyTripsOrderSelect',
  components: { UiSelect },
  data() {
    return {
      items: [
        {
          text: 'Latest',
          value: 'Latest',
        },
        {
          text: 'Earliest',
          value: 'Earliest',
        },
        {
          text: 'Lowest price',
          value: 'LowestPrice',
        },
        {
          text: 'Highest price',
          value: 'HighestPrice',
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>
