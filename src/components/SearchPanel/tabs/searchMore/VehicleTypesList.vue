<template>
  <div>
    <all-vehicle-types-item
      :style="allVehicleTypesStyles"
      :active="vehicleType.includes('All')"
      @click.native="setVehicleTypeAll"
      class="pointer"
    />
    <RootRender :show="showVehicleTypeWrapper">
      <div :style="vehicleTypeWrapperStyles">
        <vehicle-type-item
          v-for="type in types"
          :key="type.value"
          :persons="5"
          :luggage="3"
          :active="vehicleType.includes(type.value)"
          @click="updateVehicleType(type.value)"
          :car-type="type.carType"
        >
          <img :src="require(`../../../../assets/img/cars/${type.img}`)" alt="Vehicle type" />
        </vehicle-type-item>
      </div>
    </RootRender>

  </div>
</template>

<script>
import AllVehicleTypesItem from '@/components/SearchPanel/tabs/searchMore/AllVehicleTypesItem.vue';
import VehicleTypeItem from '@/components/SearchPanel/tabs/searchMore/VehicleTypeItem.vue';
import { carTypes } from '@/utils/helpers';
import RootRender from './RootRenderer';

const ALL = 'All';

export default {
  name: 'VehicleTypesList',
  components: { VehicleTypeItem, AllVehicleTypesItem, RootRender },
  props: {
    vehicleType: {
      type: [String, Array],
    },
    allVehicleTypesStyles: {
      type: Object,
    },
    showVehicleTypeWrapper: {
      type: Boolean,
      default: false,
    },
    vehicleTypeWrapperStyles: {
      type: Object,
    },
  },
  data() {
    return {
      types: carTypes,
    };
  },
  methods: {
    updateVehicleType(typeValue) {
      const oldType = [...this.vehicleType];
      const index = oldType.findIndex((value) => value === typeValue);
      if (index >= 0) oldType.splice(index, 1);
      else oldType.push(typeValue);

      if (oldType.length === this.types.length) {
        this.emitData([ALL]);
      } else {
        this.emitData(oldType.filter((el) => el !== ALL));
      }
    },
    emitData(newData) {
      this.$emit('update:vehicleType', newData);
    },
    setVehicleTypeAll() {
      this.emitData(this.vehicleType.includes(ALL) ? [] : [ALL]);
    },
  },
};
</script>
