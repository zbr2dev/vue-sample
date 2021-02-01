<template>
  <ui-multi-select
    v-bind="$attrs"
    label="Types"
    :items="items"
    @input="$emit('input', $event)"
  />
</template>

<script>
import UiMultiSelect from '@/components/UI/selects/UiMultiSelect.vue';
import options from '@/components/selects/TripsTypesSelect/options';

export default {
  name: 'TripsTypesSelect',
  components: { UiMultiSelect },
  data() {
    return {
      items: [],
    };
  },
  created() {
    this.items = options;
  },
};
</script>

<style scoped>

</style>
