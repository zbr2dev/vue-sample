<template>
  <base-input
    v-bind="$attrs"
    v-model="search"
    class="search-input"
    @input="$emit('input', $event)"
  >
    <template v-slot:append-icon>
      <div class="search-icon-wrapper" @click="$emit('search')">
        <v-icon color="dark">mdi-magnify</v-icon>
      </div>
    </template>
  </base-input>
</template>

<script>
import BaseInput from '@/components/UI/inputs/BaseInput.vue';

export default {
  name: 'SearchInput',
  components: { BaseInput },
  data() {
    return {
      search: '',
    };
  },
};
</script>

<style scoped lang="scss">
  .search-input {
    &::v-deep .base-input__append-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      right: 0;
      width: 40px;
      height: 100%;
      background: #BFBFBF;
      border-radius: 0 4px 4px 0;
      cursor: pointer;
    }
  }
</style>
