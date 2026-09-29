<template>
  <v-container id="team">
    <div class="text-h3 text-center my-5 pa-5">Meet the team</div>
    <v-divider></v-divider>

    <v-row class="mb-5">
      <v-col
        v-for="(member, index) in team"
        :key="member.name"
        v-reveal="{ delay: Math.min(index, 5) * 70 }"
        cols="12"
        sm="4"
      >
        <v-img
          height="200"
          max-width="200"
          :src="member.image"
          rounded="circle"
          fit
          aspect-ratio="16/9"
          class="mx-auto"
        ></v-img>

        <div class="d-flex flex-column align-center justify-center my-20">
          <div>{{ member.name }}</div>
          <div>{{ member.position }}</div>
          <!-- <div class="d-flex">
            <v-icon size="30">mdi-linkedin</v-icon>
            <v-icon size="30">mdi-facebook</v-icon>
            <v-icon size="30">mdi-gmail</v-icon>
          </div> -->
        </div>
      </v-col>
    </v-row>
    <br />
    <br />
  </v-container>
</template>

<script setup>
import { teamList } from "@/utils/teamHelper";

const team = teamList;
</script>

<style scoped></style>
