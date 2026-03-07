<script setup lang="ts">
import { useHowCanIHelp } from '../composables/useStrapiData';

const { config } = useHowCanIHelp();
</script>

<template>
  <div class="how-can-i-help">
    <section class="how-can-i-help__intro">
      <h2 class="how-can-i-help__title">{{ config.intro.title }}</h2>
      <p class="how-can-i-help__description">{{ config.intro.description }}</p>
    </section>
    <ul class="how-can-i-help__services">
      <li
        v-for="(service, index) in config.services"
        :key="index"
        class="how-can-i-help__service"
      >
        <span class="how-can-i-help__service-icon" :class="service.icon" aria-hidden="true" />
        <h3 class="how-can-i-help__service-title">{{ service.title }}</h3>
        <p class="how-can-i-help__service-description">{{ service.description }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.how-can-i-help {
  width: 100%;
  min-height: 100vh;
  padding: 3rem 7vw;
  box-sizing: border-box;
  background-color: #0b0b0b;
}

.how-can-i-help__intro {
  margin-bottom: 2.5rem;
  max-width: 720px;
}

.how-can-i-help__title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 600;
  color: #fff;
  margin-bottom: 1rem;
}

.how-can-i-help__description {
  font-size: clamp(0.95rem, 2vw, 1.05rem);
  line-height: 1.6;
  color: #b0b0b0;
}

.how-can-i-help__services {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1.5rem;
  max-width: 720px;
}

.how-can-i-help__service {
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.how-can-i-help__service-icon {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  margin-bottom: 0.75rem;
  color: #0F4C5C;
}

.how-can-i-help__service-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.5rem;
}

.how-can-i-help__service-description {
  font-size: 0.95rem;
  line-height: 1.5;
  color: #b0b0b0;
  margin: 0;
}
</style>
