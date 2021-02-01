<template>
  <div class="booking">
    <div>
      <span class="booking__subtotal">
        Subtotal ({{bookingsLength}} items):
      </span>
      <span class="booking__price">
        {{ amountSum }}
      </span>
    </div>

    <ui-button
      type="orange"
      class="booking__button"
      @click="$emit('btnClick')"
    >
      {{ buttonLabel }}
    </ui-button>
  </div>
</template>

<script>
import UiButton from '@/components/UI/UiButton.vue';
import { formatNumberToAmount } from '@/utils/helpers';

export default {
  name: 'BookingSubtotal',
  components: { UiButton },
  props: {
    buttonLabel: {
      type: String,
      required: true,
    },
    bookingsLength: {
      type: Number,
      default: () => 0,
    },
    bookingSum: {
      type: Number,
      default: () => 0,
    },
  },
  computed: {
    amountSum() {
      return formatNumberToAmount(this.bookingSum);
    },
  },
};
</script>

<style scoped lang="scss">
.booking {
  margin-top: 38px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  &__price {
    font-size: 24px;
    font-weight: 800;
    color: #B62704;
  }

  &__subtotal {
    font-size: 16px;
    font-weight: 600;
  }

  &__button {
    margin-top: 24px;
  }
}
</style>
