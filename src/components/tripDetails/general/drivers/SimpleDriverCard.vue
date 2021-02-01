<template>
  <div :class="['card', { 'card--active': active }]">
    <div class="d-flex align-center justify-end flex-column" style="padding: 5px">
      <div>
        <img :src="driver.image.url || require('../../../../assets/img/cars/chevrolet-traverse.png')" class="card__img" alt="Driver"/>
      </div>
      <span class="card__driver-name">{{ driver.name }}</span>
      <ui-detailed-rating  :value="driver.rating" style="margin-bottom: 7px;"/>
    </div>
    <button :class="['card__button', {'card__button--active': active}]" @click.stop="handleButtonClick">
      <template v-if="active">
        <div>Cancel</div>
      </template>

      <template v-else >
        <span>
          Select
        </span>
      </template>
    </button>
  </div>
</template>

<script>
import UiDetailedRating from '@/components/UI/UiDetailedRating.vue';

export default {
  name: 'SimpleDriverCard',
  components: { UiDetailedRating },
  props: {
    driver: {
      type: Object,
    },
    active: {
      type: Boolean,
    },
  },
  methods: {
    handleButtonClick() {
      if (this.active) {
        this.$emit('cancel', this.driver);
      } else this.$emit('select', this.driver);
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";
$radius: 4px;

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding-top: 12px;
  border: 1px solid transparent;
  cursor: pointer;

  &--active, &:hover {
    border-radius: $radius;
    border-color: #d4d4d4;
  }

  &__img {
    $size: 60px;
    width: $size;
    height: $size;
    border-radius: 50%;
    object-fit: cover;
  }

  &__driver-name {
    font-size: 14px;
    font-weight: 600;
  }

  &__button {
    margin-top: auto;

    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    color: $black;
    font-size: 14px;
    font-weight: 600;
    width: calc(100% + 2px);
    margin-bottom: -1px;

    &--active {
      background: $black;
      color: white;
      border-bottom-left-radius: $radius;
      border-bottom-right-radius: $radius;
    }
  }
}
</style>
