<template>
  <div class="base-textarea">
    <span class="base-textarea__label">{{ label }}</span>
    <textarea
      class="base-textarea__body"
      :maxlength="maxLength"
      @input="$emit('input', $event.target.value)"
      :value="value"
    />
    <div class="base-textarea__symbols">{{currentSymbolsCount}} / {{maxLength}}</div>
  </div>
</template>

<script>
export default {
  name: 'BaseTextarea',
  props: {
    value: String,
    label: String,
    maxLength: {
      type: [Number, String],
      default: () => 0,
    },
  },
  computed: {
    currentSymbolsCount() {
      return this.value.length || 0;
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";
  .base-textarea {
    display: inline-block;

    &__label {
      font-size: 14px;
      margin-bottom: 5px;
      color: #141414;
      font-family: $OpenSans;
    }

    &__body {
      width: 100%;
      font-size: 12px;
      padding: 5px;
      border: 1px solid #333333;
      border-radius: 4px;

      @include scrollbar;
    }

    &__symbols {
      margin-top: 4px;
      text-align: end;
      font-size: 12px;
      color: #BFBFBF;

    }
  }
</style>
