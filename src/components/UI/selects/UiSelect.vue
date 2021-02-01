<template>
  <v-select
    v-bind="$attrs"
    solo
    class="ui-select"
    hide-details="auto"
    @input="$emit('input', $event)"
    height="32px"
    flat
  >

    <template v-slot:selection="slotScoped" v-if="$scopedSlots.selection">
      <slot name="selection" v-bind="slotScoped"></slot>
    </template>

    <template v-slot:item="slotScoped" v-if="$scopedSlots.item">
      <slot name="item" v-bind="slotScoped"></slot>
    </template>

    <template v-slot:prepend-item v-if="$slots['prepend-item']">
      <slot name="prepend-item"></slot>
    </template>
  </v-select>
</template>

<script>
export default {
  name: 'UiSelect',
};
</script>

<style lang="scss">
@import "~@/assets/styles/variables.scss";

  .ui-select.v-text-field.v-text-field--solo .v-input__control {
    box-sizing: border-box;
    min-height: 30px !important;
    border: 1px solid $light-grey;
  }

  .ui-select {
    .v-input__slot {
      box-shadow: none;
    }

    .v-input__control {
      border:  1px solid $light-grey;
      border-radius: 4px;
    }
  }

  .v-list-item {
    min-height: 28px !important;
  }
  .v-list-item__content {
    padding: 6px 0;
  }
  .v-list-item__title {
    font-size: 14px;
  }
  .v-menu__content {
    @include scrollbar;
  }
</style>
