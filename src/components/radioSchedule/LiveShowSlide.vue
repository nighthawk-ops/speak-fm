<template>
  <v-container fluid>
    <v-row align="stretch">
      <!-- Hero -->

      <v-col cols="12" lg="6">
        <div
          class="current-show"
          :style="{
            backgroundImage: `url(${slide.featured?.image})`,
          }"
        >
          <div class="overlay">
            <h2 class="text-h5 text-center">
              {{ slide.heading }}
            </h2>

            <h1 class="text-center">
              {{ slide.featured?.title }}
            </h1>

            <p class="text-center">
              {{ slide.featured?.start }}
              -
              {{ slide.featured?.end }}
            </p>
            <h1 class="text-white font-weight-bold text-center">TUNE IN</h1>
            <div class="d-flex justify-center align-center">
              <v-btn href="#live-player" color="primary">Tune in</v-btn>
            </div>
          </div>
        </div>
      </v-col>

      <!-- Program List -->

      <v-col cols="12" lg="6">
        <v-card>
          <v-card-title> Next Show </v-card-title>

          <v-card-text>
            <v-alert color="primary">
              {{ slide.next?.title }}
            </v-alert>
          </v-card-text>

          <v-divider />

          <v-list>
            <v-list-item v-for="program in slide.programs" :key="program.id">
              {{ program.title }}
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  slide: Object,
});
</script>

<style scoped>
.current-show {
  min-height: 400px;
  background-size: cover;
  background-position: center;
  position: relative;
}

@media (min-width: 960px) {
  .current-show {
    min-height: 400px;
  }

  .scroll-container {
    overflow-y: hidden;
  }
}

.scroll-container {
  overflow-y: scroll;
}

.overlay {
  position: absolute;
  inset: 0;

  background: rgba(0, 0, 0, 0.5);

  display: flex;
  flex-direction: column;
  justify-content: center;

  color: white;

  padding: 3rem;
}

#audio-playe {
  justify-self: center;
}
</style>
