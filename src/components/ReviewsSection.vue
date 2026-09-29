<template>
  <section
    id="reviews"
    v-reveal
    class="reviews-section"
    aria-labelledby="reviews-title"
  >
    <v-container>
      <p class="text-overline text-center text-white mb-2">
        Sample testimonials
      </p>
      <h2 id="reviews-title" class="text-h3 text-center text-white my-2">
        What listeners say
      </h2>
      <p class="text-center text-medium-emphasis mb-8">
        Illustrative content for layout preview — replace in
        <code>src/data/reviews.js</code>.
      </p>
      <article
        :key="activeIndex"
        class="review-card"
        tabindex="0"
        @mouseenter="pauseRotation"
        @mouseleave="resumeRotation"
        @focusin="pauseRotation"
        @focusout="resumeRotation"
      >
        <v-icon size="42" color="accent">mdi-format-quote-open</v-icon>
        <v-rating
          :model-value="activeReview.rating"
          readonly
          color="primary"
          density="comfortable"
        />
        <blockquote>“{{ activeReview.comment }}”</blockquote>
        <strong>{{ activeReview.name }}</strong>
        <span>{{ activeReview.role }}</span>
        <div class="review-card__controls">
          <v-btn
            icon="mdi-chevron-left"
            aria-label="Previous sample testimonial"
            @click="showPrevious"
          />
          <div class="review-card__dots" aria-label="Sample testimonials">
            <button
              v-for="(review, index) in reviews"
              :key="review.id"
              type="button"
              :class="{ 'is-active': index === activeIndex }"
              :aria-label="`Show sample testimonial ${index + 1}`"
              :aria-current="index === activeIndex ? 'true' : undefined"
              @click="showSlide(index)"
            />
          </div>
          <v-btn
            icon="mdi-chevron-right"
            aria-label="Next sample testimonial"
            @click="showNext"
          />
        </div>
      </article>
    </v-container>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { reviews } from "@/data/reviews";

const activeIndex = ref(0);
let rotationTimer = null;
const activeReview = computed(() => reviews[activeIndex.value]);

function showSlide(index) {
  activeIndex.value = index;
}
function showNext() {
  activeIndex.value = (activeIndex.value + 1) % reviews.length;
}
function showPrevious() {
  activeIndex.value = (activeIndex.value - 1 + reviews.length) % reviews.length;
}
function startRotation() {
  if (!rotationTimer) rotationTimer = window.setInterval(showNext, 7000);
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
.reviews-section {
  padding: 3rem 0;
  background: rgb(var(--v-theme-primary));
}
.review-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 720px;
  min-height: 300px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 20px;
  background: rgb(var(--v-theme-surface));
  box-shadow: 0 12px 30px rgba(13, 42, 74, 0.12);
  text-align: center;
  animation: review-fade 350ms var(--motion-easing);
}
.review-card blockquote {
  max-width: 590px;
  margin: 1rem auto;
  color: rgb(var(--v-theme-on-surface));
  font-size: 1.25rem;
  line-height: 1.6;
}
.review-card > span {
  color: rgb(var(--v-theme-grey));
}
.review-card__controls {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-top: auto;
}
.review-card__dots {
  display: flex;
  gap: 0.35rem;
}
.review-card__dots button {
  width: 10px;
  height: 10px;
  padding: 0;
  border: 2px solid rgb(var(--v-theme-primary));
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
}
.review-card__dots button.is-active {
  background: rgb(var(--v-theme-primary));
}
@keyframes review-fade {
  from {
    opacity: 0.55;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@media (prefers-reduced-motion: reduce) {
  .review-card {
    animation: none;
  }
}
</style>
