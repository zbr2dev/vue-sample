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
      label="I like to talk"
    />

    <ui-radio-item
      value="c"
      label="I prefer quietness"
    />
  </ui-radio-group>
</template>

<script>
import UiRadioGroup from '@/components/UI/UiRadio/UiRadioGroup.vue';
import UiRadioItem from '@/components/UI/UiRadio/UiRadioItem.vue';

export default {
  name: 'ConversationRadio',
  components: { UiRadioItem, UiRadioGroup },
  props: ['value'],
};
</script>

<style scoped>

</style>
