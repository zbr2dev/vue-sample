import { MapElementFactory } from 'vue2-google-maps';

// https://stackoverflow.com/questions/62995470/draw-route-between-two-points-in-vue
// https://developers.google.com/maps/documentation/javascript/examples/directions-waypoints#maps_directions_waypoints-javascript
// https://codesandbox.io/s/stoic-sun-qnxo6?file=/src/components/DirectionsRenderer.js
export default MapElementFactory({
  name: 'directionsRenderer',

  ctr() {
    return window.google.maps.DirectionsRenderer;
  },

  events: [],

  mappedProps: {},

  props: {
    origin: { type: Object },
    destination: { type: Object },
    travelMode: { type: String },
    path: {
      type: Array,
    },
  },

  afterCreate(directionsRenderer) {
    const directionsService = new window.google.maps.DirectionsService();

    this.$watch(
      () => [this.origin, this.destination, this.travelMode, this.path],
      () => {
        const { travelMode = 'DRIVING', path } = this;
        if (!path || path.length < 2) return;

        // Modify every path for waypoints google array
        const modifiedPath = path.map((way) => ({
          location: new window.google.maps.LatLng(way.lat, way.lng),
          stopover: true,
        }));

        // Get Origin location
        const origin = modifiedPath[0].location;

        // Get destination location
        const destination = modifiedPath[modifiedPath.length - 1].location;

        // Get all routes without origin and destination
        const newWaypoint = modifiedPath
          .filter((location, index) => index !== 0 && index !== modifiedPath.length - 1);

        directionsService.route(
          {
            origin,
            destination,
            travelMode,
            waypoints: newWaypoint,
          },
          (response, status) => {
            // console.log('response', response);
            if (status === 'ZERO_RESULTS') {
              this.$emit('zeroDirectionResults');
              // directionsRenderer.setMap(null);
              return;
            }
            if (status !== 'OK') return;
            directionsRenderer.setDirections(response);
            this.$emit('pathLoaded', { distance: response.routes[0].legs[0].distance.value });
          },
        );
      },
      { immediate: true },
    );
  },
});
