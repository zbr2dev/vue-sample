<template>
  <div class="d-flex align-center ui-rating">
    <v-rating
      :value="localRating"
      color="yellow darken-3"
      background-color="grey darken-1"
      empty-icon="$ratingFull"
      class="ui-rating__rating"
      readonly
    ></v-rating>
    <span class="ui-rating__reviews-count">
      {{ countText || (typeof localRating === 'number' ? localRating : 4) }}
    </span>
  </div>
</template>

<script>
import { getRating } from '@/utils/helpers';

export default {
  name: 'UiDetailedRating',
  props: {
    countText: {
      type: String,
    },
    value: {
      type: Number,
      default: () => 4,
    },
  },
  computed: {
    localRating() {
      return getRating(this.value);
    },
  },
};
</script>

<style scoped lang="scss">
.ui-rating {
  &__rating {
    //margin-top: -1px;
  }

  &__reviews-count {
    margin-left: 6px;
    font-size: 14px;
    color: #403F46;
    font-weight: 400;
  }
}

</style>

<style lang="scss">
.ui-rating {
  &__rating .v-icon {
    padding: 0 !important;
    font-size: 20px;
    margin-top: -2px;
  }
}
</style>
