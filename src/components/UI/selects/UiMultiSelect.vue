<template>
  <ui-select
    v-bind="$attrs"
    :label="label"
    :items="items"
    @input="handleInput"
    :value="value"
    multiple
  >
    <template v-slot:selection="slotScoped">
      <span>{{slotScoped.index === 0 ? label : ''}}</span>
    </template>

    <template v-slot:item="slotScoped">
      <ui-checkbox
        :label="typeof slotScoped.item === 'object' ? slotScoped.item.label : slotScoped.item"
        :input-value="typeof slotScoped.item === 'object' ? value.includes(slotScoped.item.value) : value.includes(slotScoped.item)"
      />
    </template>

    <template v-slot:prepend-item>
      <v-list-item ripple>
        <ui-checkbox label="All types" @input="selectAll" :input-value="value.length === items.length"/>
      </v-list-item>
    </template>
  </ui-select>
</template>

<script>
import UiCheckbox from '@/components/UI/UiCheckbox.vue';
import UiSelect from '@/components/UI/selects/UiSelect.vue';

export default {
  name: 'UiMultiSelect',
  components: { UiSelect, UiCheckbox },
  props: {
    allOptionLabel: {
      type: String,
      default: () => 'All',
    },
    items: {
      type: Array,
    },
    label: {
      type: String,
    },
    value: {
      type: Array,
    },
  },
  methods: {
    selectAll() {
      this.handleInput(this.value.length === this.items.length ? [] : this.items.map((el) => el.value));
    },
    handleInput(data) {
      this.$emit('input', data);
    },
  },
};
</script>

<style scoped>

</style>
