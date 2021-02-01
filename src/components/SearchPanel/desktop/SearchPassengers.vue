<template>
  <search-tab-layout style="max-width: 270px;">
    <titled-section  style="margin-bottom: 10px;"  title="Passengers">
     <titled-counter title="People" :value="value" @input="$emit('input', $event)">
       <people />
     </titled-counter>
    </titled-section>

    <titled-section title="Luggage">
      <luggage />
    </titled-section>
  </search-tab-layout>
</template>

<script>
import SearchTabLayout from '@/components/SearchPanel/desktop/other/SearchTabLayout.vue';
import TitledCounter from '@/components/SearchPanel/tabs/TitledCounter.vue';
import TitledSection from '@/components/SearchPanel/tabs/TitledSection.vue';
import Luggage from '@/components/SearchPanel/tabs/searchMore/Luggage.vue';
import People from '@/components/UI/icons/People.vue';

export default {
  name: 'SearchPassengers',
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  components: {
    TitledCounter,
    SearchTabLayout,
    TitledSection,
    People,
    Luggage,
  },
};
</script>

<style scoped lang="scss">

</style>
