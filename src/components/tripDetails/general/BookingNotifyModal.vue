<template>
  <ui-dialog
    label="Notify,"
    class="notify"
    :value="value"
    width="500"
    @input="$emit('input', $event)"
  >
    <div class="notify__body">
      <div class="notify__content">
        the contents of the cart are not blocked and can be booked by another user at any time.
      </div>
      <div class="notify__checkbox-wrapper">
        <ui-checkbox label="Don`t show me again" v-model="dontShowMeAgain" fs14 />
      </div>

      <ui-button
        type="dark"
        class="notify__button"
        @click="gotIt"
      >
        Got it
      </ui-button>

    </div>
  </ui-dialog>
</template>

<script>
import UiDialog from '@/components/UI/UiDialog.vue';
import UiCheckbox from '@/components/UI/UiCheckbox.vue';
import UiButton from '@/components/UI/UiButton.vue';

export default {
  name: 'BookingNotifyModal',
  components: { UiButton, UiCheckbox, UiDialog },
  props: {
    value: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      dontShowMeAgain: false,
    };
  },
  methods: {
    gotIt() {
      this.$emit('gotIt', { dontShowMeAgain: this.dontShowMeAgain });
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";

  .notify {
    &__body {
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 16px;
      max-width: 300px;
    }

    &__content {
      font-family: $OpenSans;
      font-size: 14px;
    }

    &__checkbox-wrapper {
      margin: 18px 0 24px;
    }

    &__button {
      max-width: 170px;
      width: 100%;
    }
  }
</style>
