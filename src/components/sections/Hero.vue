<template>
  <div class="hero-wrapper">
    <div class="beams-bg">
      <Beams
        :beam-width="4"
        :beam-height="30"
        :beam-number="24"
        :light-color="'#ffffff'"
        :speed="1"
        :noise-intensity="1.75"
        :scale="0.3"
        :rotation="30"
      />
    </div>
    <div class="hero-content">
      <header class="hero-header">
        <BlurText
          :text="blurText"
          class="hero-title"
          :delay="200"
          class-name="hero-title"
          animate-by="words"
          direction="top"
          :threshold="0.1"
          root-margin="0px"
          :step-duration="0.35"
          @animation-complete="handleAnimationComplete"
        />
      </header>
      <div>
        <p class="hero-description">
          <strong>Litlynx</strong> is your trusted partner for modern <em>frontend web development</em>. We help
          companies design, build, and optimize powerful software solutions — with clean code, future-ready tech, and
          long-term support. Ready to launch, grow, or transform? Let's build something brilliant together.
        </p>
        <nav class="hero-socials" aria-label="Social media links">
          <a
            href="https://linkedin.com/in/jorge-miranda-dev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Connect with us on LinkedIn"
          >
            <img :src="linkedinSrc" alt="LinkedIn" class="icon" />
          </a>
          <a
            href="https://github.com/litlynx"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View our projects on GitHub"
          >
            <img :src="githubSrc" alt="GitHub" class="icon large" />
          </a>
          <a
            href="https://app.xolo.io/profile/jorgemiranda"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hire us through Xolo"
          >
            <img :src="hireProfileSrc" alt="Xolo Hire" class="icon" />
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Beams from "../vue-bits/Beams/Beams.vue";
import BlurText from "../vue-bits/BlurText/BlurText.vue";

const props = defineProps({
  linkedinSrc: String,
  githubSrc: String,
  hireProfileSrc: String,
});

const LogoSrc = props.logoSrc;
const linkedinSrc = props.linkedinSrc;
const githubSrc = props.githubSrc;
const hireProfileSrc = props.hireProfileSrc;

const blurText = "Front-End Development for your company";

const handleAnimationComplete = () => {
  console.log("Animation complete");
};
</script>

<style scoped>
.hero-wrapper {
  position: relative;
  width: 100%;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: start;
  overflow: hidden;
  background: #000;
}
.beams-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}
.hero-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 700px;
  margin-top: 100px;
  padding: 2rem 1.5rem;
  text-align: center;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 2rem;
}
.hero-header {
  width: 100%;
}
.hero-title {
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}
.hero-title span {
  display: block;
}
.hero-description {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  font-weight: 400;
  line-height: 1.6;
  text-align: left;
}
.hero-socials {
  display: flex;
  gap: 1.5rem;
  justify-content: start;
  align-items: center;
}
.icon {
  width: 28px;
  height: 28px;
  filter: brightness(0) invert(1);
  transition: opacity 0.2s;
  opacity: 0.85;
}
.icon.large {
  width: 30px;
  height: 30px;
  filter: none;
}
.icon:hover {
  opacity: 1;
}
@media (min-width: 768px) {
  .hero-title {
    font-size: 3.5rem;
  }
  .hero-content {
    padding: 3rem 2rem;
  }
}
</style>
