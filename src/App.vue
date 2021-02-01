<template>
  <v-app>
    <!-- <v-app-bar app color="primary" dark> </v-app-bar> -->
    <router-view v-if="$route.path === '/callback'"></router-view>
    <v-main class="main-content" v-else>
      <home-layout />
    </v-main>
  </v-app>
</template>

<script>
import HomeLayout from '@/components/HomeLayout.vue';
import { getAllBookings } from '@/store/modules/booking/constants';

export default {
  name: 'App',

  components: { HomeLayout },

  data: () => ({}),
  methods: {
    checkAuth() {
      if (this.$mainOidc) {
        this.$mainOidc.getUser().then((result) => {
          // todo: make logout mutation
          this.$store.dispatch('auth/checkUserStatus', result);
          if (result) { this.$store.dispatch(`booking/${getAllBookings}`); }
        });
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (!this.$root.callbackLoading) {
        this.checkAuth();
      }
    });
  },
};
</script>

<style>
.main-content {
  min-height: 70vh;
}
</style>
