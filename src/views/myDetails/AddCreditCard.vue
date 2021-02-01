<template>
  <div class="card">
    <div>
      <img
        class="pointer"
        src="~@/assets/img/arrow-left.svg"
        alt="Arrow left"
        @click="showAddCreditCard"
      />
    </div>

    <div class="d-flex justify-center header">
      Adding new card
    </div>

    <section class="card__main main d-flex justify-center">
      <div class="d-flex flex-column card__block justify-center">
        <div class="card__form">
          <div class="card__form-block d-flex justify-space-between">
            <span class="card__form-item">Card number</span>
            <base-input
              v-model="cardNumber"
              class="card__form-input"
              :placeholder="'XXXX XXXX XXXX XXXX'" />
          </div>

          <div class="card__form-block d-flex justify-space-between">
            <span class="card__form-item">Cardholder</span>
            <base-input
              v-model="cardholder"
              class="card__form-input"
              :placeholder="'John Doe'" />
          </div>

          <div class="card__form-block d-flex justify-space-between">
            <div>
              <span class="card__form-item">Expiry date</span>
              <base-input
                v-model="expiryDate"
                class="card__form-input-code"
                :placeholder="'MM / YY'" />
            </div>

            <div>
              <span class="card__form-item">CVV-code</span>
              <base-input
                v-model="cvvCode"
                class="card__form-input-code"
                :placeholder="'XXX'" />
            </div>
          </div>

          <div>
            <v-checkbox
              v-model="checkbox"
              :label="'Set as default'"
              color="black"
            ></v-checkbox>
          </div>

          <div class="card__form-block d-flex justify-space-between">
            <span class="card__form-item">Notes </span>
            <base-textarea
              v-model="notes"
              class="card__form-input"
              :maxLength="140"
              :placeholder="'Text'" />
          </div>
        </div>
        <div class="card__buttons d-flex justify-space-around">
          <ui-button type="dark-border" class="card__buttons-btn" @click="showAddCreditCard">Cancel</ui-button>
          <ui-button class="card__buttons-btn" @click="() => { }">Add</ui-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import UiButton from '@/components/UI/UiButton.vue';
import BaseTextarea from '@/components/UI/inputs/BaseTextarea.vue';
import BaseInput from '@/components/UI/inputs/BaseInput.vue';

export default {
  name: 'AddCreditCard',
  components: {
    UiButton, BaseTextarea, BaseInput,
  },
  props: {
    isOpen: {
      type: Boolean,
    },
    place: [String, Boolean],
  },
  data() {
    return {
      checkbox: false,
      cardNumber: '',
      cardholder: '',
      expiryDate: '',
      cvvCode: '',
      isDefault: false,
      notes: '',
    };
  },
  methods: {
    showAddCreditCard() {
      this.$emit('showAddCreditCard');
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/styles/variables.scss";
.card {
  &__main {
    margin-top: 20px;
  }

  &__form {
    width: 430px;
  }

  &__form-block:nth-child(2n) {
    margin: 15px 0;
  }

  &__block {
    margin-top: 20px;
  }

  &__form-input {
    width: 320px;

    &-code {
      margin-left: 27px;
      width: 100px;

      .base-input__input{
      border: 1px solid black;
      }
    }

    .base-input__body {
      border: 1px solid black;
      border-radius: 4px;
    }

    .base-input__input{
      &:focus {
        border: none;
      }
    }
  }

  &__buttons-btn {
    width: 170px !important;
  }
}
</style>
