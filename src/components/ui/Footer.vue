<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  logoSrc: String,
  linkedinSrc: String,
  githubSrc: String,
  xoloHireSrc: String,
});

const LogoSrc = props.logoSrc;
const linkedinSrc = props.linkedinSrc;
const githubSrc = props.githubSrc;
const xoloHireSrc = props.xoloHireSrc;

const socialLogos = computed(() => [
  { name: "Linkedin", src: linkedinSrc, link: "https://linkedin.com/in/jorge-miranda-dev" },
  { name: "Github", src: githubSrc, link: "https://github.com/litlynx" },
  {
    name: "Xolo Hire",
    src: xoloHireSrc,
    link: "https://app.xolo.io/profile/jorgemiranda",
  },
]);

const contactInfo = ref({
  email: "hello@litlynx.com",
});

const currentYear = computed(() => new Date().getFullYear());
</script>

<template>
  <section class="px-5 pt-8">
    <div class="w-full max-w-[600px] mx-auto">
      <div class="px-[15px] bg-dark text-gray py-[55px] lg:px-[60px] sm:rounded-t-[15px]">
        <div>
          <div class="flex flex-col lg:flex-row gap-7 items-center justify-between">
            <picture class="w-auto h-[50px] relative justify-start">
              <a href="/">
                <img :src="LogoSrc" alt="Logo for Litlynx Brand" class="w-full h-full object-contain" />
              </a>
            </picture>
            <ul class="flex gap-5">
              <li v-for="logo in socialLogos" :key="logo.name">
                <a :href="logo.link" target="_blank">
                  <picture>
                    <img :src="logo.src" :alt="logo.name" class="w-[35px] h-[35px] text-white" />
                  </picture>
                </a>
              </li>
            </ul>
          </div>

          <div class="flex flex-col lg:flex-row mt-[66px] mb-[51px]">
            <div
              class="flex text-center lg:text-start flex-col lg:flex-row gap-5 items-center justify-center lg:justify-start"
            >
              <h3 class="text-center md:text-left text-2xl text-cyan-400">Contact us</h3>
              <span>{{ contactInfo.email }}</span>
            </div>
          </div>
        </div>

        <div class="h-[1px] bg-gray mb-5"></div>
        <div class="text-sm flex flex-col lg:flex-row justify-center mt-4 text-center md:justify-between md:mt-0">
          <span>
            {{ currentYear }} @ Litlynx - Made With
            <a class="underline" target="_blank" href="https://astro.build">Astro</a>
            &
            <a class="underline" target="_blank" href="https://vuejs.org">Vue</a> </span
          >&nbsp;
        </div>
      </div>
    </div>
  </section>
</template>
