const defaultWordPressBaseUrl = "https://www.radiocomnetu.org/speakfm";

export const siteConfig = {
  streamUrl:
    import.meta.env.VITE_STREAM_URL ||
    "https://www.radiocomnetu.org/speakfm-stream",
  wordPressBaseUrl:
    import.meta.env.VITE_WORDPRESS_BASE_URL || defaultWordPressBaseUrl,
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL || "",
  contactFormEndpoint: import.meta.env.VITE_CONTACT_FORM_ENDPOINT || "",
};

export const wordPressPostsUrl = `${siteConfig.wordPressBaseUrl}/wp-json/wp/v2/posts`;
