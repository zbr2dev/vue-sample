<template>
  <div class="card">

    <div class="card__driver driver" v-if="driver">
      <div class="driver__img-wrapper">
        <img :src="driver && driver.image && driver.image.url" class="driver__img"/>
      </div>
      <div class="driver__info">
        <div class="driver__name">Driver name</div>
        <ui-detailed-rating :value="driver.rating" />
      </div>
    </div>

    <div class="card__vehicle vehicle">

      <img :src="vehicle.images[0].url" class="vehicle__img"/>

      <div class="vehicle__name">
        {{ vehicleName }}
      </div>

      <div class="vehicle__other">
        <div style="margin-right: 5px;">CSI5 NET</div>
        <ui-detailed-rating :value="vehicle.rating" />
      </div>
    </div>

    <div class="card__remove" @click="$emit('remove')" v-if="showRemoveBtn">
      <v-icon class="card__remove-icon">mdi-delete</v-icon>
      <span class="card__remove-text">Remove</span>
    </div>
  </div>
</template>

<script>
import UiDetailedRating from '@/components/UI/UiDetailedRating.vue';
import { getVehicleFullName } from '@/utils/helpers';

export default {
  name: 'CarAndDriver',
  components: { UiDetailedRating },
  props: {
    driver: {
      type: [Object],
    },
    vehicle: {
      type: Object,
    },
    showRemoveBtn: {
      type: Boolean,
      default: () => true,
    },
  },
  computed: {
    vehicleName() {
      return getVehicleFullName(this.vehicle);
    },
  },
};
</script>

<style scoped lang="scss">
@mixin smallBoldName {
  font-family: $OpenSans;
  font-size: 14px;
  color: black;
  font-weight: 700;
}

@import "~@/assets/styles/variables.scss";

  .card {
    &__driver {
      display: flex;
    }

    &__remove {
      margin-top: 20px;
      cursor: pointer;
      display: flex;
      &:first-child {
        margin-right: 10px;
      }
    }

    &__remove-icon {
      color: black;
      font-size: 16px;
    }

    &__remove-text {
      font-size: 12px;
      color: $black;
      font-weight: 600;
    }
  }

  .driver {
    position: relative;
    z-index: 2;
    margin-bottom: -10px;

    &__img-wrapper {
      $size: 64px;
      width: $size;
      height: $size;
      border-radius: 50%;
      border: 2px solid white;
      box-sizing: border-box;
    }

    &__info {
      margin-left: 8px;
    }

    &__img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    &__name {
      @include smallBoldName;
    }
  }

  .vehicle {
    &__img {
      height: 166px;
      width: auto;
      object-fit: cover;
    }

    &__name {
      @include smallBoldName;
    }

    &__other {
      display: flex;
    }
  }
</style>
