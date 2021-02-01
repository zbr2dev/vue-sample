<template>
  <div class="section">
    <span class="section__title">{{ text }}</span>
    <v-icon class="section__icon" @click="$emit('edit')">mdi-pencil</v-icon>
  </div>
</template>

<script>
export default {
  name: 'SectionHeader',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";

.section {
  display: flex;
  align-items: center;

  &__title {
    font-family: $Montserrat;
    font-weight: 600;
    font-size: 14px;
  }

  &__icon {
    color: black;
    margin-left: 7px;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
