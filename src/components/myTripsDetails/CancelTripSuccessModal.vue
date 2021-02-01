<template>
  <ui-dialog
    v-bind="$attrs"
    label="Success!"
    width="440"
    @input="$emit('input', $event)"
  >
    <div class="modal">
      <div class="modal__text">
        The trip had been canceled. You will receive a refund in accordance with the Provider’s cancellation policy as soon as possible.
      </div>

      <div class="modal__buttons">
        <ui-button type="dark-border" size="small" @click="$emit('input', false)">Cancel</ui-button>
        <ui-button size="small" @click="$emit('input', false)">Ok!</ui-button>
      </div>
    </div>
  </ui-dialog>
</template>

<script>
import UiButton from '@/components/UI/UiButton.vue';
import UiDialog from '@/components/UI/UiDialog.vue';

export default {
  name: 'CancelTripSuccessModal',
  components: { UiDialog, UiButton },
};
</script>

<style scoped lang="scss">
.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__text{
    margin-top: 16px;
    margin-bottom: 24px;
    text-align: center;
    font-size: 14px;
    line-height: 24px;
    max-width: 290px;
  }

  &__buttons {
    display: grid;
    align-items: center;
    grid-template-columns: minmax(110px, 120px) minmax(110px, 120px);
    grid-gap: 8px;
  }
}
</style>
