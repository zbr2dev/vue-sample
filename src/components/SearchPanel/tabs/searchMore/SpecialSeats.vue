<template>
  <div class="countable-rows">
    <counter-item title="Infant" tooltip="Some info..." class="countable-row" v-model="infant">
      <infant-seat-armchair />
    </counter-item>
    <counter-item title="Child" tooltip="Some info..." class="countable-row" v-model="child">
      <baby-arm-chair />
    </counter-item>
    <counter-item title="Booster" tooltip="Some info..." class="countable-row" v-model="booster">
      <booster-chair />
    </counter-item>
  </div>
</template>

<script>
import CounterItem from '@/components/SearchPanel/tabs/searchMore/CounterItem.vue';
import InfantSeatArmchair from '@/components/UI/icons/InfantSeatArmchair.vue';
import BabyArmChair from '@/components/UI/icons/BabyArmChair.vue';
import BoosterChair from '@/components/UI/icons/BoosterChair.vue';

export default {
  name: 'SpecialSeats',
  components: {
    BoosterChair,
    BabyArmChair,
    InfantSeatArmchair,
    CounterItem,
  },
  data() {
    return {
      infant: 0,
      child: 0,
      booster: 0,
    };
  },
};
</script>

<style scoped lang="scss">
  @import "countable-row.scss";
</style>
