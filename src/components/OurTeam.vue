<template>
  <v-container id="team">
    <div class="text-h3 text-center my-5 pa-5">Meet the team</div>
    <v-divider></v-divider>

    <v-row class="mb-5">
      <v-col v-for="n in 6" :key="n" cols="12" sm="4">
        <v-img
          height="180"
          max-width="auto"
          src="../assets/default-profile.webp"
        ></v-img>
        <div class="d-flex flex-column align-center justify-center">
          <div>Name</div>
          <div>Positions</div>
          <div class="d-flex">
            <v-icon size="30">mdi-linkedin</v-icon>
            <v-icon size="30">mdi-facebook</v-icon>
            <v-icon size="30">mdi-gmail</v-icon>
          </div>
        </div>
      </v-col>
    </v-row>
    <br />
    <br />
  </v-container>
</template>

<script>
export default {
  name: "OurTeam",
};
</script>

<style scoped></style>
