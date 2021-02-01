<template>
  <div>
    <div style="font-weight: 600; margin: 10px 0;">Chauffers {{driversLength}}</div>
    <drivers-list
      :drivers="drivers"
      @showClickedDriver="handleShowClickedDriver"
      :selectedDriver="selectedDriver"
      style="display: grid; grid-auto-flow: column; grid-gap: 10px; overflow-x: auto;" />
  </div>
</template>

<script>
import DriversList from '@/components/tripDetails/general/drivers/DriversList.vue';
import fullDriversCardMixin from '@/components/tripDetails/general/drivers/fullDriversCardMixin';

export default {
  name: 'FullDriversCard',
  mixins: [fullDriversCardMixin],
  components: { DriversList },
};
</script>

<style scoped>

</style>
