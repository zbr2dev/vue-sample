<template>
  <div class="cart-item__price-section">
    <div class="cart-item__price">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            size="16"
            v-bind="attrs"
            v-on="on"
          >
            mdi-information-outline
          </v-icon>
        </template>
        <v-card>Some text</v-card>
      </v-tooltip>
      <span class="cart-item__price-number">{{ amount }}</span>
    </div>
    <div v-if="isSubtitleVisible" style="font-size: 12px; text-align: end">All inclusive price</div>
  </div>
</template>

<script>
import { formatNumberToAmount } from '@/utils/helpers';

export default {
  name: 'TripTotalPrice',
  props: {
    price: {
      type: Number,
      default: () => 0,
    },
    isSubtitleVisible: {
      type: Boolean,
      default: () => true,
    },
  },
  computed: {
    amount() {
      return formatNumberToAmount(this.price);
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";

.cart-item {
  &__price {
    display: flex;
    justify-content: flex-end;
  }

  &__price-number {
    margin-left: 5px;
    font-size: 16px;
    font-weight: 600;
    font-family: $Montserrat;
  }
}
</style>
