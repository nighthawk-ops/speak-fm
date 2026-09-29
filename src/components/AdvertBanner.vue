<template>
  <section
    id="advert"
    v-reveal
    class="advert-banner"
    aria-labelledby="advert-title"
  >
    <article
      :key="activeIndex"
      class="advert-banner__slide"
      :style="{ backgroundImage: `url(${activeAdvert.image})` }"
      @mouseenter="pauseRotation"
      @mouseleave="resumeRotation"
      @focusin="pauseRotation"
      @focusout="resumeRotation"
    >
      <div class="advert-banner__overlay">
        <span class="advert-banner__label">Advert</span>
        <h2 id="advert-title" class="text-h4">{{ activeAdvert.title }}</h2>
        <p>{{ activeAdvert.description }}</p>
        <v-btn :href="activeAdvert.ctaUrl" color="primary">{{
          activeAdvert.ctaText
        }}</v-btn>
      </div>
      <div class="advert-banner__controls">
        <v-btn
          icon="mdi-chevron-left"
          aria-label="Previous advert"
          @click="showPrevious"
        />
        <div class="advert-banner__dots" aria-label="Advert slides">
          <button
            v-for="(advert, index) in adverts"
            :key="advert.id"
            type="button"
            :class="{ 'is-active': index === activeIndex }"
            :aria-label="`Show advert ${index + 1}`"
            :aria-current="index === activeIndex ? 'true' : undefined"
            @click="showSlide(index)"
          />
        </div>
        <v-btn
          icon="mdi-chevron-right"
          aria-label="Next advert"
          @click="showNext"
        />
      </div>
    </article>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { adverts } from "@/data/adverts";

const activeIndex = ref(0);
let rotationTimer = null;
const activeAdvert = computed(() => adverts[activeIndex.value]);

function showSlide(index) {
  activeIndex.value = index;
}

function showNext() {
  activeIndex.value = (activeIndex.value + 1) % adverts.length;
}

function showPrevious() {
  activeIndex.value = (activeIndex.value - 1 + adverts.length) % adverts.length;
}

function startRotation() {
  if (!rotationTimer) rotationTimer = window.setInterval(showNext, 8000);
}

function pauseRotation() {
  if (rotationTimer) {
    window.clearInterval(rotationTimer);
    rotationTimer = null;
  }
}

function resumeRotation() {
  startRotation();
}

onMounted(startRotation);
onBeforeUnmount(pauseRotation);
</script>

<style scoped>
.advert-banner {
  min-height: 220px;
  padding: 1rem;
  background: rgb(var(--v-theme-surface));
}

.advert-banner__slide {
  position: relative;
  max-width: 1200px;
  min-height: 188px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 16px;
  background-color: rgb(var(--v-theme-secondary));
  background-position: center;
  background-size: cover;
  animation: advert-fade 200ms var(--motion-easing);
}

@keyframes advert-fade {
  from {
    opacity: 0.55;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.advert-banner__overlay {
  min-height: 188px;
  padding: 1.5rem;
  background: linear-gradient(
    90deg,
    rgba(13, 42, 74, 0.9),
    rgba(13, 42, 74, 0.28)
  );
  color: white;
}

.advert-banner__overlay p {
  max-width: 680px;
}

.advert-banner__label {
  display: inline-flex;
  min-height: 28px;
  align-items: center;
  padding: 0 0.65rem;
  border-radius: 999px;
  background: rgb(var(--v-theme-accent));
  color: rgb(var(--v-theme-on-surface));
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.advert-banner__controls {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  color: white;
}

.advert-banner__dots {
  display: flex;
  gap: 0.35rem;
}

.advert-banner__dots button {
  width: 10px;
  height: 10px;
  padding: 0;
  border: 2px solid white;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
}

.advert-banner__dots button.is-active {
  background: rgb(var(--v-theme-accent));
}

@media (max-width: 600px) {
  .advert-banner__controls {
    position: static;
    justify-content: flex-end;
    margin-top: 0.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .advert-banner__slide {
    animation: none;
  }
}
</style>
