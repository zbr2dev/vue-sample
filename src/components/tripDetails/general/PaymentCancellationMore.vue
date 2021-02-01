<template>
  <div class="inform">
    <div class="inform__header">Payments, cancellations, refunds and waiting time</div>
    <div class="inform__section">
      <div>Deposite: <span class="inform__important">${{deposite}}</span> charge at the moment of booking.</div>
      <div>Deposite refund: <span class="inform__important">{{ refund }}</span></div>
    </div>

    <div class="inform__section">
      <div>Remaining payment: will be charged
        <span class="inform__important">6h</span> before the trip scheduled time and date.
      </div>
      <div>Remaining payment refund: if canceled
        <span class="inform__important">24h</span>
        before scheduled time and date.
      </div>
    </div>

    <div class="inform__section">
      <div>Waiting time: domestic flights - first
        <span class="inform__important">15</span> min FREE international flights -
        <span class="inform__important">45</span> min
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentCancellationMore',
  props: {
    deposite: {
      type: String,
      default: () => '100',
    },
    refund: {
      type: String,
      default: () => 'non-refundable',
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";
.inform {
  font-family: $Montserrat;
  &__header {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 12px;
  }

  &__section {
    font-family: $OpenSans;
    color: $black;
    line-height: 24px;
    font-size: 14px;
    margin-bottom: 8px;
  }

  &__important {
    font-weight: 800;
  }
}
</style>
