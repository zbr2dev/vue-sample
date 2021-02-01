<template>
  <div class="cart-item">
    <car-and-driver
      :driver="booking.driver"
      :vehicle="booking.vehicle"
      @remove="$emit('remove')"
    />

    <section style="margin-left: 80px; max-width: 340px">
      <trip-details-block
        :trip-details="booking"
        class="cart-item__details"
      />

      <base-textarea
        v-model="notes"
        label="Comment"
        :max-length="280"
        class="cart-item__comment"
      />
    </section>

    <section class="block">
      <div class="block__title">Passengers (3)</div>
      <passengers-radio v-model="passengersRadio" />

      <div class="block__user-name">Anastasia S.</div>
      <div class="block__add-passenger">
        <v-icon size="18" color="black">mdi-plus-circle</v-icon>
        <span style="margin-left: 5px">Add passenger</span>
      </div>
    </section>

    <section class="section" style="margin-left: 100px">
      <div class="block__title">Preferences</div>

      <div class="block__subtitle">Temperature</div>
      <temperature-radio v-model="temperature">
        <template v-slot:cool>
          <div class="block__temperature-input-wrapper">
            <temperature-input v-model="temperatureDegrees"/>
          </div>
        </template>
      </temperature-radio>

      <div class="block__subtitle">Conversation</div>
      <conversation-radio v-model="conversationRadio" />

      <div class="block__subtitle">Others</div>
      <ui-checkbox v-model="others" label="Move passenger seat forward" />
    </section>

    <trip-total-price :price="booking.price" style="margin-left: auto"/>
  </div>
</template>

<script>
import CarAndDriver from '@/components/booking/general/CarAndDriver.vue';
import TripDetailsBlock from '@/components/booking/general/TripDetailsBlock.vue';
import PassengersRadio from '@/components/booking/step1/trip/PassengersRadio.vue';
import ConversationRadio from '@/components/booking/step1/trip/ConversationRadio.vue';
import UiCheckbox from '@/components/UI/UiCheckbox.vue';
import TemperatureRadio from '@/components/booking/step1/trip/TemperatureRadio.vue';
import TripTotalPrice from '@/components/booking/general/TripTotalPrice.vue';
import TemperatureInput from '@/components/UI/inputs/TemperatureInput.vue';
import BaseTextarea from '@/components/UI/inputs/BaseTextarea.vue';

export default {
  name: 'TripListItem',
  components: {
    BaseTextarea,
    TemperatureInput,
    TripTotalPrice,
    TemperatureRadio,
    UiCheckbox,
    ConversationRadio,
    PassengersRadio,
    TripDetailsBlock,
    CarAndDriver,
  },
  props: {
    booking: Object,
  },
  data() {
    return {
      passengersRadio: 'a',
      conversationRadio: 'a',
      others: false,
      temperature: 'c',
      temperatureDegrees: 78,
      notes: '',
    };
  },
  methods: {
    changeBooking(propName, value) {
      this.$emit('update', { ...this.booking, [propName]: value });
    },
  },
  watch: {
    notes(newValue) {
      this.changeBooking('notes', newValue);
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";

  .cart-item {
    display: flex;
    &__comment {
      width: 100%;
      margin-top: 16px;
    }
  }

  .block {
    &__title {
      font-family: $Montserrat;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 13px;
    }

    &__subtitle {
      font-family: $Montserrat;
      font-size: 12px;
      font-weight: 600;
      margin: 17px 0 10px;
    }

    &__user-name {
      font-size: 14px;
      font-weight: 600;
      margin: 14px 0;
    }

    &__add-passenger {
      color: black;
      font-size: 12px;
      font-weight: 600;
    }

    &__temperature-input-wrapper {
      position: absolute;
      width: 90px;
      top: -5px;
    }
  }
</style>
