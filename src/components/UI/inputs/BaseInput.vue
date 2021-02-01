<template>
  <div class="base-input">
    <div v-if="label" class="base-input__label">{{ label }}</div>

    <div class="base-input__body">
      <label style="width: 100%">
        <input
          v-bind="$attrs"
          :placeholder="placeholder"
          :class="['base-input__input',  { 'input__input--append-icon': type === 'number' || $slots['append-icon'] }]"
          :value="value"
          @input="change"
          @blur="$emit('blur')"
          ref="input"
        />
      </label>

      <div class="base-input__append-icon" v-if="$slots['append-icon']">
        <slot name="append-icon"></slot>
      </div>

      <div class="base-input__arrows" v-if="type === 'number'">
        <div @click.prevent="handleUp" style="height: 10px; cursor: pointer">
          <v-icon style="height: 10px; cursor: pointer" color="black">mdi-menu-up</v-icon>
        </div>
        <div @click.prevent="handleDown" style="height: 10px; cursor: pointer">
          <v-icon style="height: 10px; cursor: pointer" color="black">mdi-menu-down</v-icon>
        </div>
      </div>
    </div>
    <div class="validation-error" v-if="errorState">{{fieldName}} is not valid</div>
  </div>
</template>

<script>

const TYPES = [
  'text',
  'password',
  'email',
  'number',
  'url',
  'tel',
  'search',
  'color',
  'temperature',
];

const includes = (types) => (type) => types.includes(type);

export default {
  name: 'BaseInput',
  props: {
    type: {
      type: String,
      validator(type) {
        return includes(TYPES)(type);
      },
    },
    value: {
      type: [Number, String],
    },
    label: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    fieldName: {
      type: String,
    },
    errorState: {
      type: Boolean,
    },
  },
  methods: {
    change(e) {
      this.$emit('input', e.target.value);
      this.$forceUpdate();
    },
    handleUp() {
      this.$emit('upNumber');
    },
    handleDown() {
      this.$emit('downNumber');
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";

  .base-input {
    display: inline-block;

    &__label {
      font-family: $OpenSans;
      font-size: 14px;
      line-height: 18px;
      margin-bottom: 4px;
    }

    &__arrows {
      position: absolute;
      top: -2px;
      right: 5px;
    }

    &__append-icon {
      position: absolute;
      right: 5px;
    }

    &__body {
      position: relative;
      display: flex;
      align-items: center;
    }

    &__input {
      display: flex;
      align-items: center;
      height: 32px;
      box-sizing: border-box;
      border: 1px solid $light-grey;
      border-radius: 4px;
      font-size: 14px;
      padding: 0 12px;
      width: 100%;

      &::placeholder {
        color: #BFBFBF;
      }

      &:focus {
        border: 1px solid $black;
      }

      &--append-icon {
        padding-right: 20px;
      }

    }
    .validation-error {
      color: #e53935;
      font-size: 12px;
      margin-top: 5px;
      margin-left: 5px;
    }
  }
</style>
