<template>
  <gmap-map
    :center="waypoints.length ? waypoints[0] : michiganCoordinates"
    :zoom="7"
    :options="{
      streetViewControl: false,
      scaleControl: true,
      mapTypeControl: false,
      disableDefaultUI : true
    }"
  >
    <GmapMarker
      v-if="waypoints.length === 1"
      :position="waypoints[0]"
    />
    <direction-renderer
      :path="waypoints"
      @pathLoaded="$emit('pathLoaded', $event)"
      @zeroDirectionResults="$emit('zeroDirectionResults', $event)"
    />
  </gmap-map>
</template>

<script>
import DirectionRenderer from '@/components/UI/googleMap/DirectionRenderer';
import { michiganCoordinates } from '@/utils/constants';

export default {
  name: 'GoogleMapDirection',
  props: {
    waypoints: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    DirectionRenderer,
  },
  data() {
    return {
      michiganCoordinates,
    };
  },
};
</script>
