<template>
  <v-navigation-drawer app v-model="drawer" location="right" temporary>
    <v-lis>
      <template v-for="(item, index) in items" :key="index">
        <v-list-item>
          <v-list-item-content>
            {{ item.title }}
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </template>
    </v-lis>
  </v-navigation-drawer>

  <v-app-bar app :elevation="3" scroll-behavior="hide" scroll-threshold="20">
    <v-img height="90" max-width="90" src="../assets/speakfmlogo.png"></v-img>
    <v-app-bar-title text="SPEAK FM" href="#home"></v-app-bar-title>

    <v-spacer></v-spacer>
    <v-btn flat class="hidden-sm-and-down text-primary" href="#about"
      >About Us</v-btn
    >
    <v-btn flat class="hidden-sm-and-down text-primary" href="#schedule"
      >Schedule</v-btn
    >
    <v-btn flat class="hidden-sm-and-down text-primary" href="#services"
      >Services</v-btn
    >
    <v-btn flat class="hidden-sm-and-down text-primary" href="#team"
      >Team</v-btn
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
        { title: "About us" },
        { title: "Schedule" },
        { title: "Services" },
        { title: "Team" },
        { title: "Contact us" },
      ],
    };
  },
};
</script>

<style scoped></style>
