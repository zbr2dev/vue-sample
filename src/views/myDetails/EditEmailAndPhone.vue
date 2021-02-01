<template>
  <div class="profile">
    <div>
      <img
        class="pointer"
        src="~@/assets/img/arrow-left.svg"
        alt="Arrow left"
        @click="showEditEmailAndPhone"
      />
    </div>

    <div class="d-flex justify-center header">
      Edit Email And Phone
    </div>

    <section class="profile__main main d-flex justify-center">
      <div class="d-flex flex-column card__block justify-center">
        <div class="profile__form">
          <div class="profile__form-block d-flex justify-space-between">
            <span class="profile__form-item">Name</span>
            <base-input
              v-model="newName"
              class="profile__form-input"
              :placeholder="'Joe Doe'" />
          </div>

          <div class="profile__form-block d-flex justify-space-between">
            <span class="profile__form-item">Phone</span>
            <base-input
              v-model="newPhone"
              class="profile__form-input"
              :placeholder="'1-541-754-3010'" />
          </div>

          <div class="profile__form-block d-flex justify-space-between">
            <span class="profile__form-item">Email</span>
            <base-input
              v-model="newEmail"
              class="profile__form-input"
              :placeholder="'john.doe@gmail.com'" />
          </div>
        </div>
        <div class="profile__buttons d-flex justify-space-around">
          <ui-button type="dark-border" class="profile__buttons-btn" @click="showEditEmailAndPhone">Cancel</ui-button>
          <ui-button class="profile__buttons-btn" @click="onChangeEmailAndPhone">Confirm</ui-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import UiButton from '@/components/UI/UiButton.vue';
import BaseInput from '@/components/UI/inputs/BaseInput.vue';

export default {
  name: 'AddCreditCard',
  components: {
    UiButton, BaseInput,
  },
  props: {
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  data() {
    return {
      newName: '',
      newEmail: '',
      newPhone: '',
    };
  },
  methods: {
    onChangeEmailAndPhone() {
      this.$emit('onChangeEmailAndPhone', {
        name: this.newName || this.name,
        email: this.newEmail || this.email,
        phone: this.newPhone || this.phone,
      });
      this.newEmail = '';
      this.newName = '';
      this.newPhone = '';
    },
    showEditEmailAndPhone() {
      this.$emit('showEditEmailAndPhone');
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/styles/variables.scss";
.profile {
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

  &__buttons {
    margin-top: 20px !important;
  }

  &__buttons-btn {
    width: 170px !important;
  }
}
</style>
