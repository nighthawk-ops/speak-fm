export function getCurrentDay() {
  return new Date()
    .toLocaleDateString("en-US", {
      weekday: "long",
    })
    .toLowerCase();
}

export function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}
