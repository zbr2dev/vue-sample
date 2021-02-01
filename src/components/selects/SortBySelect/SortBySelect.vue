<template>
  <ui-select label="Sort" :items="options" v-bind="$attrs" @input="$emit('input', $event)" />
</template>

<script>
import UiSelect from '@/components/UI/selects/UiSelect.vue';
import options from './options';

export default {
  name: 'SortBySelect',
  components: { UiSelect },
  data() {
    return {
      options,
    };
  },
};
</script>

<style scoped>

</style>
