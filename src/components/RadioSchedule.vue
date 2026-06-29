<template>
  <div id="schedule">
    <div class="text-h3 text-center my-5">OUR SCHEDULE</div>

    <v-divider></v-divider>
    <v-carousel
      hide-delimiters
      direction="vertical"
      vertical-arrows="left"
      progress="red"
    >
      <div class="scroll-container">
        <v-carousel-item v-for="slide in carouselSlides" :key="slide.heading">
          <v-container fluid>
            <v-row align="stretch">
              <!-- Current show -->
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
                    <h3 class="text-center">{{ slide.featured?.presenter }}</h3>
                    <p class="text-center">
                      {{ slide.featured?.start }} - {{ slide.featured?.end }}
                    </p>

                    <v-btn
                      append-icon="mdi-play-circle"
                      class="mt-5"
                      color="primary"
                      size="large"
                      rounded="xl"
                    >
                      TUNE IN
                    </v-btn>
                  </div>
                </div>
              </v-col>

              <!-- Program list column -->
              <v-col cols="12" lg="6">
                <v-card class="pa-2">
                  <!-- Next Show -->
                  <v-card-title v-if="slide.next"> Next Show </v-card-title>

                  <v-card-text v-if="slide.next">
                    <v-alert color="primary">
                      <strong>
                        {{ slide.next.title }}
                      </strong>

                      <br />

                      {{ nextShow?.start }}
                    </v-alert>
                  </v-card-text>

                  <v-divider></v-divider>

                  <div style="overflow-y: scroll">
                    <v-list>
                      <v-list-item
                        v-for="program in slide.programs"
                        :key="program.id"
                      >
                        <v-list-item-title>
                          {{ program.title }}
                        </v-list-item-title>

                        <v-list-item-subtitle>
                          {{ program.presenter }}
                        </v-list-item-subtitle>

                        <template #append>
                          {{ program.start }}
                        </template>
                      </v-list-item>
                    </v-list>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-carousel-item>
      </div>
    </v-carousel>
  </div>
</template>

<script setup>
import { radioScheduler } from "@/utils/radioScheduler";
import { useRadioSchedule } from "@/utils/timeHelper";
import { computed } from "vue";

const { currentShow, nextShow, todayPrograms } = useRadioSchedule();

const carouselSlides = computed(() => {
  const days = Object.keys(radioScheduler);

  const slides = [];

  // Live slide
  slides.push({
    heading: "Now Playing",
    featured: currentShow.value,
    next: nextShow.value,
    programs: todayPrograms.value,
  });

  // Day slides
  days.forEach((day) => {
    const programs = radioScheduler[day];

    slides.push({
      heading: day.charAt(0).toUpperCase() + day.slice(1),

      featured: programs[0],

      next: null,

      programs,
    });
  });

  return slides;
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
</style>
