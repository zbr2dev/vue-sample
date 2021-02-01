<template>
  <div class="countable-rows">
    <counter-item title="Carry-On" tooltip="Some info..." class="countable-row" v-model="carryOn">
      <bag-icon />
    </counter-item>

    <counter-item title="Standart" tooltip="Some info..." class="countable-row" v-model="standart">
      <suitcase-icon />
    </counter-item>

    <counter-item title="Oversize" tooltip="Some info..." class="countable-row" v-model="oversize">
      <golf-icon />
    </counter-item>
  </div>
</template>

<script>
import CounterItem from '@/components/SearchPanel/tabs/searchMore/CounterItem.vue';
import GolfIcon from '@/components/UI/icons/GolfIcon.vue';
import BagIcon from '@/components/UI/icons/BagIcon.vue';
import SuitcaseIcon from '@/components/UI/icons/SuitcaseIcon.vue';

export default {
  name: 'Luggage',
  components: {
    SuitcaseIcon, BagIcon, GolfIcon, CounterItem,
  },
  data() {
    return {
      carryOn: 0,
      standart: 0,
      oversize: 0,
    };
  },
};
</script>

<style scoped lang="scss">
  @import "countable-row";
</style>
