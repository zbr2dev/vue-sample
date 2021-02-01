<template>
  <div class="d-flex flex-column height">

    <SearchPanel v-if="$vuetify.breakpoint.width >= 900" />
    <SearchPanelMobile v-else />
    <!-- <blog-banner></blog-banner> -->

  </div>
</template>

<script>
// @ is an alias to /src
import SearchPanel from '../components/SearchPanel/SearchPanel.vue';
import SearchPanelMobile from '../components/SearchPanel/SearchPanelMobile.vue';

export default {
  name: 'Home',
  components: {
    SearchPanel,
    SearchPanelMobile,
  },
  created() {
    // todo: delete if do not need this.$router.replace({ query: {} });
  },
};
</script>

<style scoped>
.height {
  height: 100%;
  min-height: 40vh;
}
</style>
