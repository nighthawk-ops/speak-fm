<template>
  <v-container id="services" class="our-services bg-primary" fluid>
    <div class="text-h2 font-weight-black text-white text-center pa-5">
      OUR <br />
      SERVICES
    </div>
    <v-row>
      <v-col
        v-for="(service, index) in services"
        :key="service.title"
        v-reveal="{ delay: Math.min(index, 5) * 70 }"
        cols="12"
        md="4"
        sm="6"
      >
        <v-card class="fill-height pa-5">
          <div class="d-flex">
            <v-card-item>
              <v-icon size="50" color="primary">{{ service.icon }}</v-icon>
            </v-card-item>
            <div>
              <v-card-title class="service-title">{{
                service.title
              }}</v-card-title>
              <v-card-text> {{ service.description }}</v-card-text>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <div class="d-flex align-center justify-center">
      <v-btn
        class="mt-5 text-primary"
        color="white"
        size="large"
        rounded="xl"
        href="#contactUs"
      >
        Get in touch</v-btn
      >
    </div>
  </v-container>
</template>

<script setup>
import { serviceList } from "@/utils/servicesHelper";

const services = serviceList;
</script>

<style scoped>
.our-services {
  margin-bottom: 40px;
}
.service-title {
  white-space: normal !important;
  line-height: 1.3;
  min-height: 3.2rem;
}
</style>
