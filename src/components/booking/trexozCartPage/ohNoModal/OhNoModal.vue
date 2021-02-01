<template>
  <ui-dialog
    label="Oh, no!"
    :value="value"
    width="600"
    @input="$emit('input', $event)"
  >
    <div class="modal">
      <div class="modal__text">
        1 of your trip vehicles and 1 chauffeur were booked by another user. Would you like to continue booking the trip you have left?
      </div>

      <div class="modal__list">
        <trips-list :bookings="bookings"/>
      </div>

      <div class="d-flex flex-column align-center">
<!--        <ui-button type="white">-->
<!--          <div>-->
<!--            <v-icon color="black" style="margin-right: 5px">mdi-refresh</v-icon>-->
<!--            <span>Refresh</span>-->
<!--          </div>-->
<!--        </ui-button>-->
        <ui-button type="dark" @click="$emit('continueBooking')">
          Continue booking ({{ bookings.length }})
        </ui-button>

        <div class="modal__attention">
          Attention: when proceeding to booking, all unavailable items
          will be removed from the order
        </div>
      </div>

    </div>
  </ui-dialog>
</template>

<script>
import UiDialog from '@/components/UI/UiDialog.vue';
import UiButton from '@/components/UI/UiButton.vue';
import TripsList from './TripsList.vue';

export default {
  name: 'OhNoModal',
  props: {
    value: Boolean,
    bookings: Array,
  },
  components: { TripsList, UiButton, UiDialog },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";

  .modal__text {
    margin-top: 16px;
    text-align: center;
    font-size: 14px;
    line-height: 18px;
  }

  .modal {
    &__list {
      max-height: 260px;
      margin-top: 24px;
      margin-bottom: 14px;
      overflow-y: scroll;
      @include scrollbar;
    }

    &__attention {
      margin-top: 16px;
      font-size: 14px;
      max-width: 400px;
      text-align: center;
      color: #7E7E7E;
    }
  }
</style>
