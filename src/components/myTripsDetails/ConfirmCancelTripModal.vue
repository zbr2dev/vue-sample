<template>
  <ui-dialog
    v-bind="$attrs"
    label="Cancel the trip?"
    width="440"
    @input="$emit('input', $event)"
  >
    <div class="modal">
      <div class="modal__text">
        If you cancel the trip now, someone else might book this car for your dates. Are you sure you want to cancel this trip?
      </div>

      <div class="modal__buttons">
        <ui-button type="danger-border" size="small" @click="$emit('cancel')">Yes, cancel</ui-button>
        <ui-button size="small" @click="$emit('input', false)">Back</ui-button>
      </div>
    </div>
  </ui-dialog>
</template>

<script>
import UiButton from '@/components/UI/UiButton.vue';
import UiDialog from '@/components/UI/UiDialog.vue';

export default {
  name: 'ConfirmCancelTripModal',
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
