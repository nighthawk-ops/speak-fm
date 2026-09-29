<template>
  <v-container>
    <h2 class="text-h4 mb-6 text-center">
      {{ slide.heading }}
    </h2>

    <v-row>
      <v-col
        v-for="program in slide.programs"
        :key="program.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="fill-height pa-5" color="primary">
          <v-card-title>
            {{ program.title }}
          </v-card-title>

          <v-card-subtitle>
            {{ program.start }}

            -

            {{ program.end }}
          </v-card-subtitle>
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
