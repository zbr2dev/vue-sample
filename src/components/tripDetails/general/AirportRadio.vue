<template>
  <ui-radio-group
    v-model="localValue"
  >
    <ui-radio-item value="a">
      <template v-slot:label>
        <div class="radio__label">
          <span>Inside</span>
          <span>$30.95</span>
        </div>
      </template>
    </ui-radio-item>

    <ui-radio-item
      value="b"
    >
      <template v-slot:label>
        <div class="radio__label">
          <span>Curbside</span>
          <span>$30.95</span>
        </div>
      </template>
    </ui-radio-item>
  </ui-radio-group>
</template>

<script>
import UiRadioGroup from '@/components/UI/UiRadio/UiRadioGroup.vue';
import UiRadioItem from '@/components/UI/UiRadio/UiRadioItem.vue';

export default {
  name: 'AirportRadio',
  components: { UiRadioItem, UiRadioGroup },
  props: ['value'],
  computed: {
    localValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit('input', newValue);
      },
    },
  },
};
</script>

<style scoped lang="scss">
  .radio {
    &__label {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  }
</style>
