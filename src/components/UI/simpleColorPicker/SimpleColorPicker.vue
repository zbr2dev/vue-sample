<template>
  <div class="picker">
    <div :class="['picker__color', {
      'picker__color--active': active
    }]" :style="colorStyle">
      <div class="picker__check-icon" v-if="active"/>
    </div>
    <span class="picker__color-name">{{color.name}}</span>
  </div>
</template>

<script>
export default {
  name: 'SimpleColorPicker',
  props: {
    color: {
      type: Object,
    },
    active: {
      type: Boolean,
    },
  },
  computed: {
    colorStyle() {
      const colorSchema = this.color.style;
      return this.active ? {
        'border-color': colorSchema === 'white' ? '#7e7e7e' : colorSchema,
      } : {
        background: colorSchema,
        border: colorSchema === 'white' ? '1px solid black' : 'unset',
      };
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";
  .picker {
    display: flex;
    align-items: center;
    cursor: pointer;
    &__color {
      margin-right: 8px;

      $size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border-radius: 50%;

      &--active {
        background: white;
        border-style: solid;
        border-width: 3.72px;
      }
    }

    &__color-name {
      font-family: $OpenSans;
      font-size: 14px;
      font-weight: 400;
    }

    &__check-icon {
      width: 5px;
      height: 3px;
      transform: rotate(-45deg);
      border-bottom: 1.4px solid black;
      border-left: 1.4px solid black;
    }
  }
</style>
