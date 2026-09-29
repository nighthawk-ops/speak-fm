<template>
  <v-container
    id="home"
    fluid
    class="home-hero d-flex flex-column justify-center align-center pa-5"
  >
    <v-spacer></v-spacer>
    <div class="hero-content">
      <div class="text-h1 font-weight-black text-white text-center">89.5</div>
      <div class="text-h1 font-weight-black text-white text-center mb-3">
        SPEAK FM
      </div>
      <div class="text-h4 font-weight-bold text-primary text-center">
        Voices Unlimited
      </div>

      <v-btn href="#live-player" color="primary" size="large" rounded="xl"
        >TUNE IN</v-btn
      >
    </div>
  </v-container>
</template>

<script>
export default {
  name: "HomeHero",
};
</script>

<style scoped>
.home-hero {
  position: relative;
  background: url("../assets/stationImageFour.jpeg");
  background-size: cover;
  background-position: center;
  width: 100%;
  min-height: 100vh;
  background-color: rgb(var(--v-theme-secondary));
}

.home-hero::before {
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(13, 42, 74, 0.35), rgba(13, 42, 74, 0.82));
  content: "";
}

.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: hero-enter 500ms var(--motion-easing) both;
}

@keyframes hero-enter {
  from {
    opacity: 0.92;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-content {
    animation: none;
  }
}
</style>
