<template>
  <v-navigation-drawer app v-model="drawer" location="right" temporary>
    <v-list>
      <template v-for="(item, index) in items" :key="index">
        <v-list-item
          :href="item.href"
          :title="item.title"
          @click="drawer = false"
        />
        <v-divider></v-divider>
      </template>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar app :elevation="3" scroll-behavior="hide" scroll-threshold="20">
    <v-img height="90" max-width="90" src="../assets/speakfmlogo.png"></v-img>
    <v-app-bar-title text="SPEAK FM" href="#home"></v-app-bar-title>

    <v-spacer></v-spacer>
    <v-btn flat class="hidden-sm-and-down text-primary" href="#about"
      >About Us</v-btn
    >
    <v-btn flat class="hidden-sm-and-down text-primary" href="#advert"
      >Advert</v-btn
    >
    <v-btn flat class="hidden-sm-and-down text-primary" href="#schedule"
      >Schedule</v-btn
    >
    <v-btn flat class="hidden-sm-and-down text-primary" href="#news"
      >News</v-btn
    >
    <v-btn flat class="hidden-sm-and-down text-primary" href="#services"
      >Services</v-btn
    >
    <v-btn flat class="hidden-sm-and-down text-primary" href="#team"
      >Team</v-btn
    >
    <v-btn flat class="hidden-sm-and-down text-primary" href="#reviews"
      >Reviews</v-btn
    >
    <v-btn flat class="hidden-sm-and-down text-primary" href="#contactUs"
      >Contact Us</v-btn
    >

    <template v-slot:append>
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppNavigation",
  data() {
    return {
      appTitle: "Speak FM",
      drawer: false,
      items: [
        { title: "About us", href: "#about" },
        { title: "Advert", href: "#advert" },
        { title: "Schedule", href: "#schedule" },
        { title: "News", href: "#news" },
        { title: "Services", href: "#services" },
        { title: "Team", href: "#team" },
        { title: "Reviews", href: "#reviews" },
        { title: "Contact us", href: "#contactUs" },
      ],
    };
  },
};
</script>

<style scoped></style>
