<template>
  <div :class="['type', {'type--active': active}]">
    <div>
      <img src="~@/assets/img/cars/all-cars.svg" style="max-height: 45px;"/>
    </div>
    <p class="type__text">All types</p>
  </div>
</template>

<script>
export default {
  name: 'AllVehicleTypesItem',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
  @import "~@/assets/styles/variables";
  .type {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 8px;
    border: 2px solid transparent;
    box-sizing: border-box;

    &__text {
      font-size: 12px;
      font-weight: 600;
    }

    &--active {
      border: 2px solid $black;
      border-radius: 6px;
    }
  }
</style>
