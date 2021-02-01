export default {
  computed: {
    start: {
      get() {
        return this.value.start;
      },
      set(start) {
        this.$emit('input', { ...this.value, start });
      },
    },
    end: {
      get() {
        return this.value.end;
      },
      set(end) {
        this.$emit('input', { ...this.value, end });
      },
    },

    localSimpleDate: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit('input', newValue);
      },
    },

    isRange() {
      return !(this.value instanceof Date) && this.value !== null;
    },
  },
};
