export default {
  props: {
    drivers: {
      type: Array,
      default: () => [],
    },
    selectedDriver: {
      type: Object,
    },
  },
  computed: {
    driversLength() {
      return this.drivers.length;
    },
  },
  methods: {
    handleShowClickedDriver(...data) {
      this.$emit('showClickedDriver', ...data);
    },
  },
};
