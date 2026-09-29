// This helper class is used to get the actual day and time of a show then also handle overnight shows

import { ref, computed, onMounted, onUnmounted } from "vue";
import { radioScheduler } from "./radioScheduler";
import { getCurrentDay, timeToMinutes } from "./scheduleHelpers";

export function useRadioSchedule() {
  const now = ref(new Date());

  let timer = null;
  onMounted(() => {
    timer = setInterval(() => {
      now.value = new Date();
    }, 60000);
  });

  onUnmounted(() => {
    clearInterval(timer);
  });

  const scheduleType = computed(() => {
    switch (currentDay.value) {
      case "saturday":
        return "saturday";

      case "sunday":
        return "sunday";

      default:
        return "weekday";
    }
  });

  const currentDay = computed(() => {
    return getCurrentDay(now.value);
  });

  const todayPrograms = computed(() => {
    return radioScheduler[scheduleType.value] || [];
  });

  const currentShow = computed(() => {
    const currentMinutes = now.value.getHours() * 60 + now.value.getMinutes();

    return (
      todayPrograms.value.find((show) => {
        const start = timeToMinutes(show.start);
        const end = timeToMinutes(show.end);

        // Keep overnight support
        if (end < start) {
          return currentMinutes >= start || currentMinutes < end;
        }

        return currentMinutes >= start && currentMinutes < end;
      }) || null
    );
  });

  const nextShow = computed(() => {
    const currentMinutes = now.value.getHours() * 60 + now.value.getMinutes();

    const upcoming = todayPrograms.value
      .filter((show) => {
        const start = timeToMinutes(show.start);

        return start > currentMinutes;
      })
      .sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start));

    return upcoming[0] || null;
  });

  function getFirstShow(day) {
    const programs = radioScheduler[day] || [];

    return programs[0] || null;
  }

  const slides = computed(() => [
    {
      type: "live",
      title: "Now Playing",
    },

    {
      type: "schedule",
      title: "Weekdays",
      programs: radioScheduler.weekday,
    },

    {
      type: "schedule",
      title: "Saturday",
      programs: radioScheduler.saturday,
    },

    {
      type: "schedule",
      title: "Sunday",
      programs: radioScheduler.sunday,
    },

    {
      type: "news",
      title: "News Schedule",
      news: radioScheduler.news,
    },
  ]);
  return {
    now,
    currentDay,
    todayPrograms,
    currentShow,
    nextShow,
    getFirstShow,
    slides,
  };
}
