<template>
  <select class="select" v-model="localValue">
    <option v-for="option in options" :key="isObjectOption ? option.value : option" :value="isObjectOption ? option.value : option">
      {{isObjectOption ? option.name : option}}
    </option>
  </select>
</template>

<script>
export default {
  name: 'UiSimpleSelect',
  props: {
    options: {
      type: Array,
    },
    value: {
      type: [Number, String],
    },
  },
  computed: {
    isObjectOption() {
      return typeof this.options[0] === 'object';
    },
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
  @import "../../assets/styles/variables";

  .select {
    appearance: button;
    height: 32px;
    background: white;
    border: 1px solid #BFBFBF;
    font-family: $OpenSans;
    font-size: 14px;
    border-radius: 4px;
    min-width: 60px;
  }
</style>
