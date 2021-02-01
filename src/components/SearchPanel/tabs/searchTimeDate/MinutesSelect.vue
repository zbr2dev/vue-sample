<template>
  <ui-simple-select :options="options" :value="localValue" @input="$emit('input', $event)">
  </ui-simple-select>
</template>

<script>
import { fillArray } from '@/utils/helpers';
import UiSimpleSelect from '@/components/UI/UiSimpleSelect.vue';

export default {
  name: 'MinutesSelect',
  components: { UiSimpleSelect },
  props: ['value'],
  computed: {
    localValue() {
      return Math.round(this.value / 5) * 5;
    },
  },
  data() {
    return {
      options: fillArray(0, 55, 5).map((el) => ({ name: el < 10 ? `0${el}` : el, value: el })),
    };
  },
};
</script>

<style scoped>

</style>
