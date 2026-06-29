<template>
  <v-container
    id="home"
    fluid
    class="home-hero d-flex flex-column justify-center align-center pa-5"
  >
    <v-spacer></v-spacer>
    <div class="text-h1 font-weight-black text-white text-center">89.5</div>
    <div class="text-h1 font-weight-black text-white text-center mb-3">
      SPEAK FM
    </div>
    <div class="text-h4 font-weight-bold text-primary text-center">
      Voices Unlimited
    </div>

    <v-btn
      append-icon="mdi-play-circle"
      class="mt-5"
      color="primary"
      size="large"
      rounded="xl"
    >
      TUNE IN
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: "HomeHero",
};
</script>

<style scoped>
.home-hero {
  background: url("../assets/stationImageFour.jpeg");
  background-size: cover;
  background-position: center;
  width: 100%;
  min-height: 100vh;
  background-color: (0, 0, 0, 0.5);
}
</style>
