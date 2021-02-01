<template>
  <div class="photo">
    <div>
      <img
        class="pointer"
        src="~@/assets/img/arrow-left.svg"
        alt="Arrow left"
        @click="showAddNewAvatar"
      />
    </div>
       <VueCroppie
      class="photo__crop"
      ref="croppieRef"
      :enableOrientation="false"
      :boundary="{ width: 591, height: 366}"
      :viewport="{ width:208, height:208, type: 'circle' }"
      @result="result">
    </VueCroppie>
    <div class="d-flex justify-center flex-column img-upload" style="position: relative;">
      <input type="file" ref="updateFile" @change="croppie" style="margin: auto; position: absolute; left: 30%; opacity: 0; cursor: pointer"/>
      <p class="photo__main-text">Upload other photo</p>
    </div>

    <div class="photo__buttons d-flex justify-center">
      <ui-button type="dark-border" class="photo__buttons-btn" @click="showAddNewAvatar">Cancel</ui-button>
      <ui-button class="photo__buttons-btn" @click="crop">Save</ui-button>
    </div>
  </div>
</template>

<script>
import UiButton from '@/components/UI/UiButton.vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'croppie/croppie.css';
import { createNamespacedHelpers } from 'vuex';

const {
  mapActions: mapProfileActions,
  mapGetters: mapProfileGetters,
} = createNamespacedHelpers('profile');

export default {
  mounted() {
    this.$refs.croppieRef.bind({
      url: `data:image/jpeg;base64,${this.getProfileData.photoBase64}`,
    });
    this.$refs.updateFile.click();
  },
  components: { UiButton },
  data() {
    return {
      cropped: null,
    };
  },
  computed: {
    ...mapProfileGetters(['getProfileData', 'getProfileAvatar']),
  },
  methods: {
    ...mapProfileActions(['updateAvatar']),
    croppie(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      // eslint-disable-next-line consistent-return
      if (files[0].type !== 'image/png' && files[0].type !== 'image/jpg' && files[0].type !== 'image/jpeg') return alert('Please, upload picture in JPG, JPEG or PNG format');
      this.file = files;
      const reader = new FileReader();
      reader.onload = (ev) => {
        this.$refs.croppieRef.bind({
          url: ev.target.result,
        });
      };

      reader.readAsDataURL(files[0]);
    },
    dataURLtoFile(dataurl, filename) {
      const arr = dataurl.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);

      // eslint-disable-next-line no-plusplus
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
    },
    crop() {
      const options = {
        format: 'jpeg',
        circle: true,
      };
      this.$refs.croppieRef.result(options, async (output) => {
        this.cropped = output;
        this.$store.commit('profile/SET_USER_PROFILE_PHOTO', output);
        await this.updateAvatar({ file: this.dataURLtoFile(output, 'avatar.jpeg'), avatar: output });
        this.showAddNewAvatar();
      });
    },
    // EVENT USAGE
    result(output) {
      this.cropped = output;
    },

    showAddNewAvatar() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/styles/variables.scss";
.photo {
  &__crop {

    .cr-resizer-horisontal {
      width: 0 !important;
      height: 0 !important;
       &::after {
         content: none !important;
       }
    }

    .cr-resizer-vertical {
      width: 0 !important;
      height: 0 !important;
      &::after {
        content: none !important;
      }
    }

    .cr-resizer, .cr-viewport {
      border: none !important;
    }

  }

  &__main {
    margin-top: 20px;

    &-zoom {
      width: 273px;
      margin: 0 auto;

      .v-input__prepend-outer{
        .theme--light.v-icon:nth-child(1n) {
          color: #7e7e7e !important;
        }
      }

      .v-slider__thumb {
        width: 16px !important;
        height: 16px !important;
        background: white !important;
        border: 0.25px solid #7E7E7E;

        &:before {
          content: none !important;
        }
      }
    }

    &-block {
      margin: auto;
    }

    &-text {
      color: black !important;
      font-weight: bold;
      font-size: 14px;
      margin: 0 auto 16px auto;
      &:hover {
        cursor: pointer;
      }
    }
  }

  &__form-block:nth-child(2n) {
    margin: 15px 0;
  }

  &__buttons-btn {
    width: 170px !important;

    &:nth-child(1n) {
      margin-right: 15px;
    }
  }
  .img-upload:hover {
    cursor: pointer;
  }
}
</style>
