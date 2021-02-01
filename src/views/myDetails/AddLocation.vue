<template>
  <div class="add-location">
    <div>
      <img
        class="pointer"
        src="~@/assets/img/arrow-left.svg"
        alt="Arrow left"
        @click="showAddLocationModal"
      />
    </div>

    <div class="d-flex justify-center header">
      Adding location
    </div>

    <section class="add-location__main main d-flex justify-center">
      <div class="d-flex flex-column location__block justify-center">
<!--        <input type="text" v-model="address" ref="autocomplete" placeholder="Address" class="input">-->

        <vue-google-autocomplete
          :id="'autocomplete'"
          class="input"
          :placeholder="'Address'"
          @change="onchange"
          ref="googleAutocomplete"
        >
        </vue-google-autocomplete>

        <OldLocationList style="margin: auto"/>

        <div class="add-contact__buttons d-flex justify-center">
          <ui-button type="dark-border" class="add-location__buttons-btn" @click="showAddLocationModal">Cancel</ui-button>
          <ui-button class="add-location__buttons-btn" @click="changeAddress">Confirm</ui-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import UiButton from '@/components/UI/UiButton.vue';
import OldLocationList from '@/components/SearchPanel/tabs/location/OldLocationList.vue';
import VueGoogleAutocomplete from 'vue-google-autocomplete';
import * as VueGoogleMaps from 'vue2-google-maps';

export default {
  name: 'AddLocation',
  components: {
    UiButton,
    OldLocationList,
    VueGoogleAutocomplete,
  },
  props: {
    isOpen: {
      type: Boolean,
    },
    place: [String, Boolean],
  },
  mounted() {
    // eslint-disable-next-line no-new
    // this.$gmapApiPromiseLazy().then(() => {
    //   new this.google.maps.places.Autocomplete(this.$refs.autocomplete)();
    // });
  },
  data() {
    return {
      address: '',
    };
  },
  methods: {
    onchange(address) {
      this.address = address;
    },
    changeAddress() {
      this.$emit('changeAddress', {
        place: this.place,
        address: this.address,
        edit: this.place,
      });
      this.$refs.googleAutocomplete.autocompleteText = '';
      this.address = '';
      this.$emit('showAddLocationModal');
    },
    showAddLocationModal() {
      this.$refs.googleAutocomplete.autocompleteText = '';
      this.address = '';
      this.$emit('showAddLocationModal');
    },
  },
  computed: {
    google: VueGoogleMaps.gmapApi,
  },
};
</script>

<style lang="scss">
@import "~@/assets/styles/variables.scss";

.v-label {
  color: black !important;
}

.theme--light.v-icon {
  color: black;
}
.v-input--selection-controls__input:hover {
  background: none;
}

.header {;
  margin-top: -24px;
  font-weight: bold;
  font-size: 16px;
}

.input {
  margin: 0 auto 20px auto;
  padding: 8px;
  width: 90%;
  border: 1px solid #000;
  border-radius: 5px;
}

.add-location {
  &__main {
    position: relative;
    margin: 25px auto auto;
    max-width: 600px;
  }

  &__body {
    height: 175px;
  }

  &__buttons {
    margin-top: 50px;

    &-btn {
      width: 170px !important;
      margin: 15px;
    }
  }

  &__required {
    position: absolute;
    right: 0;
    font-weight: 300;
    font-size: 12px;

    &::before {
      content: '•';
      color: #C7511F;
      position: absolute;
      left: -7px;
    }
  }
}
</style>
