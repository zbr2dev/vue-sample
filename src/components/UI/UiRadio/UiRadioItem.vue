<template>
  <v-radio
    v-bind="$attrs"
    color="black"
  >
    <template v-slot:label>
      <slot name="label"></slot>
    </template>
  </v-radio>
</template>

<script>
export default {
  name: 'UiRadioItem',
};
</script>

<style scoped>

</style>
