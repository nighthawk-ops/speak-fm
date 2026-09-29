<template>
  <section id="live-player" class="live-player" aria-label="Live radio player">
    <div class="live-player__content">
      <span class="live-player__badge">LIVE</span>
      <strong>Speak FM 89.5</strong>
      <span class="live-player__status" aria-live="polite">{{ status }}</span>
      <v-btn
        :aria-label="playing ? 'Pause live radio' : 'Play live radio'"
        :icon="playing ? 'mdi-pause' : 'mdi-play'"
        color="primary"
        variant="flat"
        @click="togglePlayback"
      />
      <v-slider
        v-model="volume"
        aria-label="Volume"
        class="live-player__volume"
        color="primary"
        max="1"
        min="0"
        step="0.05"
        thumb-label
        hide-details
        @update:model-value="rememberVolume"
      />
      <audio
        ref="audio"
        preload="none"
        :src="streamUrl"
        @error="handleError"
        @playing="handlePlaying"
        @waiting="handleWaiting"
      />
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { siteConfig } from "@/config/site";

const STORAGE_KEY = "speak-fm-volume";
const audio = ref(null);
const playing = ref(false);
const volume = ref(0.8);
const status = ref("Ready to listen");
const streamUrl = siteConfig.streamUrl;

function handlePlaying() {
  playing.value = true;
  status.value = "On air";
}

function handleWaiting() {
  status.value = "Buffering…";
}

function handleError() {
  playing.value = false;
  status.value = "Stream unavailable";
}

async function togglePlayback() {
  if (!audio.value) return;
  if (audio.value.paused) {
    try {
      await audio.value.play();
    } catch {
      status.value = "Tap play to start listening";
    }
  } else {
    audio.value.pause();
    playing.value = false;
    status.value = "Paused";
  }
}

function rememberVolume(value) {
  localStorage.setItem(STORAGE_KEY, String(value));
}

watch(volume, (value) => {
  if (audio.value) audio.value.volume = value;
});

onMounted(() => {
  const savedVolume = Number(localStorage.getItem(STORAGE_KEY));
  if (savedVolume >= 0 && savedVolume <= 1) volume.value = savedVolume;
  if (audio.value) audio.value.volume = volume.value;
});
</script>

<style scoped>
.live-player {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 20;
  padding: 0.5rem 1rem calc(0.5rem + env(safe-area-inset-bottom));
  background: rgb(var(--v-theme-surface));
  box-shadow: 0 -4px 18px rgba(0, 0, 0, 0.16);
}

.live-player__content {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  max-width: 1200px;
  min-height: 48px;
  margin: 0 auto;
}

.live-player__badge {
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  background: rgb(var(--v-theme-error));
  color: rgb(var(--v-theme-on-error));
  font-size: 0.7rem;
  font-weight: 700;
}

.live-player__status {
  flex: 1;
  color: rgba(var(--v-theme-on-surface), 0.7);
  font-size: 0.875rem;
}

.live-player__volume {
  max-width: 140px;
}

audio {
  display: none;
}

@media (max-width: 600px) {
  .live-player__content {
    gap: 0.5rem;
  }

  .live-player__content strong {
    display: none;
  }

  .live-player__volume {
    max-width: 100px;
  }
}
</style>
