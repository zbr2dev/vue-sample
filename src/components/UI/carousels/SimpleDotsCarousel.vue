<template>
  <vue-agile :options="options" ref="carousel" class="simple-dots-carousel">
    <slot></slot>
  </vue-agile>
</template>

<script>
import { VueAgile } from 'vue-agile';

export default {
  name: 'SimpleDotsCarousel',
  components: {
    VueAgile,
  },
  data() {
    return {
      options: {
        dots: true,
        autoplay: false,
        navButtons: false,
      },
    };
  },
};
</script>

<style lang="scss">
.simple-dots-carousel .agile__dots {
  margin: 0 auto;
}

.simple-dots-carousel .agile__dot {
  margin: 0 4px;

  button {
    $size: 4px;
    height: $size;
    width: $size;
    background-color: #BDBDBD;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: block;
    font-size: 0;
    line-height: 0;
    margin: 0;
    padding: 0;
    transition-duration: .3s;
  }

  &--current, &:hover {
    button {
      background-color: #333333;
    }
  }
}
</style>
