<template>
  <ui-dialog
    v-bind="$attrs"
    :label="label"
    :width="width"
    @input="$emit('input', $event)"
  >
    <div class="modal">
      <div class="modal__text">
        {{ description }}
      </div>

      <div class="modal__buttons">
        <ui-button type="dark-border" size="small" @click="$emit('input', false)">No</ui-button>
        <ui-button size="small" @click="$emit('yes')">Yes</ui-button>
      </div>
    </div>
  </ui-dialog>
</template>

<script>
import UiButton from '@/components/UI/UiButton.vue';
import UiDialog from '@/components/UI/UiDialog.vue';

export default {
  name: 'ConfirmSomethingDialog',
  components: { UiDialog, UiButton },
  props: {
    label: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    width: {
      type: [Number, String],
      default: () => 440,
    },
  },
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
