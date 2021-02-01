<template >
  <div class="contact__form">
          <div class="contact__form-block d-flex justify-space-between">
            <span>Group name</span>
            <base-input
              v-bind="$attrs"
              v-model="group"
              class="contact__form-input"
              @input="$emit('input', $event)"
              :placeholder="'Group 1'" />
          </div>
    </div>
</template>

<script>
import BaseInput from '@/components/UI/inputs/BaseInput.vue';

export default {
  name: 'GroupForm',
  components: { BaseInput },
  data() {
    return {
      group: '',
    };
  },
  methods: {},
};
</script>

<style lang="scss">
@import "~@/assets/styles/variables.scss";
.contact {
  &__form-block:nth-child(2n) {
    margin: 15px 0;
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
