<template >
  <div class="contact__form">
          <div class="contact__form-block d-flex justify-space-between">
            <span class="contact__form-item__required">Name</span>
            <base-input
              v-model="name"
              class="contact__form-input"
              @blur="setFormData"
              :placeholder="'John Doe'"
              :field-name="'Name'"
              :error-state="!isNameValid" />
          </div>

          <div class="contact__form-block d-flex justify-space-between">
            <span class="contact__form-item">Phone number</span>
            <base-input
              v-model="phone"
              class="contact__form-input"
              @blur="setFormData"
              :placeholder="'+1 (319) 555-0115'" />
          </div>

          <div class="contact__form-block d-flex justify-space-between">
            <span class="contact__form-item">Email</span>
            <base-input
              v-model="email"
              class="contact__form-input"
              @blur="setFormData"
              :placeholder="'John.Doe@gmail.com'"
              :field-name="'Email'"
              :error-state="!isEmailValid"/>
          </div>
    </div>
</template>

<script>
import BaseInput from '@/components/UI/inputs/BaseInput.vue';

export default {
  name: 'IndividualForm',
  components: { BaseInput },
  data() {
    return {
      name: '',
      phone: null,
      email: '',
      isEmailValid: true,
      isNameValid: true,
    };
  },
  methods: {
    isValidPhoneNumber(phone) {
      const phoneRe = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
      const digits = phone.replace(/\D/g, '');
      return phoneRe.test(digits) || !phone;
    },

    isValidName(name) {
      this.isNameValid = name.length > 0;
      return name.length > 0;
    },

    isValidEmail(email) {
      const emailRe = /^$|^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.isEmailValid = emailRe.test(email);
      console.log('Validation going on');
      return emailRe.test(email) || !email;
    },

    setFormData() {
      // // console.log(this.email);
      // const isValidForm = this.isValidName(this.name);
      this.isValidEmail(this.email);
      this.isValidName(this.name);
      this.$emit('setFormData', {
        name: this.name,
        phone: this.phone ? this.phone : null,
        email: this.email,
      });
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/styles/variables.scss";
.contact {
  &__form-block:nth-child(2n) {
    margin: 15px 0;
  }

  &__form-item__required {
    position: relative;
    &::after {
      content: '•';
      color: #C7511F;
      position: absolute;
      right: -7px;
      top: -5px;
    }
  }

  &__block {
    width: 100%;
  }

  &__form-input {
    width: 300px;

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
}
</style>
