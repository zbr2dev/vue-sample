<template>
  <div class="picker">
    <ui-checkbox
      v-for="color in colors"
      :key="color.style"
      :label="color.name"
      v-model="color.active"
    />
  </div>
</template>

<script>
import UiCheckbox from '@/components/UI/UiCheckbox.vue';

export default {
  name: 'ColorPickerList',
  components: { UiCheckbox },
  props: {
    activeColors: {
      type: Array,
    },
  },
  data() {
    return {
      colors: [
        { name: 'White', active: true },
        { name: 'Blue', active: false },
        { name: 'Green', active: true },
        { name: 'Red', active: false },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
  .picker {
    display: grid;
    grid-gap: 5px;
  }
</style>
