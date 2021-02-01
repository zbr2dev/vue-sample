<template>
  <base-input
    v-bind="$attrs"
    v-model="localValue"
    ref="temperature"
    @upNumber="up"
    @downNumber="down"
    type="number"
    :error-state="minMax"
  />
</template>

<script>
import BaseInput from '@/components/UI/inputs/BaseInput.vue';

export default {
  name: 'TemperatureInput',
  components: { BaseInput },
  props: {
    value: {
      type: Number,
    },
  },
  computed: {
    localValue: {
      get() {
        return `${this.value} °F`;
        // return this.value;
      },
      set(newValue) {
        const number = parseInt(newValue, 10) || 0;
        this.$emit('input', number);
      },
    },
    minMax() {
      return this.localValue >= 57 && this.localValue <= 87;
    },
  },
  methods: {
    up() {
      this.$emit('input', this.value + 1);
    },
    down() {
      this.$emit('input', this.value - 1);
    },
  },
  mounted() {
    this.$refs.temperature.$refs.input.addEventListener('focus', (e) => {
      setTimeout(() => {
        const valueLength = this.localValue.length;
        // eslint-disable-next-line no-multi-assign
        e.target.selectionStart = e.target.selectionEnd = valueLength - 3;
      });
    });
  },
};
</script>

<style scoped>

</style>
