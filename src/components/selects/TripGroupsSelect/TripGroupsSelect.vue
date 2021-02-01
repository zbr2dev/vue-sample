<template>
  <ui-multi-select
    v-bind="$attrs"
    label="Groups"
    :items="items"
    @input="$emit('input', $event)"
  />
</template>

<script>
import UiMultiSelect from '@/components/UI/selects/UiMultiSelect.vue';
import options from '@/components/selects/TripGroupsSelect/options';

export default {
  name: 'TripGroupsSelect',
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
