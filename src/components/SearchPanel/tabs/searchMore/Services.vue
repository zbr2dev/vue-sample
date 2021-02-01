<template>
  <div class="countable-rows">
    <ui-checkbox
      label="Airport"
    />
    <ui-checkbox
      label="Some Item Name"
    />
    <ui-checkbox
      label="I wanna more"
    />
  </div>
</template>

<script>
import UiCheckbox from '@/components/UI/UiCheckbox.vue';

export default {
  name: 'Services',
  components: { UiCheckbox },
};
</script>

<style scoped lang="scss">
  @import "countable-row";
</style>
