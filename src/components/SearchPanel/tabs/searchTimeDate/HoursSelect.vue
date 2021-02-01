<template>
  <ui-simple-select
    :options="options"
    :value="value"
    @input="$emit('input', $event)"
  />
</template>

<script>
import { fillArray } from '@/utils/helpers';
import UiSimpleSelect from '@/components/UI/UiSimpleSelect.vue';

export default {
  name: 'HoursSelect',
  components: { UiSimpleSelect },
  props: ['value'],
  data() {
    return {
      options: fillArray(1, 12),
    };
  },
};
</script>

<style scoped>

</style>
