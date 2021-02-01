<template>
  <div class="d-flex flex-column height" style="min-height: 100vh;height: 100%">
    <Header />
    <router-view class="main-content"/>
    <Footer style="margin-top: auto"></Footer>
  </div>
</template>

<script>
import Header from './Header.vue';
import Footer from './Footer.vue';

export default {
  name: 'HomeLayout',
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
.main-content {
  min-height: 70vh;
}
</style>
