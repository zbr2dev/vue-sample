<template>
  <div>
    <qww
      style="margin-top: -1px"
      v-for="(user, index) in passengers"
      :key="index"
      :user="user"
    />
  </div>
</template>

<script>

export default {
  name: 'MyPassengersCardList',
  components: { qww: () => import('./PassengerCard') },
  props: {
    passengers: {
      type: Array,
    },
  },
};
</script>

<style scoped>

</style>
