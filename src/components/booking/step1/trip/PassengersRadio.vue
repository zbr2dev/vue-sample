<template>
  <ui-radio-group
    :value="value"
    @input="$emit('input', $event)"
  >
    <ui-radio-item
      value="a"
      label="I’m the passenger"
    >
    </ui-radio-item>

    <ui-radio-item
      value="b"
      label="I order for others"
    />
  </ui-radio-group>
</template>

<script>
import UiRadioGroup from '@/components/UI/UiRadio/UiRadioGroup.vue';
import UiRadioItem from '@/components/UI/UiRadio/UiRadioItem.vue';

export default {
  name: 'PassengersRadio',
  components: { UiRadioItem, UiRadioGroup },
  props: ['value'],
};
</script>

<style scoped>

</style>
