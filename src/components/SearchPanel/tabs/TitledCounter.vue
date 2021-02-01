<template>
  <div class="d-flex justify-space-between">
    <div class="d-flex align-center">
      <span class="icon"><slot></slot></span>
      <span class="text">{{ title }}</span>
    </div>

    <counter :value="value" @input="$emit('input', $event)" />
  </div>
</template>

<script>
import Counter from '@/components/UI/Counter.vue';

export default {
  name: 'TitledCounter',
  components: { Counter },
  props: {
    title: {
      type: String,
      required: true,
    },
    value: Number,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/variables.scss";
.text {
  font-family: $OpenSans;
  font-size: 14px;
  line-height: 14px;
}

.icon {
   display: flex;
   align-items: center;
   margin-right: 4px;
 }

</style>
