<template>
  <confirm-something-dialog
    v-bind="$attrs"
    label="Disconnect contact"
    description="Are you sure want to disconnect this contact?"
    @input="$emit('input', $event)"
    @yes="$emit('yes')"
  />
</template>

<script>
import ConfirmSomethingDialog from '@/components/UI/dialogs/ConfirmSomethingDialog.vue';

export default {
  name: 'ConfirmDisconnectContactModal',
  components: { ConfirmSomethingDialog },
};
</script>
