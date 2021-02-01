<template>
  <div>
    <simple-driver-card
      v-for="(driver, index) in drivers"
      :driver="driver"
      :key="index"
      :active="driver.id === (selectedDriver && selectedDriver.id)"
      @select="selectDriver"
      @cancel="selectDriver(null)"
      @click.native="showDriveInfo(driver)"
    />
  </div>
</template>

<script>
import SimpleDriverCard from '@/components/tripDetails/general/drivers/SimpleDriverCard.vue';

export default {
  name: 'DriversList',
  components: { SimpleDriverCard },
  props: {
    drivers: {
      type: Array,
      required: true,
    },
    selectedDriver: {
      type: Object,
    },
  },
  methods: {
    showDriveInfo(driver) {
      this.$emit('showClickedDriver', driver);
    },
    selectDriver(driver) {
      this.$emit('selectDriver', driver);
    },
  },
};
</script>

<style scoped>

</style>
