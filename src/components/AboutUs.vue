<template>
  <v-container id="about" class="about-us justify-center align-center pa-8">
    <div class="d-flex flex-column">
      <div class="text-h3 text-center my-8">ABOUT US</div>
      <v-divider></v-divider>
      <section>
        <div class="text-h5 mt-3">Radio Brief</div>
        <p class="text-subtitle-1 mt-3">
          SPEAK FM 89.5 is a 7-year-old community radio station broadcasting 80%
          in Luo and 20% in English. We cover a radius of 130km that is 10
          districts in northern Uganda with a population of 2,176,000. The
          primary audience for SPEAK FM is 60% women aged 35-45, the secondary
          audience is youth aged 25-34. Programming on SPEAK FM is solution
          oriented, versatile and inclusive, with 60% live broadcast and 40%
          pre-recorded content. We have community reporters in 5 districts, we
          are a leader in breaking news and our news is 50% local, 50%
          mixednational, business, sports, women and international. The special
          focus on programming at SPEAK FM is women empowerment and giving voice
          to and empowerment of vulnerable groups like PWDs, the elderly and
          refugees. Our tagline is “Voices Unlimited”!
        </p>
        <br />
        <v-divider></v-divider>
        <br />
      </section>
      <v-spacer></v-spacer>
      <v-row class="mt-20">
        <v-col>
          <div class="d-flex">
            <v-icon size="50" color="primary">mdi-eye</v-icon>
            <div>
              <div class="text-h5 mt-3">VISION</div>
              <p class="text-subtitle-1 mt-3">
                Unified voice for a Just, Inclusive and Accountable Society.
              </p>
            </div>
          </div>
        </v-col>

        <v-col>
          <div class="d-flex">
            <v-icon icon="mdi-adjust" size="50" color="primary"></v-icon>
            <div>
              <div class="text-h5 mt-3">MISSION</div>
              <p class="text-subtitle-1 mt-3">
                To empower listeners and promote gender equality through
                excellent broadcast for better choices.
              </p>
            </div>
          </div>
        </v-col>

        <v-col>
          <div class="d-flex">
            <v-icon
              icon="mdi-flag-checkered"
              size="50"
              color="primary"
            ></v-icon>
            <div>
              <div class="text-h5 mt-3">STRATEGIC GOAL</div>
              <p class="text-subtitle-1 mt-3">
                To promote access to information for women and youth for
                enhanced accountability and better life choices.
              </p>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "AboutUs",
};
</script>
<style scoped>
.about-us {
  width: 100%;
  margin-bottom: 40px;
}
</style>
