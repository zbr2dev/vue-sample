import Vue from 'vue';
import VueRouter from 'vue-router';
import SelectedCar from '@/views/TripDetails.vue';
import TrexozCart from '@/views/booking/TrexozCart.vue';
import ServiceBookingFirst from '@/views/booking/ServiceBookingFirst.vue';
import ServiceBookingSecond from '@/views/booking/ServiceBookingSecond.vue';
import MyTrips from '@/views/my/MyTrips.vue';
import MyDetailedTrip from '@/views/myDetails/MyDetailedTrip.vue';
import MyTripsPageLayout from '@/components/MyTripsPageLayout.vue';
import AddNewContact from '@/components/myContacts/AddNewContact.vue';
import TroublesImport from '@/components/myContacts/TroublesImport.vue';
import SuccessImport from '@/components/myContacts/SuccessImport.vue';
import Contacts from '@/views/my/Contacts.vue';
import MyDetailedContact from '@/views/myDetails/MyDetailedContact.vue';
import MyDetailedProfile from '@/views/myDetails/MyDetailedProfile.vue';
import AddNewPhoto from '@/views/myDetails/AddNewPhoto.vue';
import Home from '../views/Home.vue';
import Callback from '../views/Callback.vue';
import SearchResults from '../views/SearchResults.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/callback',
    name: 'Callback',
    component: Callback,
  },
  {
    path: '/search-results',
    name: 'SearchResults',
    component: SearchResults,
  },
  {
    path: '/trip/:id',
    name: 'Car',
    component: SelectedCar,
  },
  {
    path: '/trexoz-cart',
    name: 'TrexozCart',
    component: TrexozCart,
  },
  {
    path: '/booking-1',
    name: 'BookingFirst',
    component: ServiceBookingFirst,
  },
  {
    path: '/booking-2',
    name: 'BookingSecond',
    component: ServiceBookingSecond,
  },
  {
    path: '/my-trips',
    component: MyTripsPageLayout,
    children: [
      {
        path: '',
        name: 'MyTrips',
        component: MyTrips,
      },
      {
        path: ':id',
        name: 'MyDetailedTrip',
        component: MyDetailedTrip,
      },
    ],
  },
  {
    path: '/my-profile/:id',
    name: 'MyDetailedProfile',
    component: MyTripsPageLayout,
    children: [
      {
        path: '',
        component: MyDetailedProfile,
      },
      {
        path: '/edit-photo',
        component: AddNewPhoto,
      },
    ],
  },
  {
    path: '/my-contacts',
    component: MyTripsPageLayout,
    children: [
      {
        path: '',
        name: 'MyContacts',
        component: Contacts,
      },
      {
        path: 'detail',
        name: 'AddNewPhoto',
        component: AddNewPhoto,
      },
      {
        path: ':id/:isVirtual?',
        name: 'MyDetailedContact',
        component: MyDetailedContact,
      },
      {
        path: '/add-new-contact',
        name: 'AddNewContact',
        component: AddNewContact,
      },
      {
        path: '/add-new-contact/data-import',
        name: 'TroublesImport',
        component: TroublesImport,
      },
      {
        path: '/add-new-contact/success-import',
        name: 'SuccessImport',
        component: SuccessImport,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
  base: '/index.html',
});
export default router;
