<template>
  <div>
    <div class="details__row">
      <v-icon class="details__row-icon">mdi-calendar</v-icon>
      <span class="font-bold" style="font-size: 14px">{{ readableDate }}</span>
    </div>

    <div class="details__row" style="margin-top: 17px; margin-bottom: 8px">
      <div class="details__row-icon">
        <arrow-route-from />
      </div>
      <span class="details__address">{{ originAddress }}</span>
    </div>

    <div class="details__row" style="margin-bottom: 8px">
      <div class="details__row-icon">
        <arrow-route-to />
      </div>
      <span class="details__address">{{ destinationAddress }}</span>
    </div>
  </div>

</template>

<script>
import ArrowRouteFrom from '@/components/UI/icons/routing/ArrowRouteFrom.vue';
import ArrowRouteTo from '@/components/UI/icons/routing/ArrowRouteTo.vue';

export default {
  name: 'DateAndRoutes',
  components: { ArrowRouteTo, ArrowRouteFrom },
  props: {
    readableDate: {
      type: String,
      required: true,
    },
    originAddress: {
      type: String,
      required: true,
    },
    destinationAddress: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
  @import "details-styles.scss";
</style>
