<template>
  <div :class="['vehicle-type', {'vehicle-type--active': active}]" @click="$emit('click')">
    <div style="height: 43px; display: flex; align-items: center; justify-content: center">
      <slot></slot>
    </div>
    <span class="vehicle-type__name">{{carType}}</span>
    <passengers-and-luggage
      :luggage="luggage"
      :persons="persons"
      centered-icons class="vehicle-type__passengers-luggage"
    />
  </div>
</template>

<script>
import PassengersAndLuggage from '@/components/PassengersAndLuggage.vue';

export default {
  name: 'VehicleTypeItem',
  components: { PassengersAndLuggage },
  props: {
    persons: {
      type: Number,
      required: true,
    },
    luggage: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    carType: String,
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";

  .vehicle-type {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5px;
    box-sizing: border-box;
    border: 2px solid transparent;
    height: 100%;
    cursor: pointer;

    &--active {
      border: 2px solid $black;
      border-radius: 6px;
    }

    &__values {
      display: grid;
      grid-template-columns: max-content max-content;
      grid-gap: 10px;
      justify-content: center;
    }

    &__name {
      text-align: center;
      font-size: 12px;
      color: #141414;
    }

    &__value {
      display: flex;
    }

    &__passengers-luggage {
      margin-top: auto;
    }
  }
</style>
