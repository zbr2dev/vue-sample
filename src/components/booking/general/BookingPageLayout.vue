<template>
  <div class="card-layout">
    <h1 class="card-layout__header">{{ header }}</h1>
    <div class="card-layout__step" v-if="showStep">
      <span class="card-layout__step-number">Step {{stepNumber}} • </span>
      <span class="card-layout__step-name">{{stepName}}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BookingPageLayout',
  props: {
    stepNumber: {
      type: [Number, String],
      required: false,
    },
    stepName: {
      type: String,
      required: false,
    },
    showStep: {
      type: Boolean,
      default: () => true,
    },
    header: {
      type: String,
      default: () => 'Service booking',
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";

.card-layout {
  padding: 24px 30px;

  &__header {
    color: $black;
    font-size: 24px;
    font-weight: 800;
  }

  &__step {
    margin-top: 16px;
    display: flex;
    font-family: $Montserrat;
    font-size: 18px;
    font-weight: 600;
  }

  &__step-number {
    color: #141414;
  }

  &__step-name {
    margin-left: 4px;
    color: #7E7E7E;
  }
}
</style>
