const defaultWordPressBaseUrl = "https://www.radiocomnetu.org/speakfm";

export const siteConfig = {
  streamUrl:
    process.env.VUE_APP_STREAM_URL ||
    "https://www.radiocomnetu.org/speakfm-stream",
  wordPressBaseUrl:
    process.env.VUE_APP_WORDPRESS_BASE_URL || defaultWordPressBaseUrl,
  contactEmail: process.env.VUE_APP_CONTACT_EMAIL || "",
  contactFormEndpoint: process.env.VUE_APP_CONTACT_FORM_ENDPOINT || "",
};

export const wordPressPostsUrl = `${siteConfig.wordPressBaseUrl}/wp-json/wp/v2/posts`;
