<template>
  <div class="item">
    <div class="d-flex align-center">
      <span class="item__icon"><slot></slot></span>
      <span class="item__title">{{ title }}</span>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            v-bind="attrs"
            v-on="on"
            class="item__info-icon"
          >
            mdi-information-outline
          </v-icon>
        </template>
        <span>{{tooltip}}</span>
      </v-tooltip>
    </div>
    <counter :value="value" @input="$emit('input', $event)"/>
  </div>
</template>

<script>
import Counter from '@/components/UI/Counter.vue';

export default {
  name: 'CounterItem',
  components: { Counter },
  props: {
    title: {
      type: String,
      required: true,
    },
    tooltip: {
      type: String,
    },
    value: Number,
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__icon {
      display: flex;
      align-items: center;
      margin-right: 8px;
      width: 14px;
    }

    &__title {
      font-family: $OpenSans;
      font-weight: 400;
      margin-right: 5px;
      font-size: 14px;
      line-height: 14px;
    }

    &__info-icon {
      font-size: 18px;
    }
  }
</style>
