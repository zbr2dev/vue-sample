<template>
  <div class="vehicle-info">
    <div class="vehicle-info__title">Vehicle information</div>

    <div class="vehicle-info__row vehicle-row">
      <phone-charger-icon class="vehicle-row__icon"/>
      <span>Phone charger</span>
    </div>

    <div class="vehicle-info__row vehicle-row">
      <bottle-icon class="vehicle-row__icon"/>
      <span>Bottled water</span>
    </div>

    <div class="vehicle-info__row vehicle-row">
      <umbrella-icon class="vehicle-row__icon"/>
      <span>Umbrella</span>
    </div>

    <div class="vehicle-info__row vehicle-row">
      <div class="vehicle-row__icon" />
      <span>Sit scelerisque</span>
    </div>

  </div>
</template>

<script>
import PhoneChargerIcon from '@/components/UI/icons/PhoneChargerIcon.vue';
import BottleIcon from '@/components/UI/icons/BottleIcon.vue';
import UmbrellaIcon from '@/components/UI/icons/UmbrellaIcon.vue';

export default {
  name: 'VehicleInfo',
  components: { UmbrellaIcon, BottleIcon, PhoneChargerIcon },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";

.vehicle-info {
  &__title {
    margin-bottom: 13px;
    margin-top: 20px;

    font-family: $Montserrat;
    font-size: 18px;
    font-weight: 600;
  }

  .vehicle-row {
    display: flex;
    align-items: center;
    margin-bottom: 13px;

    &__icon {
      margin-right: 13px;
      width: 14px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
