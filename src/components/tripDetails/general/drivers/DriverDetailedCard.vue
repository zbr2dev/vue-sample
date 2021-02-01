<template>
  <div class="card">
    <div class="card__header">
      <span class="card__user-name">{{ driver.name }}</span>
      <v-icon @click="$emit('close')">mdi-close</v-icon>
    </div>

    <div class="card__job">Chauffeur</div>

    <div class="d-flex align-center">
      <ui-detailed-rating :value="driver.rating"/>
      <div style="margin-left: 12px;">On time
        <span style="font-weight: 700">97%</span>
      </div>
    </div>

    <div class="card__description">
      {{ driver.about }}
    </div>

    <div class="card__rows">
      <div style="display: grid; grid-gap: 10px; grid-template-rows: max-content">
        <div class="card__row simple-row">
          <span class="simple-row__name">Elementum</span>
          <span class="simple-row__value">Various</span>
        </div>
        <div class="card__row simple-row">
          <span class="simple-row__name">Card</span>
          <span class="simple-row__value">Bla cla some info</span>
        </div>
        <div class="card__row simple-row">
          <span class="simple-row__name">Other</span>
          <span class="simple-row__value">Bla cla car</span>
        </div>
      </div>

      <div style="display: grid; grid-gap: 10px; grid-template-rows: max-content">
        <div class="card__row simple-row">
          Documents verified
        </div>
        <div class="card__row simple-row">
          Help me
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import UiDetailedRating from '@/components/UI/UiDetailedRating.vue';

export default {
  name: 'DriverDetailedCard',
  components: { UiDetailedRating },
  props: {
    driver: {
      type: Object,
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";
.card {
  padding: 24px 16px;
  border: 1px solid #D4D4D4;
  border-radius: 4px;

  &__header {
    display: grid;
    grid-template-columns: 1fr 22px;
    justify-content: space-between;
    align-items: center;
  }

  &__user-name {
    font-family: $Montserrat;
    font-size: 18px;
    font-weight: 600;
    color: $black;
  }

  &__job {
    font-size: 14px;
    margin-bottom: 10px;
  }

  &__description {
    font-size: 14px;
    line-height: 24px;
    margin-top: 12px;
    margin-bottom: 20px;
  }

  &__rows {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

.bold {
  font-weight: 700;
}

.simple-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 24px;
  font-size: 14px;

  &__value {
    font-weight: 700;
  }
}

</style>
