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

    <h1 class="text-white font-weight-bold">TUNE IN</h1>
    <audio id="audio-player" preload="none" controls="" playsinline="">
      <source src="https://www.radiocomnetu.org/speakfm-stream" />
    </audio>
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
  background-color: (0, 0, 0, 0.9);
}
</style>
