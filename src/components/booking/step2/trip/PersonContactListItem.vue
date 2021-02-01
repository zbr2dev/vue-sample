<template>
  <div class="person">
    <div class="person__name">
      {{ person.name }}
    </div>

    <div class="person__phone">
      {{ person.phone }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonContactListItem',
  props: {
    person: {
      type: Object,
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";

.person {
  display: flex;
  font-family: $OpenSans;
  font-size: 14px;

  &__name {
    font-weight: 600;
    color: $black;
    margin-right: 4px;
  }
}
</style>
