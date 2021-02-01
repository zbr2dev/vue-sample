<template>
  <div class="routes">
    <draggable :list="routes" @end="updateRoutes">
      <div
        v-for="(route, index) in routes"
        :key="route.id"
        class="route"
      >
        <google-autocomplete
          class="route__input"
          :value="route"
          @input="data => changeRoute(data, index)"
          :placeholder="getRouteLabel(index)"
          :id="route.id">
          <template v-slot:icon v-if="index !== 0">
            <v-icon
              v-if="index === routes.length - 1"
              color="#BFBFBF" class="pointer"
              @click="addNewRoute"
            >
              mdi-plus
            </v-icon>
            <v-icon v-else color="#BFBFBF" class="pointer" @click="moveRoute">
              mdi-menu
            </v-icon>
          </template>

        </google-autocomplete>

        <div
          v-if="index !== 0 && index !== routes.length - 1"
          class="route__remove"
          @click="removeRoute(index)">
          <v-icon>
            mdi-close
          </v-icon>
        </div>
      </div>
    </draggable>

    <div v-if="mapResultStatus === loadingStatuses.FAILURE">No results</div>
  </div>
</template>

<script>
import GoogleAutocomplete from '@/components/UI/GoogleAutocomplete.vue';
import { getUniqueId } from '@/utils/helpers';
import { mapResultStatusType } from '@/components/SearchPanel/props';
import { LOADING_STATUSES } from '@/utils/constants';
import draggable from 'vuedraggable';

export default {
  name: 'EnterLocationsList',
  components: { GoogleAutocomplete, draggable },
  props: {
    waypoints: {
      type: Array,
    },
    mapResultStatus: mapResultStatusType,
  },
  data() {
    return {
      routes: [],
      loadingStatuses: LOADING_STATUSES,
    };
  },
  methods: {
    addNewRoute() {
      this.routes = [...this.routes, { id: getUniqueId() }];
      this.updateRoutes();
    },
    moveRoute() {
      console.log('MoveRoute');
    },
    removeRoute(index) {
      this.$delete(this.routes, index);
      this.updateRoutes();
    },
    getRouteLabel(index) {
      const lastRouteNumber = this.routes.length - 1;
      if (index === 0) return 'Where from?';
      if (index === lastRouteNumber) return 'Where to?';
      return 'Add stop?';
    },
    changeRoute(value, index) {
      this.$set(this.routes, index, { ...this.routes[index], ...value });
      this.updateRoutes();
    },
    updateRoutes() {
      const newRoutes = this.routes.filter((route) => route.lng && route.lat);
      if (newRoutes.length >= 1) {
        this.$emit('changeWaypoints', newRoutes);
      }
    },
  },
  watch: {
    waypoints(newValue) {
      if (this.routes.length === newValue.length) {
        this.routes = JSON.parse(JSON.stringify(newValue));
      } else if (newValue.length === 1) {
        this.routes = [...newValue, { id: getUniqueId() }];
      }
    },
  },
  mounted() {
    if (this.waypoints.length === 0) {
      this.routes = [{ id: getUniqueId() }, { id: getUniqueId() }];
    } else if (this.waypoints.length === 1) {
      this.routes = [...this.waypoints, { id: getUniqueId() }];
    } else this.routes = [...this.waypoints];
  },
};
</script>

<style scoped lang="scss">
  .routes {
    display: flex;
    flex-direction: column;
  }

  .route {
    margin-bottom: 16px;
    position: relative;
    display: flex;
    align-items: center;
    padding-right: 32px;

    &__remove {
      position: absolute;
      right: 0;
      cursor: pointer;
    }

    &__input {
      width: 100%;
    }
  }
</style>
