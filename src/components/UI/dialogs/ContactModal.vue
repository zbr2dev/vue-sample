<template>
  <div class="modal">
    <div class="modal__header">
      <span  class="modal__header-text">Passengers contacts</span>
      <img
        class="pointer"
        src="~@/assets/img/vector-cross.svg"
        alt="Cross"
        @click="$emit('showDisconnectModal', false)"
      />
    </div>

    <contacts/>

  </div>
</template>

<script>
import Contacts from '@/views/my/Contacts.vue';

export default {
  name: 'ContactModal',
  components: { Contacts },
};
</script>

<style scoped lang="scss">
.modal {
  display: flex;
  justify-content: space-between;
  padding: 10px;

  &__header-text {
    font-weight: bold;
  }
}
</style>
