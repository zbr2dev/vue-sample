<template>
  <div class="route-names">
    <location-item
      v-for="n in 5"
      :key="n"
      long-location="Tarasa Shevchenka street, Kyiv"
      location="Kyiv, Ukraine"
    />
  </div>
</template>

<script>
import LocationItem from '@/components/SearchPanel/tabs/location/LocationItem.vue';

export default {
  name: 'OldLocationList',
  components: { LocationItem },
};
</script>

<style scoped lang="scss">
.route-names {
  display: grid;
  grid-gap: 12px;
}
</style>
