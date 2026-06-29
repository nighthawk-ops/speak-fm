<template>
  <v-container id="contactUs" fluid class="footer" min-height="80vh">
    <div class="overlay">
      <div>
        <v-img
          height="250"
          src="../assets/speakfmlogo.png"
          max-width="auto"
        ></v-img>
        <div class="d-flex flex-column align-center">
          <h1>SPEAK FM</h1>
          <h3>VOICES UNLIMITED</h3>
        </div>
      </div>

      <div class="d-flex flex-column ga-4 mt-4">
        <h1 class="text-center">Get in touch</h1>
        <br />
        <div class="d-flex ga-6">
          <v-icon size="40">mdi-phone</v-icon>
          <h3>+256-0417-436895</h3>
        </div>

        <div class="d-flex ga-6">
          <v-icon size="40">mdi-email</v-icon>
          <h3>speakfm@fowode.org</h3>
        </div>

        <div class="d-flex ga-6">
          <v-icon size="40">mdi-map-marker</v-icon>
          <h3>
            Plot 15, Ali Openy, Tegwana.<br />
            P.O Box 144, Gulu City
          </h3>
        </div>

        <div class="d-flex ga-6">
          <v-icon size="40">mdi-alarm</v-icon>
          <div>
            <h3>Monday-Sundays</h3>
            <h4>8am- 9pm</h4>
          </div>
        </div>
      </div>

      <div class="d-flex flex-column align-right justify-space-evenly">
        <v-btn
          variant="text"
          class="hidden-sm-and-down text-white text-right"
          href="#about"
          >About Us</v-btn
        >
        <v-btn
          variant="text"
          class="hidden-sm-and-down text-white text-right"
          href="#schedule"
          >Schedule</v-btn
        >
        <v-btn
          variant="text"
          class="hidden-sm-and-down text-white text-right"
          href="#services"
          >Services</v-btn
        >
        <v-btn variant="text" class="hidden-sm-and-down text-white" href="#team"
          >Team</v-btn
        >
        <v-btn
          variant="text"
          class="hidden-sm-and-down text-white"
          href="#contactUs"
          >Contact Us</v-btn
        >
        <br />
        <div class="d-flex justify-space-between pa-20">
          <v-icon size="20">mdi-linkedin</v-icon>
          <v-icon size="20">mdi-facebook</v-icon>
          <v-icon size="20">mdi-youtube</v-icon>
          <v-icon size="20">mdi-twitter</v-icon>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "ContactUs",
};
</script>

<style scoped>
.footer {
  background-image: url("../assets/Speakfm-exterior.png");
  background-size: cover;
  background-position: center;
  width: 100%;
  background-color: (0, 0, 0, 0.7);
  position: relative;
}

.overlay {
  position: absolute;
  inset: 0;

  background: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: space-around;
  align-items: center;

  color: white;

  padding: 3rem;
}
</style>
