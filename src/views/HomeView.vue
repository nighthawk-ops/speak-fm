<template>
  <AppNavigation />
  <HomeHero />
  <LivePlayer />
  <AdvertBanner />
  <AboutUs />
  <RadioSchedule />
  <NewsArticles />
  <OurServices />
  <OurTeam />
  <ReviewsSection />
  <ContactUs />
</template>

<script>
import { defineComponent } from "vue";

// Components
import AppNavigation from "@/components/AppNavigation.vue";
import HomeHero from "@/components/HomeHero.vue";
import AboutUs from "@/components/AboutUs.vue";
import RadioSchedule from "@/components/RadioSchedule.vue";
import OurServices from "@/components/OurServices.vue";
import OurTeam from "@/components/OurTeam.vue";
import ContactUs from "@/components/ContactUs.vue";
import NewsArticles from "@/components/NewsArticles.vue";
import AdvertBanner from "@/components/AdvertBanner.vue";
import ReviewsSection from "@/components/ReviewsSection.vue";
import LivePlayer from "@/components/LivePlayer.vue";

export default defineComponent({
  name: "HomeView",

  components: {
    AppNavigation,
    HomeHero,
    AboutUs,
    RadioSchedule,
    OurServices,
    OurTeam,
    ContactUs,
    NewsArticles,
    AdvertBanner,
    ReviewsSection,
    LivePlayer,
  },
});
</script>
