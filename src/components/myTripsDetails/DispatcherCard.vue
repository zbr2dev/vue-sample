<template>
  <div class="card">
    <div class="card__logo">
      <img
        class="card__logo-img--rounded"
        src="~@/assets/img/dispatcher-ico.png"
        alt="Dispatcher"
      />
    </div>

    <div class="card__content content">
      <div class="content__row">
        <div class="content__row-label">
          Dispatcher
        </div>
        <div class="card__bold-size">
          Abhiramnew
        </div>
      </div>

      <div class="content__row">
        <div class="content__row-label">
          Phone
        </div>
        <div>
          +380 97 34 22 433
        </div>
      </div>
    </div>

    <div class="card__leave-comment">
      <v-icon color="black">mdi-comment</v-icon>
    </div>

  </div>
</template>

<script>
export default {
  name: 'DispatcherCard',
  props: {
    dispatcher: {
      type: Object,
    },
  },
};
</script>

<style scoped lang="scss">
@import "styles.scss";
</style>
