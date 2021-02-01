<template>
  <div>
    <div class="card">
      <div class="card__logo">
        <img class="card__logo-img--rounded" src="~@/assets/img/user.png" alt="User logo" />
      </div>

      <div class="card__content content">
        <div class="content__row">
          <div class="content__row-label">
            Passenger
          </div>
          <div class="card__bold-size">
            Simone P.
          </div>
        </div>

        <div class="content__row">
          <div class="content__row-label">
            Phone
          </div>
          <div>
            +1 (234) 567-8910
          </div>
        </div>
      </div>

      <div class="card__passengers-count" v-if="user.passengers" @click="triggerMyPassengersVisibility">
        <span>+ {{ user.passengers.length }} passengers</span>
        <v-icon color="black" :class="['card__arrow',
          {
            'card__arrow--opened': isMyPassengersVisible,
            'card__arrow--closed': !isMyPassengersVisible
          }
          ]"
        >mdi-chevron-left</v-icon>
      </div>

      <div class="card__leave-comment">
        <v-icon color="black">mdi-comment</v-icon>
      </div>

      <ui-button type="dark-border" style="margin-left: 19px; align-self: center">Details</ui-button>
  </div>

  <slide-up-down :active="Boolean(isMyPassengersVisible && user.passengers)">
    <my-passengers-card-list :passengers="user.passengers" />
  </slide-up-down>

  </div>
</template>

<script>
import MyPassengersCardList from '@/components/myTripsDetails/MyPassengersCardList.vue';
import SlideUpDown from 'vue-slide-up-down';
import UiButton from '@/components/UI/UiButton.vue';

export default {
  name: 'PassengerCard',
  components: { UiButton, MyPassengersCardList, SlideUpDown },
  props: {
    user: {
      type: Object,
    },
  },
  data() {
    return {
      isMyPassengersVisible: false,
    };
  },
  methods: {
    triggerMyPassengersVisibility() {
      this.isMyPassengersVisible = !this.isMyPassengersVisible;
    },
  },
};
</script>

<style scoped lang="scss">
@import "styles";
@import "~@/assets/styles/variables.scss";

.card {
  &__passengers-count {
    margin: 0 auto;
    align-self: center;

    font-family: $Montserrat;
    font-size: 14px;
    font-weight: 600;
    color: #333333;
    cursor: pointer;
  }

  &__arrow {
    &--closed {
      transform: rotate(-90deg);
    }
    &--opened {
      transform: rotate(90deg);
    }
  }
}
</style>
