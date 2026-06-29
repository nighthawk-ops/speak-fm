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

  const currentDay = computed(() => {
    return getCurrentDay(now.value);
  });

  const todayPrograms = computed(() => {
    return radioScheduler[currentDay.value] || [];
  });

  function getPreviousDay(day) {
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];

    const index = days.indexOf(day);

    return days[(index - 1 + 7) % 7];
  }

  const currentShow = computed(() => {
    const currentMinutes = now.value.getHours() * 60 + now.value.getMinutes();

    const today = radioScheduler[currentDay.value] || [];

    const yesterday = radioScheduler[getPreviousDay(currentDay.value)] || [];

    const allShows = [...today, ...yesterday];

    return (
      allShows.find((show) => {
        const start = timeToMinutes(show.start);

        const end = timeToMinutes(show.end);

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

  function getProgramsForDay(day) {
    return radioScheduler[day] || [];
  }

  function getFirstShow(day) {
    const programs = radioScheduler[day] || [];

    return programs[0] || null;
  }

  const slides = computed(() => {
    const days = Object.keys(radioScheduler);
    return [
      {
        type: "live",
        title: "Now Playing",
      },
      ...days.map((day) => ({
        type: "day",
        day,
        title: day.charAt(0).toUpperCase() + day.slice(1),
      })),
    ];
  });

  return {
    now,
    currentDay,
    todayPrograms,
    currentShow,
    nextShow,
    getProgramsForDay,
    getFirstShow,
    slides,
  };
}
