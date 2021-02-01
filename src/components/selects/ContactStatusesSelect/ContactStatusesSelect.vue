<template>
  <ui-select label="All statuses" :items="options" v-bind="$attrs" @input="$emit('input', $event)" />
</template>

<script>
import UiSelect from '@/components/UI/selects/UiSelect.vue';
import options from './options';

export default {
  name: 'ContactStatusesSelect',
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
