<template>
  <v-container v-reveal id="news">
    <br />
    <v-divider></v-divider>
    <h2 class="text-h3 text-center my-8 text-primary">LATEST NEWS</h2>
    <v-divider></v-divider>

    <v-row v-if="loading">
      <v-col v-for="slot in 6" :key="slot" cols="12" sm="6" md="4">
        <v-skeleton-loader type="image, article" />
      </v-col>
    </v-row>

    <v-alert v-else-if="error" type="info" variant="tonal" class="mt-6">
      {{ error }}
      <a :href="wordPressBaseUrl" target="_blank" rel="noopener noreferrer"
        >Read our latest news</a
      >
    </v-alert>

    <v-row v-else-if="posts.length">
      <v-col
        v-for="(post, index) in posts"
        :key="post.id"
        v-reveal="{ delay: index * 70 }"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="fill-height">
          <v-img
            v-if="post.featuredImage"
            :src="post.featuredImage"
            :alt="post.title"
            height="200"
            cover
            loading="lazy"
          />
          <v-img
            v-else
            :src="fallbackImage"
            :alt="`${post.title} placeholder`"
            height="200"
            cover
            loading="lazy"
          />
          <v-card-title>{{ post.title }}</v-card-title>
          <v-card-subtitle>{{ post.date }}</v-card-subtitle>
          <v-card-text>{{ post.excerpt }}</v-card-text>
          <v-card-actions>
            <a :href="post.link" target="_blank" rel="noopener noreferrer"
              >Read More</a
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <p v-else class="text-center mt-6">No recent news is available.</p>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import fallbackImage from "@/assets/news.jpeg";
import { siteConfig, wordPressPostsUrl } from "@/config/site";

const CACHE_TTL = 5 * 60 * 1000;
let cachedPosts = null;
let cachedAt = 0;
const posts = ref([]);
const loading = ref(true);
const error = ref("");
const wordPressBaseUrl = siteConfig.wordPressBaseUrl;

function htmlToText(value = "") {
  const element = document.createElement("div");
  element.innerHTML = value;
  return element.textContent.replace(/\s+/g, " ").trim();
}

function safeHttpsUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
}

async function fetchPosts() {
  if (cachedPosts && Date.now() - cachedAt < CACHE_TTL) return cachedPosts;
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 5000);
  const query = new URLSearchParams({
    _fields: "id,title,excerpt,link,date,featured_media",
    per_page: "6",
  });
  try {
    const response = await fetch(`${wordPressPostsUrl}?${query}`, {
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const mediaMap = await fetchFeaturedImages(
      data.map((post) => post.featured_media).filter(Boolean)
    );
    cachedPosts = data.map((post) => ({
      id: post.id,
      title: htmlToText(post.title?.rendered),
      excerpt: htmlToText(post.excerpt?.rendered),
      date: new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
        new Date(post.date)
      ),
      link: safeHttpsUrl(post.link) || wordPressBaseUrl,
      featuredImage: mediaMap.get(post.featured_media) || "",
    }));
    cachedAt = Date.now();
    return cachedPosts;
  } finally {
    window.clearTimeout(timeout);
  }
}

async function fetchFeaturedImages(mediaIds) {
  if (!mediaIds.length) return new Map();
  const query = new URLSearchParams({
    include: mediaIds.join(","),
    _fields: "id,source_url,media_details",
    per_page: String(mediaIds.length),
  });
  const response = await fetch(
    `${siteConfig.wordPressBaseUrl}/wp-json/wp/v2/media?${query}`
  );
  if (!response.ok) return new Map();
  const media = await response.json();
  return new Map(
    media.map((item) => [
      item.id,
      safeHttpsUrl(
        item.media_details?.sizes?.large?.source_url ||
          item.media_details?.sizes?.medium_large?.source_url ||
          item.source_url
      ),
    ])
  );
}

onMounted(async () => {
  try {
    posts.value = await fetchPosts();
  } catch {
    error.value = "Unable to load news right now.";
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.v-card {
  overflow: hidden;
}

:deep(.v-img) {
  transition: transform 300ms var(--motion-easing);
}

.v-card:hover :deep(.v-img) {
  transform: scale(1.03);
}

@media (prefers-reduced-motion: reduce) {
  :deep(.v-img) {
    transition: none;
  }

  .v-card:hover :deep(.v-img) {
    transform: none;
  }
}
</style>
