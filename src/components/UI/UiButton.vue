<template>
  <button
    @click="$emit('click', $event)"
    :style="{width: fullWidth ? '100%' : 'auto'}"
    :class="[
      'ui-button',
      {
        [`ui-button--${type}`]: type,
        [`ui-button--size-${size}`]: size,
        'disabled': disabled
      }
  ]"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'UiButton',
  props: {
    type: {
      type: String,
      validator(value) {
        return ['orange', 'dark', 'grey', 'dark-border', 'orange-border', 'danger-border'].includes(value);
      },
      default: () => 'dark',
    },
    size: {
      type: String,
      validator(value) {
        return ['small', 'default'].includes(value);
      },
      default: () => 'default',
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";

  .ui-button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 36px;
    min-height: 36px;
    font-family: $Montserrat;
    font-weight: 600;
    box-sizing: border-box;
    border-radius: 6px;

    &:focus {
      outline: none;
    }

    &--size-default {
      padding: 0 36px;
      min-height: 36px;
      font-size: 14px;
    }

    &--size-small {
      padding: 0 19px;
      min-height: 28px;
      font-size: 12px;
    }
  }

  @mixin buttonType($colorName, $bgColor, $textColor: white) {
    .ui-button--#{$colorName} {
      background: $bgColor;
      color: $textColor;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  @mixin buttonTypeBordered($colorName, $color) {
    .ui-button--#{$colorName}-border {
      border: 1px solid $color;
      color: $color;
      background: white;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  .disabled {
    opacity: 0.5;
    &:hover {
      opacity: 0.5 !important;
    }
  }

  @include buttonType('orange', linear-gradient(136.09deg, #FF5C00 0%, #F99C69 100%));
  @include buttonType('dark', $black);
  @include buttonType('grey', #f2f2f2, black);
  @include buttonTypeBordered('orange', #FF5C00);
  @include buttonTypeBordered('danger', #EB5757);
  @include buttonTypeBordered('dark', $black);
</style>
