<template>
  <v-container>
    <br />
    <v-divider></v-divider>
    <h2 class="text-h3 text-center my-8 text-primary">LATEST NEWS</h2>

    <v-divider></v-divider>

    <div v-if="loading" class="text-center">Loading news...</div>

    <div v-else-if="error" class="text-center">
      {{ error }}
    </div>

    <v-row v-else>
      <v-col v-for="post in posts" :key="post.id" cols="12" sm="6" md="4">
        <v-card class="fill-height">
          <v-img
            v-if="post._embedded?.['wp:featuredmedia']?.[0]?.source_url"
            :src="post._embedded['wp:featuredmedia'][0].source_url"
            height="200"
            cover
          />

          <v-card-title v-html="post.title.rendered" />

          <v-card-text v-html="post.excerpt.rendered" />

          <v-card-actions>
            <a
              :href="`https://www.radiocomnetu.org/speakfm/${post.slug}/`"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read More
            </a>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";

const posts = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await fetch(
      "https://www.radiocomnetu.org/speakfm/wp-json/wp/v2/posts?_embed&per_page=6"
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    posts.value = await response.json();
  } catch (err) {
    console.error("Error fetching WordPress posts:", err);
    error.value = "Unable to load news.";
  } finally {
    loading.value = false;
  }
});
</script>
