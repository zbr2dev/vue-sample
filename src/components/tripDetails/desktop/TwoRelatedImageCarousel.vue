<template>
  <ui-slider :slides="slides" class="two-related-image-carousel">
    <template v-slot:main="slotProps">
      <div>
        <img :src="slotProps.slide.url" class="img" :style="{['max-height']: `${mainMaxHeight}px` }"/>
      </div>
    </template>

    <template v-slot:thumbniail="slotProps">
      <div class="d-flex align-center">
        <img :src="slotProps.slide.url"  class="img" style="object-fit: contain"/>
      </div>
    </template>
  </ui-slider>
</template>

<script>
import UiSlider from '@/components/UI/carousels/UiTwoBindCarousels.vue';

export default {
  name: 'TwoRelatedImageCarousel',
  props: {
    slides: Array,
    mainMaxHeight: {
      type: Number,
    },
  },
  components: { UiSlider },
};
</script>

<style scoped>
.img {
  object-fit: cover;
  object-position: center;
  width: 100%
}
</style>

<style lang="scss">
  .two-related-image-carousel {
    .slide--thumbniail.agile__slide.agile__slide--active {
      border: 2px solid black;
      border-radius: 4px;
    }
  }
</style>
