<template>
  <div class="cart-item">
    <car-and-driver
      :driver="booking.driver"
      :vehicle="booking.vehicle"
      @remove="$emit('remove')"
    />

    <section style="margin-left: 80px; max-width: 440px">
      <trip-details-block
        :trip-details="booking"
        class="cart-item__details"
      />

      <section class="section" style="margin: 16px 0">
        <div class="section__header">Comments</div>
        <div class="section__text">
          Tellus ultrices habitant varius quis laoreet sollicitudin ut fusce netus. Donec dignissim cras ut sit dignissim morbi.
        </div>
      </section>

      <payment-cancellation-more class="cart-item__payment-cancellation" />
    </section>

    <section class="humans" style="min-width: 220px;margin-left: 24px">
      <div class="humans__contacts">
        <div class="humans__title">Passengers({{persons.length}})</div>
        <div class="humans__count">13 contacts added</div>
        <persons-contacts-list :persons="persons" style="margin-top: 8px" />
      </div>

      <div class="humans__contacts" style="margin-top: 24px">
        <div class="humans__title">Observers({{ observers.length }})</div>
        <persons-contacts-list :persons="observers" />
      </div>
    </section>

    <section class="preferences" style="margin-left: 60px">
      <div class="f-14 f-bold mbt-12">Preferences</div>
      <div class="preferences__subtitle">Temperature</div>
      <div class="preferences__content">Cool, 72</div>

      <div class="preferences__subtitle">Conversation</div>
      <div class="preferences__content">I like talk</div>
    </section>

    <trip-total-price :price="booking.price" style="margin-left: auto"/>
  </div>
</template>

<script>
import CarAndDriver from '@/components/booking/general/CarAndDriver.vue';
import TripDetailsBlock from '@/components/booking/general/TripDetailsBlock.vue';
import TripTotalPrice from '@/components/booking/general/TripTotalPrice.vue';
import PaymentCancellationMore from '@/components/tripDetails/general/PaymentCancellationMore.vue';
import PersonsContactsList from '@/components/booking/step2/trip/PersonsContactsList.vue';

export default {
  name: 'TripListItem',
  components: {
    PersonsContactsList,
    PaymentCancellationMore,
    TripTotalPrice,
    TripDetailsBlock,
    CarAndDriver,
  },
  props: {
    booking: Object,
  },
  data() {
    return {
      persons: Array(10).fill(
        {
          name: 'Elvis Presley',
          phone: ' +1 (234) 567 8901',
        },
      ),
    };
  },
  computed: {
    observers() {
      return this.persons.slice(1, 5);
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";

.f-14 {
  font-size: 14px;
}

.f-bold {
  font-weight: 600;
}

.mbt-12 {
  margin-bottom: 12px;
}

.cart-item {
  display: flex;
  &__comment {
    width: 100%;
    margin-top: 16px;
  }

  &::v-deep .inform__header {
    font-size: 14px;
    margin-bottom: 4px;
    font-family: $OpenSans;
  }
}

.section {
  font-size: 14px;
  &__header {
    font-family: $OpenSans;
    font-weight: 600;
    margin-bottom: 4px;
  }
}

.humans {
  &__title {
    font-family: $Montserrat;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 12px;
  }

  &__count {
    font-size: 12px;
    color: #7e7e7e;
  }
}

.preferences {
  &__subtitle {
    font-size: 12px;
    font-weight: 600;
    color: $black;
    line-height: 20px;
    margin-bottom: 4px;
  }

  &__content {
    font-family: $OpenSans;
    font-size: 14px;
    margin-bottom: 12px;
  }
}
</style>
