<template>
  <div class="ui-simple-carousel">
    <div>
      <vue-agile :options="options" ref="carousel" >
        <template v-slot:caption>
          <div class="d-flex justify-space-between" style="margin-bottom: 17px;">
            <slot name="caption"></slot>
          </div>
        </template>

        <!-- buttons will be rendered inside v-slot:caption -> firstChildElement-->
        <template slot="prevButton">
          <v-icon>mdi-chevron-left</v-icon>
        </template>
        <template slot="nextButton">
          <v-icon>mdi-chevron-right</v-icon>
        </template>

        <slot></slot>
      </vue-agile>
    </div>
  </div>
</template>

<script>
import { VueAgile } from 'vue-agile';

export default {
  name: 'SimpleCarousel',
  components: {
    VueAgile,
  },
  props: {
    isArrowsVisible: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    options() {
      return {
        dots: false,
        autoplay: false,
        navButtons: this.isArrowsVisible,
      };
    },
  },
  mounted() {
    const carouselElement = this.$refs.carousel.$el;
    // Move list to the end of carousel
    carouselElement.append(this.$refs.carousel.$refs.list);

    if (this.isArrowsVisible) {
      // Move carousel actions inside carousel caption block
      const carouselCaption = carouselElement.querySelector('.agile__caption');
      const carouselActions = carouselElement.querySelector('.agile__actions');
      carouselCaption.firstElementChild.append(carouselActions);
    }
  },
};
</script>

<style lang="scss">
  .ui-simple-carousel {
    .agile__slides {
      align-items: start !important;
    }
  }
</style>
