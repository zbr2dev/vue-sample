<template>
  <booking-page-layout step-name="Payment Details" step-number="2">
    <trips-list
      :bookings="currentBookings"
      @updateBooking="handleUpdateBooking"
      @remove="handleRemoveTrexozCard"
    />
    <div class="payment">
      <h3 class="payment__title">Select payment method</h3>

      <div class="payment__subtitle">Credit card / debit card</div>
      <credit-card-list :cards="cards" />

      <div class="payment__subtitle">Or add new card:</div>
      <credit-card-form />
    </div>

    <booking-subtotal
      button-label="Submit and pay"
      :bookings-length="currentBookings.length"
      :booking-sum="sumBooking"
      @btnClick="handleNext"
    />
  </booking-page-layout>
</template>

<script>
import TripsList from '@/components/booking/step2/trip/TripsList.vue';
import bookingPageMixin from '@/views/booking/bookingPageMixin';
import BookingPageLayout from '@/components/booking/general/BookingPageLayout.vue';
import CreditCardList from '@/components/booking/step2/payments/CreditCardList.vue';
// eslint-disable-next-line import/extensions
import BookingSubtotal from '@/components/booking/general/BookingSubtotal.vue';
import CreditCardForm from '@/components/forms/CreditCardForm.vue';
import tripApi from '@/api/trexoz/TripApi';
import { REMOVE_ALL_BOOKINGS } from '@/store/modules/booking/constants';

export default {
  name: 'ServiceBookingSecond',
  mixins: [bookingPageMixin],
  components: {
    CreditCardForm,
    BookingSubtotal,
    CreditCardList,
    BookingPageLayout,
    TripsList,
  },
  data() {
    return {
      cards: Array(3).fill({ number: '4767 3482 2738 2891' }),
    };
  },
  methods: {
    handleUpdateBooking(booking) {
      console.log(booking);
    },
    async handleNext() {
      const q = this[this.currentStateVariable].map((booking) => tripApi.attemptToBook(booking.id));
      await Promise.all(q);
      this.$store.commit(`booking/${REMOVE_ALL_BOOKINGS}`, { stateVar: this.currentStateVariable });
      this.$router.push('/my-trips');
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";

.payment {
  max-width: 440px;
  margin: 0 auto;
  &__title, &__subtitle {
    font-family: $Montserrat;
    font-weight: 600;
  }

  &__title {
    font-size: 24px;
    line-height: 24px;
    margin: 32px 0 16px;
  }

  &__subtitle {
    font-size: 12px;
    margin: 12px 0;
    line-height: 20px;
  }

  &__card-fields {
    display: grid;
    grid-gap: 16px;
  }

  &__card-number-section {
    margin-top: 12px;
    display: grid;
    grid-template-columns: 232px 88px 88px;
    grid-gap: 16px;
  }
}
</style>
