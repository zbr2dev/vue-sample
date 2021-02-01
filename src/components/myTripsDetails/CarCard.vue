<template>
  <div class="card">
    <div class="card__logo">
      <img
        class="card__logo-img"
        :src="vehicle.images.length && vehicle.images[0].url"
        alt="Vehicle img"
      />
    </div>

    <div class="card__content content">
      <div class="content__row">
        <div class="content__row-label">
          Vehicle
        </div>
        <div class="card__bold-size">
          {{ vehicle.typeName }}
        </div>
      </div>

      <div class="content__row">
        <div class="content__row-label">
          Number
        </div>
        <div>
          {{ vehicle.model }} {{vehicle.year}}
        </div>
      </div>

      <div class="content__row">
        <div class="content__row-label">
          Rating
        </div>
        <div>
          <ui-detailed-rating :value="vehicle.rating" />
        </div>
      </div>
    </div>

    <div class="card__leave-comment">
      <v-icon color="black">mdi-comment</v-icon>
    </div>

  </div>
</template>

<script>
import UiDetailedRating from '@/components/UI/UiDetailedRating.vue';

export default {
  name: 'CarCard',
  components: { UiDetailedRating },
  props: {
    vehicle: {
      type: Object,
    },
  },
};
</script>

<style scoped lang="scss">
  @import "styles.scss";
</style>
