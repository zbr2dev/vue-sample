import * as VueGoogleMaps from 'vue2-google-maps';
import Vue from 'vue';

const mapKey = process.env.VUE_APP_GOOGLE_MAPS_API_KEY;

Vue.use(VueGoogleMaps, {
  load: {
    key: mapKey,
    libraries: 'places,directions',
  },
});
