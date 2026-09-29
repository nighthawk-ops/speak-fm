<template>
  <v-container id="contactUs" v-reveal fluid class="footer" min-height="100vh">
    <div class="overlay">
      <div class="d-flex flex-column ga-4 mt-4">
        <div>
          <v-img
            height="250"
            src="../assets/speakfmlogo.png"
            max-width="auto"
          ></v-img>
          <div class="d-flex flex-column align-center">
            <h1>SPEAK FM</h1>
            <h3>VOICES UNLIMITED</h3>
          </div>
        </div>
        <h1 class="text-center">Get in touch</h1>
        <br />
        <div class="d-flex ga-6">
          <v-icon size="40">mdi-phone</v-icon>
          <h3>+256-0417-436895</h3>
        </div>

        <div class="d-flex ga-6">
          <v-icon size="40">mdi-email</v-icon>
          <h3>speakfm@fowode.org</h3>
        </div>

        <div class="d-flex ga-6">
          <v-icon size="40">mdi-map-marker</v-icon>
          <h3>
            Plot 15, Ali Openy, Tegwana.<br />
            P.O Box 144, Gulu City
          </h3>
        </div>

        <div class="d-flex ga-6">
          <v-icon size="40">mdi-alarm</v-icon>
          <div>
            <h3>Monday-Sundays</h3>
            <h4>8am- 9pm</h4>
          </div>
        </div>
      </div>

      <div class="d-flex flex-column align-right justify-space-evenly">
        <v-btn
          variant="text"
          class="hidden-sm-and-down text-white text-right"
          href="#about"
          >About Us</v-btn
        >
        <v-btn
          variant="text"
          class="hidden-sm-and-down text-white text-right"
          href="#schedule"
          >Schedule</v-btn
        >
        <v-btn
          variant="text"
          class="hidden-sm-and-down text-white text-right"
          href="#services"
          >Services</v-btn
        >
        <v-btn variant="text" class="hidden-sm-and-down text-white" href="#team"
          >Team</v-btn
        >
        <v-btn
          variant="text"
          class="hidden-sm-and-down text-white"
          href="#contactUs"
          >Contact Us</v-btn
        >
        <br />
        <div class="d-flex justify-space-between pa-20">
          <v-icon size="20">mdi-linkedin</v-icon>
          <v-icon size="20">mdi-facebook</v-icon>
          <v-icon size="20">mdi-youtube</v-icon>
          <v-icon size="20">mdi-twitter</v-icon>
        </div>
      </div>

      <v-form class="contact-form" @submit.prevent="submitForm">
        <h2>Send feedback</h2>
        <v-text-field
          v-model.trim="form.name"
          label="Name"
          :error-messages="errors.name"
          required
          variant="outlined"
        />
        <v-text-field
          v-model.trim="form.email"
          label="Email"
          type="email"
          :error-messages="errors.email"
          required
          variant="outlined"
        />
        <v-text-field
          v-model.trim="form.subject"
          label="Subject"
          :error-messages="errors.subject"
          variant="outlined"
        />
        <v-textarea
          v-model.trim="form.message"
          label="Message"
          :counter="1000"
          :error-messages="errors.message"
          required
          variant="outlined"
        />
        <input
          v-model="form.website"
          class="contact-form__honeypot"
          tabindex="-1"
          autocomplete="off"
          aria-hidden="true"
          variant="outlined"
        />
        <v-btn
          type="submit"
          color="primary"
          :loading="submitting"
          :disabled="submitting"
          >Send Feedback</v-btn
        >
        <p
          v-if="feedbackMessage"
          class="contact-form__message"
          aria-live="polite"
        >
          {{ feedbackMessage }}
        </p>
      </v-form>
    </div>
  </v-container>
</template>

<script setup>
import { reactive, ref } from "vue";
import { siteConfig } from "@/config/site";

const form = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
});
const errors = reactive({ name: [], email: [], subject: [], message: [] });
const submitting = ref(false);
const feedbackMessage = ref("");

function validate() {
  errors.name =
    form.name.length >= 2 && form.name.length <= 80
      ? []
      : ["Enter 2–80 characters."];
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ? []
    : ["Enter a valid email."];
  errors.subject =
    form.subject.length <= 120 ? [] : ["Use 120 characters or fewer."];
  errors.message =
    form.message.length >= 10 && form.message.length <= 1000
      ? []
      : ["Enter 10–1000 characters."];
  return (
    !errors.name.length &&
    !errors.email.length &&
    !errors.subject.length &&
    !errors.message.length
  );
}

async function submitForm() {
  feedbackMessage.value = "";
  if (!validate()) return;
  if (!siteConfig.contactFormEndpoint) {
    feedbackMessage.value =
      "Please configure the contact form endpoint before deployment.";
    return;
  }
  submitting.value = true;
  try {
    const response = await fetch(siteConfig.contactFormEndpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        _subject: form.subject || "Speak FM website feedback",
      }),
    });
    if (!response.ok) throw new Error("Submission failed");
    Object.assign(form, {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    });
    feedbackMessage.value =
      "Thank you for your feedback. Your message has been sent successfully.";
  } catch {
    feedbackMessage.value =
      "We couldn't send your message. Please try again or contact us directly by email.";
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped>
.footer {
  background-image: url("../assets/Speakfm-exterior.png");
  background-size: cover;
  background-position: center;
  width: 100%;
  background-color: rgb(var(--v-theme-secondary));
  position: relative;
}

.overlay {
  position: absolute;
  inset: 0;

  background: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: space-around;
  align-items: center;

  color: white;

  padding: 3rem;
}

.contact-form {
  width: min(100%, 380px);
  padding: 1.25rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.8);
  color: rgb(var(--v-theme-on-surface));
}

.contact-form__honeypot {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
}

.contact-form__message {
  margin: 1rem 0 0;
}

@media (max-width: 960px) {
  .overlay {
    position: relative;
    flex-wrap: wrap;
    gap: 2rem;
  }
  .footer {
    min-height: auto !important;
  }
}
</style>
