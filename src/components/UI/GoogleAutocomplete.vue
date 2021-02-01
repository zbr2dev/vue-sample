<template>
  <div class="google-autocomplete">
    <vue-google-autocomplete
      :id="id"
      class="google-autocomplete__input"
      :placeholder="placeholder"
      @placechanged="getAddressData"
      ref="googleAutocomplete"
      :types="['address', 'establishment']"
    >
    </vue-google-autocomplete>
    <div class="icon-wrapper"><slot name="icon"></slot></div>
  </div>
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete';

export default {
  name: 'GoogleAutocomplete',
  components: {
    VueGoogleAutocomplete,
  },
  props: {
    placeholder: {
      type: String,
    },
    value: {
      type: Object,
      required: true,
      validate(newValue) {
        return newValue.lng && newValue.ltd && newValue.formatted_address;
      },
    },
    id: String,
  },
  methods: {
    getAddressData(...data) {
      console.log('s', data);
      const { longitude: lng, latitude: lat } = data[0];
      // eslint-disable-next-line camelcase
      const { formatted_address } = data[1];
      this.$emit('input', { lng, lat, formatted_address });
    },
  },
  watch: {
    value: {
      handler(newValue) {
        this.$nextTick(() => {
          if (newValue.formatted_address) {
            this.$refs.googleAutocomplete.autocompleteText = newValue.formatted_address;
          }
        });
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/styles/variables";
.google-autocomplete {

  &__input {
    height: 32px;
    width: 100%;
    padding: 7px 45px 7px 12px;
    border: 1px solid #BFBFBF;
    box-sizing: border-box;
    border-radius: 4px;
    font-family: $OpenSans;
    font-size: 14px;

    &:focus {
      border: 1px solid #BFBFBF !important;
      outline: none;
    }
  }

}
</style>

<style scoped lang="scss">
  .google-autocomplete {
    position: relative;
    display: flex;
    align-items: center;

    .icon-wrapper {
      position: absolute;
      right: 10px;
    }
  }
</style>
