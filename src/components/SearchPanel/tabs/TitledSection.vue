<template>
  <div>
    <div class="section-title">{{ title }}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TitledSection',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";

.section-title {
  font-family: $Montserrat;
  font-size: 14px;
  color: $black;
  font-weight: 600;
  margin-bottom: 13px;
}
</style>
