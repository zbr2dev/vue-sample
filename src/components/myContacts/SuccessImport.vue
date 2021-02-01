<template>
  <div class="success__import">
    <div>
      <img
        class="pointer"
        src="~@/assets/img/arrow-left.svg"
        alt="Arrow left"
        @click="handleArrowLeftClick"/>
    </div>

    <div class="d-flex justify-center header">
      Success!
    </div>

    <section class="d-flex justify-center">
      <div class="flex-column">
        <div class="d-flex justify-center">
          <done-icon class="success__import-icon" />
        </div>
        <p class="success__import-text">245 new contacts successfully added to your Contacts</p>
      </div>
    </section>

    <div class="success__import__buttons d-flex justify-center">
      <ui-button class="success__import__buttons-btn" @click="handleGoItClick">Got it!</ui-button>
    </div>
  </div>
</template>

<script>
import UiButton from '@/components/UI/UiButton.vue';
import DoneIcon from '@/components/UI/icons/DoneIcon.vue';

export default {
  name: 'SuccessImport',
  components: { UiButton, DoneIcon },
  methods: {
    handleArrowLeftClick() {
      this.$router.back();
    },

    handleGoItClick() {
      this.$router.push('/my-contacts');
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/styles/variables.scss";

.pointer {
  text-align: right;
}

.header {
  margin-top: -24px;
  font-weight: bold;
  font-size: 18px;
}

.success__import {
  background: #fff;
  padding: 10px;

  &-icon {
    width: 40px;
    height: 40px;
    margin-top: 50px;
  }

  &-text {
    font-size: 14px;
    margin-top: 26px;
    width: 240px;
    text-align: center;
  }

  &__buttons {
    margin-top: 32px;

    &-btn {
      width: 170px !important;
      font-size: 12px !important;
      margin: 15px;
    }
  }
}

</style>
