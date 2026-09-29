<template>
  <div id="schedule" v-reveal>
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
          <LiveShowSlide v-if="slide.type === 'live'" :slide="slide" />

          <ScheduleSlides
            v-else-if="slide.type === 'schedule'"
            :slide="slide"
          />

          <NewsSlides v-else :slide="slide" />
        </v-carousel-item>
      </div>
    </v-carousel>
  </div>
</template>

<script setup>
import { radioScheduler } from "@/utils/radioScheduler";
import { useRadioSchedule } from "@/utils/timeHelper";
import { computed } from "vue";
import LiveShowSlide from "./radioSchedule/LiveShowSlide.vue";
import NewsSlides from "./radioSchedule/NewsSlides.vue";
import ScheduleSlides from "./radioSchedule/ScheduleSlides.vue";

const { currentShow, nextShow, todayPrograms } = useRadioSchedule();

const carouselSlides = computed(() => [
  // Slide 1
  {
    type: "live",
    heading: "Now Playing",

    featured: currentShow.value,

    next: nextShow.value,

    programs: todayPrograms.value,
  },

  // Slide 2
  {
    type: "schedule",

    heading: "Monday - Friday",

    programs: radioScheduler.weekday,
  },

  // Slide 3
  {
    type: "schedule",

    heading: "Saturday",

    programs: radioScheduler.saturday,
  },

  // Slide 4
  {
    type: "schedule",

    heading: "Sunday",

    programs: radioScheduler.sunday,
  },

  // Slide 5
  {
    type: "news",

    heading: "News Schedule",

    sections: [
      {
        title: "Monday - Friday",

        programs: radioScheduler.news.weekday,
      },

      {
        title: "Saturday",

        programs: radioScheduler.news.saturday,
      },

      {
        title: "Sunday",

        programs: radioScheduler.news.sunday,
      },
    ],
  },
]);
</script>

<style>
.scroll-container {
  overflow-y: scroll;
}
</style>
