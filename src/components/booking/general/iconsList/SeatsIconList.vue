<template>
  <div class="icon-blocks">
    <div class="icon-block"><infant-seat-armchair /> <span>4</span></div>
    <div class="icon-block"><baby-arm-chair /> <span>4</span> </div>
    <div class="icon-block"><booster-chair /> <span>4</span> </div>
  </div>
</template>

<script>
import InfantSeatArmchair from '@/components/UI/icons/InfantSeatArmchair.vue';
import BabyArmChair from '@/components/UI/icons/BabyArmChair.vue';
import BoosterChair from '@/components/UI/icons/BoosterChair.vue';

export default {
  name: 'SeatsIconList',
  components: { BoosterChair, BabyArmChair, InfantSeatArmchair },
};
</script>

<style scoped lang="scss">
@import "styles";
</style>
