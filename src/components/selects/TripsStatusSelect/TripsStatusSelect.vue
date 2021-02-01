<template>
  <ui-multi-select
    v-bind="$attrs"
    label="Status"
    :items="items"
    @input="$emit('input', $event)"
  />
</template>

<script>
import UiMultiSelect from '@/components/UI/selects/UiMultiSelect.vue';
import options from '@/components/selects/TripsStatusSelect/options';

export default {
  name: 'TripsStatusSelect',
  components: { UiMultiSelect },
  data() {
    return {
      items: options,
    };
  },
};
</script>

<style scoped>

</style>
