<template>
  <v-text-field
    label="wea"
    v-bind="$attrs"
    single-line
    outlined
    class="wrapper__simple-input"
  ></v-text-field>
</template>

<script>
// Todo: some global styles makes big problem for this input
export default {
  name: 'OutlinedInput',
};
</script>

<style lang="scss">
//$text-field-solo-dense-control-min-height: 100px;
//.wrapper__simple-input {
//  .v-input__slot {
//    //min-height: 32px !important;
//    //font-size: 14px;
//  }
//
//  .v-text-field--outlined .v-label {
//    top: unset !important;
//  }
//}
</style>
