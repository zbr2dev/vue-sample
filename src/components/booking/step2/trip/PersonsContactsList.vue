<template>
  <div class="persons-list">
    <person-contact-list-item
      v-for="(person, index) in persons"
      :person="person"
      :key="index"
    />
  </div>
</template>

<script>
import PersonContactListItem from '@/components/booking/step2/trip/PersonContactListItem.vue';

export default {
  name: 'PersonsContactsList',
  components: { PersonContactListItem },
  props: {
    persons: {
      type: Array,
    },
  },
};
</script>

<style scoped lang="scss">
  .persons-list {
    display: grid;
    grid-gap: 4px;
  }
</style>
