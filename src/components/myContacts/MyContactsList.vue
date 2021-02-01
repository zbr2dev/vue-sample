<template>
  <div>
    <my-contact-card
      style="margin-top: -1px"
      v-for="(user, index) in passengers"
      :key="index"
      :user="user"
      @detailsClick="$emit('detailsClick', $event)"
    />
  </div>
</template>

<script>

export default {
  name: 'MyPassengersCardList',
  components: { 'my-contact-card': () => import('./MyContactCard') },
  props: {
    passengers: {
      type: Array,
    },
  },
};
</script>

<style scoped>

</style>
