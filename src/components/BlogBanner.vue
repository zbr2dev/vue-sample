<template>
  <div class="banner">
    <div class="cta"></div>
    <div class="ads">
      <v-row no-gutters>
        <v-spacer></v-spacer>
        <v-col md="2">
          <div class="ad">1<br />block</div>
        </v-col>
        <v-spacer></v-spacer>
        <v-col md="3">
          <div class="ad">2<br />block</div>
        </v-col>
        <v-spacer></v-spacer>
        <v-col md="2">
          <div class="ad">3<br />block</div>
        </v-col>
        <v-spacer></v-spacer>
        <v-col md="3">
          <div class="ad">4<br />block</div>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.ad {
  height: 200px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
