<template>
  <div>
    <vue-agile ref="main" :options="options1" :as-nav-for="asNavFor1" class="agile" style="height: 100%">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        :class="['slide', `slide--${index}`]"
      >
        <slot name="main" v-bind:slide="slide"></slot>
      </div>
    </vue-agile>

    <vue-agile
      class="thumbnails"
      ref="thumbnails"
      :options="options2"
      :as-nav-for="asNavFor2"
    >
      <div
        v-for="(slide, index) in slides"
        :key="index"
        :class="['slide', 'slide--thumbniail', `slide--${index}`]"
        @click="$refs.thumbnails.goTo(index)"
      >
        <slot name="thumbniail" v-bind:slide="slide"></slot>
      </div>
    </vue-agile>

  </div>

</template>

<script>
import { VueAgile } from 'vue-agile';

// Show more https://lukaszflorczak.github.io/vue-agile/
export default {
  name: 'UiSlider',
  components: {
    VueAgile,
  },
  props: {
    slides: Array,
  },
  computed: {
    options2() {
      return {
        autoplay: false,
        centerMode: true,
        dots: false,
        navButtons: false,
        slidesToShow: 5,
        autoplaySpeed: 5000,
        responsive: [
          {
            breakpoint: 600,
            settings: {
              slidesToShow: this.slides.length === 1 ? 1 : 5,
            },
          },
        ],
      };
    },
  },
  data() {
    return {
      asNavFor1: [],
      asNavFor2: [],
      options1: {
        dots: false,
        fade: true,
        navButtons: false,
        autoplay: false,
      },
    };
  },
  mounted() {
    this.asNavFor1.push(this.$refs.thumbnails);
    this.asNavFor2.push(this.$refs.main);

    this.$refs.main.$refs.list.style.height = '100%';
    this.$refs.main.$refs.track.style.height = '100%';

    if (this.slides.length === 1) {
      // remove cloned slides and remove transform
      setTimeout(() => {
        const thumbnailsRefs = this.$refs.thumbnails.$refs;
        thumbnailsRefs.track.style = { transform: 'translateX(0)' };
        thumbnailsRefs.slidesClonedBefore.remove();
        thumbnailsRefs.slidesClonedAfter.remove();
      }, 100);
    }
  },
};
</script>

<style scoped lang="scss">
.agile {
  &__track {
    height: 100%;
  }

  &__slide--active {
    border: red;
  }
}

.thumbnails {
  margin: 0 -5px;
  width: calc(100% + 10px)
}

.slide {
  align-items: center;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  justify-content: center;
  height: 100%;

  &--thumbniail {
    cursor: pointer;
    height: 65px;
    padding: 5px;
    transition: opacity .3s;
    max-width: 120px;
  }

  &:hover {
    opacity: .75
  }

  img {
    //height: 100%;
    object-fit: cover;
    object-position: center;
    width: 100%
  }

}

</style>
