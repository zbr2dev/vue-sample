<template>
  <div class="card">
    <div class="card__logo">
      <img
        class="card__logo-img--rounded"
        src="~@/assets/img/driver.jpg"
        alt="Driver img"
      />
    </div>

    <div class="card__content content">
      <div class="content__row">
        <div class="content__row-label">
          Chauffeur
        </div>
        <div class="card__bold-size">
          Some strange name
        </div>
      </div>

      <div class="content__row">
        <div class="content__row-label">
          Rating
        </div>
        <div>
          <ui-detailed-rating :value="300" />
        </div>
      </div>

      <div class="content__row">
        <div class="content__row-label">
          Number
        </div>
        <div>
          +380 97 34 22 433
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
  name: 'DriverCard',
  components: { UiDetailedRating },
  props: {
    driver: {
      type: Object,
    },
  },
};
</script>

<style scoped lang="scss">
@import "styles.scss";
</style>
