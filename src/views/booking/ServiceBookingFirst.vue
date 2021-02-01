<template>
  <booking-page-layout step-name="Contact information" step-number="1">
    <trips-list
      :bookings="currentBookings"
      @remove="handleRemoveTrexozCard"
      @update="updateBooking"
    />

    <booking-subtotal
      button-label="Next"
      :bookings-length="currentBookings.length"
      :booking-sum="sumBooking"
      @btnClick="handleNextClick"
    />
  </booking-page-layout>
</template>

<script>
import TripsList from '@/components/booking/step1/trip/TripsList.vue';
import bookingPageMixin from '@/views/booking/bookingPageMixin';
import BookingSubtotal from '@/components/booking/general/BookingSubtotal.vue';
import BookingPageLayout from '@/components/booking/general/BookingPageLayout.vue';

export default {
  name: 'ServiceBooking',
  mixins: [bookingPageMixin],
  components: { BookingPageLayout, BookingSubtotal, TripsList },
  mounted() {
    console.log('ss', this.currentBookings);
    console.log(this);
  },
  methods: {
    async handleNextClick() {
      await this.updateServerBookingData();
      if (this.$_isFromBookNow) {
        this.$router.push('/booking-2?bookNow');
      } else {
        this.$router.push('/booking-2');
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style>
