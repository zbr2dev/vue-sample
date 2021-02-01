<template>
  <v-dialog class="dialog" v-bind="$attrs" :value="value" @input="$emit('input', $event)">
    <v-card class="dialog__card">
      <div class="dialog__loader-wrapper" v-if="loading">
        <v-progress-circular indeterminate  />
      </div>
      <div class="dialog__header">
        <div :class="['dialog__title', {
          'dialog__title--center': centerTitle
        }]">{{ label }}</div>

        <div class="dialog__close" @click="$emit('input', false)">
          <v-icon>mdi-close</v-icon>
        </div>
      </div>
      <slot></slot>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'UiDialog',
  props: {
    label: {
      type: String,
    },
    centerTitle: {
      type: Boolean,
      default: () => true,
    },
    value: {
      type: Boolean,
    },
    loading: {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";

  .dialog {
    position: relative;
    $card-padding: 24px;
    &__card {
      padding: $card-padding;
      position: relative;
    }

    &__header {
      display: flex;
    }

    &__title {
      color: $black;
      font-size: 16px;
      font-weight: 600;
      font-family: $Montserrat;
      line-height: 24px;

      &--center {
        margin: 0 auto;
      }
    }

    &__close {
      right: $card-padding;
      position: absolute;
      cursor: pointer;
    }

    &__loader-wrapper {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: rgba(0,0,0,0.2);
      z-index: 2;
    }
  }
</style>
