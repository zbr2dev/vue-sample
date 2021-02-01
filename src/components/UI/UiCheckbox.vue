<template>
  <v-checkbox
    v-bind="$attrs"
    :class="['ui-checkbox', {'fs-14': fs14}]"
    @change="$emit('input', $event)"
    hide-details
    dense
  />
</template>

<script>
export default {
  name: 'UiCheckbox',
  props: {
    fs14: {
      type: Boolean,
    },
  },
};
</script>

<style scoped lang="scss">
  .ui-checkbox {
    margin: 0 0 calc(-9px + 12px);
    padding: 0;
  }

</style>

<style lang="scss">
  @import "~@/assets/styles/variables.scss";
  .ui-checkbox {
    color: black !important;

    margin: 0 !important;
    padding-top: 0 !important;

    .v-icon {
      font-size: 17px;
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

    .v-label {
      color: black;
      font-size: 12px;
    }

    .v-input--selection-controls__ripple {
      left: -50% !important;
    }
  }

  .fs-14 {
    .v-label {
      font-size: 14px;
    }
  }

</style>
