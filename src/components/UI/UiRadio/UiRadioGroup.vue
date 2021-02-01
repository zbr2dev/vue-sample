<template>
  <v-radio-group
    v-model="localValue"
    column
    hide-details
    class="radio"
    active
  >
    <slot></slot>
  </v-radio-group>
</template>

<script>
export default {
  name: 'UiRadioGroup',
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

<style lang="scss">
.radio {
  color: black;
  margin-top: 0 !important;
  padding-top: 0 !important;

  .v-icon {
    font-size: 18px;
    color: black;
    width: auto !important;
  }

  .v-input--selection-controls__ripple {
    height: auto;
  }

  .v-input--selection-controls__input {
    height: auto;
    margin-right: 2px !important;
  }

  .v-input--radio-group--column .v-radio:not(:last-child):not(:only-child) {
    margin-bottom: 5px !important;
  }

  .v-label {
    color: black;
    font-size: 12px;
  }
}
</style>
