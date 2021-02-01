<template>
  <search-tab-layout style="max-width: 678px">
    <div class="location">
      <enter-locations-list
        @changeWaypoints="$emit('changeWaypoints', $event)"
        :waypoints="waypoints"
        :map-result-status="mapResultStatus"
      />
      <div style="margin-left: 30px">
        <old-location-list />
      </div>
    </div>
  </search-tab-layout>
</template>

<script>
import EnterLocationsList from '@/components/SearchPanel/tabs/location/EnterLocationsList.vue';
import SearchTabLayout from '@/components/SearchPanel/desktop/other/SearchTabLayout.vue';
import OldLocationList from '@/components/SearchPanel/tabs/location/OldLocationList.vue';
import { mapResultStatusType } from '@/components/SearchPanel/props';

export default {
  name: 'SearchLocation',
  components: { OldLocationList, SearchTabLayout, EnterLocationsList },
  props: {
    waypoints: Array,
    mapResultStatus: mapResultStatusType,
  },
};
</script>

<style scoped lang="scss">
  .location {
    display: flex;
  }
</style>
