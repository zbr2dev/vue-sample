<template>
  <div class="icon-blocks">
    <div class="icon-block"><bag-icon /> <span>4</span></div>
    <div class="icon-block"><suitcase-icon /> <span>4</span> </div>
    <div class="icon-block"><golf-icon /> <span>4</span> </div>
  </div>
</template>

<script>
import BagIcon from '@/components/UI/icons/BagIcon.vue';
import SuitcaseIcon from '@/components/UI/icons/SuitcaseIcon.vue';
import GolfIcon from '@/components/UI/icons/GolfIcon.vue';

export default {
  name: 'LuggageIconList',
  components: { GolfIcon, SuitcaseIcon, BagIcon },
};
</script>

<style scoped lang="scss">
@import "styles";
</style>
