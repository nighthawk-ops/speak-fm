<template>
  <v-container>
    <h2 class="text-h4 mb-6">
      {{ slide.heading }}
    </h2>

    <div v-for="section in slide.sections" :key="section.title" class="mb-8">
      <h3 class="text-h5 mb-4">
        {{ section.title }}
      </h3>

      <v-row>
        <v-col
          v-for="program in section.programs"
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
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script setup>
import { defineProps } from "vue";

defineProps({
  slide: Object,
});
</script>
