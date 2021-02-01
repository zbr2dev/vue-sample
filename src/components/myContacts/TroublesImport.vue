<template>
  <div class="troubles">
    <div>
      <img
        class="pointer"
        src="~@/assets/img/arrow-left.svg"
        alt="Arrow left"
        @click="handleArrowLeftClick"/>
    </div>

    <div class="d-flex justify-center header">
      Have some troubles...
    </div>

    <section class="d-flex justify-center">
      <div class="flex-column">
        <p class="troubles__text">Out of 245 entries, you have uploaded:</p>
        <ul class="troubles__list">
          <li class="troubles__list-item"><DoneIcon/> 200 are successful While</li>
          <li class="troubles__list-item"><ErrorIcon/> 35 are entries are invalid &</li>
          <li class="troubles__list-item"><ErrorIcon/> 10 entries already exist in our system.</li>
        </ul>

        <a href="#" download class="troubles_import-link">Please click here to download the report file.</a>
      </div>
    </section>

    <div class="troubles__buttons d-flex justify-center">
      <ui-button type="dark-border" class="troubles__buttons-btn" @click="handleArrowLeftClick">Cancel</ui-button>
      <ui-button class="troubles__buttons-btn" @click="handleArrowLeftClick">Upload new file</ui-button>
    </div>
  </div>
</template>

<script>
import UiButton from '@/components/UI/UiButton.vue';
import ErrorIcon from '@/components/UI/icons/ErrorIcon.vue';
import DoneIcon from '@/components/UI/icons/DoneIcon.vue';

export default {
  name: 'TroublesImport',
  components: { UiButton, ErrorIcon, DoneIcon },
  methods: {
    handleArrowLeftClick() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/styles/variables.scss";

.v-label {
  color: black !important;
}

.pointer {
  text-align: right;
}

.theme--light.v-icon {
  color: black;
}
.v-input--selection-controls__input:hover {
  background: none;
}

.header {
  margin-top: -24px;
  font-weight: bold;
  font-size: 18px;
}

.troubles_import-link {
  color: #005FEE !important;
  text-decoration: none;
  font-size:  14px;
  font-weight: 600;
}

.troubles {
  background: #fff;
  padding: 10px;

  &__text {
    font-size: 14px;
    margin-top: 26px;
  }

  &__list {
    position: relative;
    font-size: 14px;
    margin: 15px 0 25px 0;

    &-item {
      list-style: none;
    }
  }

  &__buttons {
    margin-top: 50px;

    &-btn {
      width: 170px !important;
      font-size: 12px !important;
      margin: 15px;
    }
  }
}
</style>
