const FALLBACK_DELAY = 1600;

function reveal(element) {
  element.classList.add("reveal-visible");
  element.style.removeProperty("--reveal-delay");
  element.style.removeProperty("will-change");
}

export default {
  mounted(element, binding) {
    const options = typeof binding.value === "object" ? binding.value : {};
    const delay = Number(options.delay || 0);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    element.dataset.reveal = "true";
    element.style.setProperty("--reveal-delay", `${delay}ms`);

    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      reveal(element);
      return;
    }

    let revealed = false;
    let observer;
    const show = () => {
      if (revealed) return;
      revealed = true;
      clearTimeout(fallback);
      observer?.unobserve(element);
      reveal(element);
    };

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) show();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    const fallback = window.setTimeout(show, FALLBACK_DELAY);
    element.style.willChange = "opacity, transform";
    observer.observe(element);
  },
};
