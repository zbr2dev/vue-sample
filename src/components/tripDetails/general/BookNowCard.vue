<template>
  <section >
    <div class="car-other">
      <div class="car-other__section">
        <titled-section title="Airport pick-up">
          <airport-radio v-model="radio" />
        </titled-section>
      </div>

      <div class="car-other__section">
        <titled-section title="Special seats">
          <special-seats />
        </titled-section>
      </div>

      <div class="car-other__section">
        <titled-section title="Other services">
          <services />
        </titled-section>
      </div>
      <template v-if="showMainButtonsInsideCard">
        <div class="d-flex justify-space-between align-center">
          <span class="car-other__all-inclusive-text">All inclusive price</span>
          <span class="car-other__price">{{ this.$store.state.tripDetailsPage.currentPreparedTrip.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
          }) }}</span>
        </div>

        <div>
          <ui-button
            full-width
            type="orange-border"
            style="margin-top: 20px; margin-bottom: 8px;"
            @click="$emit('addToCart')"
          >
            Add to cart
          </ui-button>
          <ui-button
            type="orange"
            @click="$emit('goToBooking')"
            full-width
          >
            Book Now
          </ui-button>
        </div>
      </template>
    </div>

    <template v-if="!showMainButtonsInsideCard">
      <div class="d-flex justify-end align-center" style="margin-bottom: 23px; margin-top: 20px">
        <span class="car-other__all-inclusive-text">All inclusive price</span>
        <span class="car-other__price">$896.00</span>
      </div>

      <div style="display: grid; grid-auto-flow: column; grid-gap: 16px;">
        <ui-button
          type="orange-border"
          @click="$emit('addToCart')"
          full-width
        >
          Add to cart
        </ui-button>
        <ui-button
          type="orange"
          @click="$emit('goToBooking')"
          full-width
        >
          Book Now
        </ui-button>
      </div>
    </template>

  </section>
</template>

<script>
import TitledSection from '@/components/SearchPanel/tabs/TitledSection.vue';
import AirportRadio from '@/components/tripDetails/general/AirportRadio.vue';
import SpecialSeats from '@/components/SearchPanel/tabs/searchMore/SpecialSeats.vue';
import Services from '@/components/SearchPanel/tabs/searchMore/Services.vue';
import UiButton from '@/components/UI/UiButton.vue';

export default {
  name: 'BookNowCard',
  components: {
    UiButton,
    Services,
    SpecialSeats,
    AirportRadio,
    TitledSection,
  },
  data() {
    return {
      radio: null,
    };
  },
  computed: {
    showMainButtonsInsideCard() {
      return this.$vuetify.breakpoint.width > 1000;
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";

.car-other {
  border: 1px solid #D4D4D4;
  border-radius: 10px;
  padding: 20px 13px;
  align-self: baseline; //because of grid

  &__section {
    margin-bottom: 21px;
  }

  &__title {
    font-family: $Montserrat;
    font-size: 14px;
    color: $black;
    font-weight: 600;
    margin-bottom: 13px;
  }

  &__all-inclusive-text {
    font-weight: 600;
    font-size: 12px;
    margin-right: 14px;
  }

  &__price {
    font-size: 14px;
    color: #B62704;
    font-weight: 600;
  }
}
</style>
