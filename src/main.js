import Vue from 'vue';
import VueCroppie from 'vue-croppie';
import * as VueGoogleMaps from 'vue2-google-maps';
import './assets/styles/app.scss';
// import { createOidcAuth, SignInType } from 'vue-oidc-client';
import { UserManager } from 'oidc-client';
import VCalendar from 'v-calendar';
import TrexozApi from '@/api/common/TrexozApi';
import userManagerConfig from '@/plugins/userManagerConfig';
import LocalStorage from '@/utils/LocalStorage';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
// import './plugins/vueGoogleMaps';
// eslint-disable-next-line import/order
import { LOADING_STATUSES } from '@/utils/constants';

Vue.use(VueCroppie);

Vue.use(VCalendar, {
  componentPrefix: 'vc',
});

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
    libraries: 'places,directions',
  },
});

// window.vueGoogleMapsInit(google);

const manager = new UserManager(userManagerConfig);
Vue.config.productionTip = false;

Vue.prototype.$mainOidc = manager;

Vue.mixin({
  data() {
    return {
      loadingStatuses: LOADING_STATUSES,
    };
  },
});

new TrexozApi().setAuthHeader(LocalStorage.getAccessToken());

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');

manager.events.addAccessTokenExpired(() => {
  manager.startSilentRenew();
});
