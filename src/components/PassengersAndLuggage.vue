<template>
  <div>

    <div v-if="withDetails" class="data">
      <div style="display: grid; grid-gap: 4px;">
        <div class="d-flex">
          <v-icon class="data__icon material-icons md-14">mdi-account-multiple</v-icon>
          <div class="data__text">{{persons}} passengers</div>
        </div>

        <div class="d-flex">
          <v-icon class="data__icon material-icons md-14">mdi-bag-carry-on</v-icon>
          <div class="data__text">{{luggage}} luggage</div>
        </div>
      </div>

    </div>

    <div v-else :class="['data', {'justify-center': centeredIcons}]">
      <div class="data__value">
        <v-icon class="data__icon material-icons md-14">mdi-account-multiple</v-icon>
        <div class="data__text">{{persons}}</div>
      </div>

      <div class="data__value">
        <v-icon class="data__icon material-icons md-14">mdi-bag-carry-on</v-icon>
        <div class="data__text">{{luggage}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PassengersAndLuggage',
  props: {
    withDetails: {
      type: Boolean,
      default: false,
    },
    luggage: {
      type: Number, required: true,
    },
    persons: {
      type: Number, required: true,
    },
    centeredIcons: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
  .data {
    display: flex;
    color: #403F46;
    &__value {
      display: flex;
      &:first-child {
        margin-right: 10px;
      }
    }

    &__icon {
      margin-right: 4px;
      color: black;
    }

    &__text {
      font-size: 14px;
    }
  }
</style>
