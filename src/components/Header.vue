<template>
  <div :style="drawer ? 'margin-bottom: 100px' : 'z-index: 2; position: relative'">
    <v-app-bar :fixed="drawer === true">
      <v-row no-gutters class="d-flex align-center nav">
        <v-col md="1" lg="2" xl="1">
          <div class="logo-holder" @click="goToHomePage">
            <img src="../../public/trexoz-light.png" alt="" />
          </div>
          <v-app-bar-nav-icon
            color="#FFFFFF"
            class="hamburger"
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
        </v-col>
        <v-spacer></v-spacer>
        <v-col offset-md="1" offset-lg="0" md="3" lg="5" offset-xl="1" xl="5">
          <div class="header-links">
            <v-menu offset-y class="header-dropdown">
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  Company<v-icon color="#FFFFFF" small>mdi-menu-down</v-icon>
                </span>
              </template>
              <v-list class="header-dropdown-list">
                <v-list-item>
                  <router-link to="/callback">Label</router-link>
                </v-list-item>
                <v-list-item>
                  <router-link to="/">Label</router-link>
                </v-list-item>
                <v-list-item>
                  <router-link to="/">Label</router-link>
                </v-list-item>
              </v-list>
            </v-menu>
            <router-link to="/">Providers</router-link>
            <v-menu offset-y class="header-dropdown">
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  Service providers<v-icon color="#FFFFFF" small>mdi-menu-down</v-icon>
                </span>
              </template>
              <v-list class="header-dropdown-list">
                <v-list-item>
                  <router-link to="/">Chauffeurs</router-link>
                </v-list-item>
                <v-list-item>
                  <router-link to="/">Business owner</router-link>
                </v-list-item>
              </v-list>
            </v-menu>
            <router-link to="/">Vehicle types</router-link>
          </div>
          <div class="mobile-logo">
            <img src="../../public/trexoz-light.png" alt="" />
          </div>
        </v-col>
        <v-spacer></v-spacer>
        <v-col offset-md="1" md="1" lg="3" offset-lg="2" offset-xl="1" xl="4">
          <div class="header-actions">
            <div class="header-search-wrapper">
              <v-text-field
                v-model="search"
                dark
                dense
                solo
                hide-details
                placeholder="Search"
                append-icon="mdi-magnify"
                class="search"
              ></v-text-field>
            </div>
            <v-icon color="#FFFFFF" class="search-icon">mdi-magnify</v-icon>
            <v-menu offset-y class="he user-name account-dropdown" v-if="userProfile">
              <template v-slot:activator="{ on, attrs }">
                <div v-bind="attrs" v-on="on" class="account-dropdown">
                  <span>{{ userProfile.UserName }}</span
                  ><v-icon color="#ffffff" class="user-avatar" v-if="avatar == 'data:image/jpeg;base64,null' || !avatar">mdi-account-circle-outline</v-icon>
                  <img class="profile-picture" v-else :src="avatar"/>
                </div>
              </template>
              <v-list class="header-dropdown-list">
                <v-list-item class="d-flex flex-column align-sm-start" style="height: 115px;">
                  <p class="header-dropdown-list-item" @click="goToMyProfile">Profile</p>
                  <p class="header-dropdown-list-item">Help</p>
                  <p @click="signOut" class="header-dropdown-list-item">Sign Out</p>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn outlined dark class="login-btn" @click="signIn" v-else>Sign In</v-btn>
            <extended-basket-icon :count="bookingsLength" @click="handleBasketClick" />
          </div>
        </v-col>
      </v-row>
      <v-row no-gutters class="desktop-nav">
        <div class="blue-nav">
          <router-link to="/my-trips" v-if="userProfile"
            ><img src="../../public/nav-bullet.svg" />Trips</router-link
          >
          <router-link to="/" v-if="userProfile"
            ><img src="../../public/nav-bullet.svg" />Favorite</router-link
          >
          <router-link to="/" v-if="userProfile"
            ><img src="../../public/nav-bullet.svg" />Rewards</router-link
          >
          <router-link to="/my-contacts" v-if="userProfile"
            ><img src="../../public/nav-bullet.svg" />Contacts</router-link
          >
          <router-link to="/" v-if="userProfile"
            ><img src="../../public/nav-bullet.svg" />Company</router-link
          >
        </div>
      </v-row>
      <v-row no-gutters class="mobile-nav">
        <div class="blue-nav">
          <v-tabs
            background-color="#069B89"
            center-active
            dark
            fixed-tabs
            :show-arrow="false"
            slider-color="primary"
            active-class="selected-tab"
            v-if="userProfile"
          >
            <v-tab><img src="../../public/nav-bullet.svg" />Trips</v-tab>
            <v-tab><img src="../../public/nav-bullet.svg" />Favorite</v-tab>
            <v-tab><img src="../../public/nav-bullet.svg" />Rewards</v-tab>
            <v-tab><img src="../../public/nav-bullet.svg" />Contacts</v-tab>
            <v-tab><img src="../../public/nav-bullet.svg" />Company</v-tab>
          </v-tabs>
        </div>
      </v-row>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute hide-overlay stateless>
      <div class="d-flex flex-column">
        <v-btn @click="signIn" v-if="!userProfile">Sign In</v-btn>
        <div v-else class="d-flex align-center">
          <span class="profile-name">{{ userProfile.UserName }}</span
          ><v-icon color="#ffffff" class="user-avatar" v-if="avatar == 'data:image/jpeg;base64,null' || !avatar">mdi-account-circle-outline</v-icon>
          <img class="profile-picture" v-else :src="avatar"/>
        </div>
        <v-btn @click="signOut" class="mt-4">Sign Out</v-btn>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import ExtendedBasketIcon from '@/components/UI/icons/ExtendedBasketIcon.vue';
import { createNamespacedHelpers, mapState } from 'vuex';

const {
  mapActions: mapAuthActions,
} = createNamespacedHelpers('auth');

const {
  mapGetters: mapProfileGetters,
} = createNamespacedHelpers('profile');

export default {
  components: { ExtendedBasketIcon },
  data() {
    return {
      search: '',
      drawer: false,
      t: null,
      avatar: null,
    };
  },
  methods: {
    ...mapAuthActions(['getMyProfileDetail']),
    signIn() {
      this.$mainOidc.signinRedirect();
    },
    signOut() {
      this.$mainOidc.signoutRedirect({ state: 'my test' });
      this.$store.dispatch('auth/checkUserStatus', null);
    },
    goToHomePage() {
      this.$router.push({ name: 'Home' });
    },
    async goToMyProfile() {
      await this.getMyProfileDetail(this.userProfile.UserId);
      await this.$router.push(`/my-profile/${this.userProfile.UserId}}`);
    },
    handleBasketClick() {
      if (this.$route.path !== '/trexoz-cart') {
        this.$router.push('/trexoz-cart');
      }
    },
  },
  computed: {
    ...mapProfileGetters(['getUserProfilePhoto']),
    ...mapState({
      userProfile: (state) => state.auth.userProfile,
      bookingsLength: (state) => state.booking.bookings.length,
    }),
  },
  mounted() {
    // console.log(this.getUserProfilePhoto);
    this.avatar = this.getUserProfilePhoto;
    if (this.$mainOidc) {
      this.$mainOidc.getUser().then((result) => {
        this.$store.dispatch('auth/checkUserStatus', result);
      });
    }
  },
  watch: {
    getUserProfilePhoto: {
      handler() {
        this.avatar = this.getUserProfilePhoto;
      },
    },
  },
};
</script>

<style lang="scss">
header {
  background-color: #141414 !important;
  color: #ffffff !important;
  // height: 108px !important;
}
.mobile-nav {
  display: none !important;
}
.desktop-nav {
  display: flex;
}
.v-toolbar__content {
  display: block !important;
  padding: 0 !important;
}
.nav {
  padding: 15px 30px;
  background-color: #141414 !important;
}
.profile-name {
  font-size: 14px;
  font-weight: 500;
}
.logo-holder {
  max-width: 100%;
  cursor: pointer;
  img {
    width: 100%;
    @media (max-width: 1400px) {
      max-width: 90px;
      height: auto;
    }
  }
}
.mobile-logo {
  max-width: 100%;
  display: none;
  align-items: center;
  justify-content: center;
  img {
    width: 50%;
    min-width: 88px;
  }
}
.header-links {
  display: flex;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  justify-content: space-between;
  a {
    text-decoration: none;
    color: #ffffff !important;
    &:hover {
      color: #f7941d !important;
    }
  }
}
.v-menu__content .header-dropdown-list {
  background-color: #141414 !important;
  border-radius: 5px !important;
  width: 175px;
  margin-top: 20px;
  &-item {
    color: white;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: #ffffff !important;
    &:hover {
      color: #f7941d !important;
    }
  }
}
.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  // max-width: 500px;
}
.login-btn {
  width: 35%;
  max-width: 250px;
}
.search .v-input__slot {
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.05)
  ) !important;
}
.blue-nav {
  width: 100%;
  height: 42px;
  background: #069B89;
  display: flex;
  padding: 0 28.6%;
  justify-content: space-between;
  align-items: center;
  a {
    text-decoration: none;
    color: #ffffff !important;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    display: flex;
    align-items: center;
    &:hover {
      color: #f7941d !important;
    }
    img {
      margin-right: 8px;
    }
  }
}
.search-icon {
  display: none !important;
}
.logo-holder {
  display: block;
}
.hamburger {
  display: none !important;
}
.v-navigation-drawer {
  height: calc(100% - 79px) !important;
  top: 79px !important;
  // transform: translateX(0%) !important;
  width: 100% !important;
  position: fixed !important;
  z-index: 5 !important;
  color: #ffffff;
}
.v-navigation-drawer__content {
  background: #141414;
  display: flex;
  justify-content: center;
  align-items: center;
}
.user-avatar {
  margin-left: 19px;
}
.blue-nav {
  .v-tabs {
    .v-slide-group__prev {
      display: none !important;
    }
    .v-tab {
      //color: #ffffff !important;
      font-weight: 500;
      font-family: Montserrat;
    }
    .v-tab img {
      margin-right: 8px;
    }
    .selected-tab {
      font-weight: 700;
    }
  }
}
.v-app-bar {
  height: 108px !important;
}
.profile-picture {
  border-radius: 9999px;
  height: 35px;
  width: 35px;
  margin-left: 19px;
}
.account-dropdown {
  display: flex;
  align-items: center;
}

@media (max-width: 1400px) {
  .header-search-wrapper {
    display: none;
  }
  .search-icon {
    display: block !important;
  }
  .v-app-bar {
    height: 102px !important;
  }
}
@media (max-width: 992px) {
  .logo-holder {
    display: none;
  }
  .header-links {
    display: none;
  }
  .login-btn {
    display: none !important;
  }
  .account-dropdown {
    display: none;
  }
  .nav {
    padding: 17px 20px;
  }
  .mobile-logo {
    display: flex;
  }
  .hamburger {
    display: block !important;
  }
  header {
    height: 124px !important;
  }
  .blue-nav {
    padding: 0 20%;
  }
  .user-name {
    display: none;
  }
}
@media (max-width: 760px) {
  .desktop-nav {
    display: none !important;
  }
  .mobile-nav {
    display: flex !important;
  }
  .blue-nav {
    padding: 0;
  }
}
</style>
