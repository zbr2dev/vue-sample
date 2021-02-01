<template>
  <ui-radio-group
    :value="value"
    @input="$emit('input', $event)"
  >
    <ui-radio-item
      value="a"
      label="No preferences"
    >
    </ui-radio-item>

    <ui-radio-item
      value="b"
      label="Warm"
    />

    <div class="d-flex align-center" style="position: relative">
      <ui-radio-item
        value="c"
        label="Cool"
        style="margin-bottom: 0"
      />
      <div style="margin-left: 15px"><slot name="cool"></slot></div>
    </div>

  </ui-radio-group>
</template>

<script>
import UiRadioGroup from '@/components/UI/UiRadio/UiRadioGroup.vue';
import UiRadioItem from '@/components/UI/UiRadio/UiRadioItem.vue';

export default {
  name: 'TemperatureRadio',
  components: { UiRadioItem, UiRadioGroup },
  props: ['value'],
};
</script>

<style scoped>

</style>
