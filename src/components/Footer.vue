<template>
  <v-footer class="trexoz-footer">
    <v-row>
      <v-col lg="3" xl="2" md="3" class="logo-section">
        <img src="../../public/trexoz-light.png" class="logo" alt="Trexoz logo" />
        <div class="socials d-none d-md-flex">
          <a href="#"><img src="../../public/facebook.svg" alt="facebook" /></a>
          <a href="#"><img src="../../public/linkedin.svg" alt="linkedin" /></a>
          <a href="#"><img src="../../public/twitter.svg" alt="twitter" /></a>
        </div>
        <div class="location d-none d-md-block">
          <span> Detroit, Michigan </span>
          <img src="../../public/usa.svg" />
        </div>
      </v-col>
      <v-col cols="12" offset-xl="2" offset-lg="1" md="6" lg="5" xl="4">
        <v-row no-gutters>
          <v-spacer class="d-block d-md-none"></v-spacer>
          <v-col cols="6" sm="4" md="2">
            <div class="footer-links">
              <router-link to="/">About</router-link>
              <router-link to="/">News</router-link>
              <router-link to="/">Blog</router-link>
              <router-link to="/">Careers</router-link>
            </div>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="6" sm="4" md="4">
            <div class="footer-links">
              <router-link to="/">Chauffeurs</router-link>
              <router-link to="/">Service Providers</router-link>
              <router-link to="/callback">Investor Relations</router-link>
            </div>
          </v-col>
          <v-spacer></v-spacer>
          <v-col md="3" class="d-none d-md-flex">
            <div class="footer-links">
              <router-link to="/">FAQs</router-link>
              <router-link to="/">Help center</router-link>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        offset-xl="1"
        offset-lg="1"
        lg="2"
        xl="3"
        md="3"
        class="app-links d-flex flex-column align-start align-md-end"
      >
        <div class="store-links">
          <span class="cta">Download App</span>
          <a href="#" class="appstore-link desktop app-store-mobile"
            ><img src="../../public/AppStore-desktop.svg" alt=""
          /></a>
          <a href="#" class="appstore-link mobile app-store-tablet"
            ><img src="../../public/AppStore.svg" alt=""
          /></a>
          <a href="#"><img src="../../public/GooglePlay.svg" alt="" /></a>
        </div>
      </v-col>
    </v-row>
    <v-row class="footer-lower">
      <v-col cols="12" class="socials d-flex d-md-none justify-center">
        <a href="#"><img src="../../public/facebook-mobile.svg" alt="facebook" /></a>
        <a href="#"><img src="../../public/linkedin-mobile.svg" alt="linkedin" /></a>
        <a href="#"><img src="../../public/twitter-mobile.svg" alt="twitter" /></a>
      </v-col>
      <v-col cols="12" class="location d-flex d-md-none justify-center">
        <span> Detroit, Michigan </span>
        <img src="../../public/usa.svg" />
      </v-col>
      <v-col cols="12" md="6" class="d-flex justify-space-around justify-md-start">
        <router-link to="/">Terms and Conditions</router-link>
        <router-link to="/" class="d-md-none">Help center</router-link>
      </v-col>
      <v-col cols="12" md="6" class="d-flex justify-center justify-md-end">
        <span class="copyright">© 2020 Trexoz | All Rights Reserved</span>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {};
</script>

<style lang="scss">
.v-footer {
  padding: 48px 30px;
  background-color: #141414 !important;
  color: #ffffff !important;
  display: block !important;
}
.socials {
  margin-top: 25px;
}
.socials a {
  margin-right: 24px;
}
.location {
  //margin-top: 17px;
  //display: flex;
  //align-items: center;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
}
//.location * {
//  margin-right: 10px;
//}
.footer-links {
  display: flex;
  flex-direction: column;
}
.footer-links a {
  margin-top: 24px;
  text-decoration: none;
  color: #ffffff !important;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
}
.footer-links a:hover {
  color: #f7941d !important;
}
.app-links {
  //   padding-right: 31px;
}
.appstore-link {
  margin-right: 17px;
}
.cta {
  margin-top: 24px;
  display: block;
  margin-bottom: 17px;
  font-weight: normal;
  font-size: 18px;
}
.footer-lower {
  margin-top: 54px;
  a {
    text-decoration: none;
    color: #ffffff !important;
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
    &:hover {
      color: #f7941d !important;
    }
  }
}

.copyright {
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
}

.desktop {
  display: inline-block;
}
.mobile {
  display: none;
}

@media (max-width: 1400px) {
  .store-links {
    display: flex;
    flex-direction: column;
    text-align: end;
  }
  .appstore-link {
    margin-right: 0;
  }
  .logo {
    width: 132px;
    height: auto;
  }
  .footer-links a {
    margin-bottom: 16px;
    margin-top: 8px;
  }
  .cta {
    margin-top: 8px;
    margin-bottom: 16px;
  }
  .v-footer {
    .desktop {
      display: none;
    }
    .mobile {
      display: block;
    }
  }
}
@media (max-width: 768px) {
  .logo-section {
    margin-bottom: 25px;
  }
  .cta {
    text-align: start;
    width: 100%;
    font-size: 14px;
    line-height: 22px;
  }
  .store-links {
    flex-direction: row;
    flex-wrap: wrap;
    .appstore-link {
      margin-right: 35px;
    }
  }
  .app-store-mobile {
    display: block !important;
  }
  .app-store-tablet {
    display: none !important;
  }
  .socials a {
    margin-left: 20px;
    margin-right: 20px;
  }
  //.location {
  //  margin-top: 40px;
  //  margin-bottom: 45px;
  //}
}
</style>
