<template>
  <div class="d-flex root">
    <div class="icon-wrapper"><slot name="icon"></slot></div>
    <div class="item-info">
      <div class="text">{{ text }}</div>
      <div class="subtext">{{ subtext }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBarItem',
  props: {
    text: {
      type: String,
      required: true,
    },
    subtext: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/variables.scss";

.root {
  padding: 20px;
  cursor: pointer;
}

.icon-wrapper {
  margin-top: -3px;
}

.item-info {
  margin-left: 10px;
  flex-shrink: 0;
}

.text {
  font-size: 12px;
  font-family: $Montserrat;
  font-weight: 600;
  color: $black;
}

.subtext {
  font-family: $OpenSans;
  margin-top: 8px;
  font-size: 14px;
  color: $grey;
}
</style>
