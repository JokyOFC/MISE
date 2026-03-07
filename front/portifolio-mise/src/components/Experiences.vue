<script setup lang="ts">
import AnimatedContent from './AnimatedContent/AnimatedContent.vue';
import DotGrid from './DotGrid/DotGrid.vue';
import { useExperiences } from '../composables/useStrapiData';

const { experiences } = useExperiences();
</script>

<template>
  <section class="experiences-section">
    <div class="dot-grid-container">
      <DotGrid
        :dot-size="10"
        :gap="28"
        base-color="#0b0b0b"
        active-color="#0F4C5C"
        :proximity="150"
        :speed-trigger="100"
        :shock-radius="250"
        :shock-strength="5"
        :max-speed="5000"
        :resistance="750"
        :return-duration="1.5"
        class-name="custom-dot-grid"
      />
    </div>

    <div class="experiences-inner">
      <div class="experiences-title">
        <AnimatedContent
          :distance="80"
          direction="vertical"
          :reverse="false"
          :duration="0.8"
          ease="power3.out"
          :initial-opacity="0"
          :animate-opacity="true"
          :scale="1"
          :threshold="0.1"
          :delay="0"
        >
          <span>EXPERIÊNCIAS</span>
        </AnimatedContent>
      </div>

      <div class="experiences-timeline-container">
        <div class="experiences-timeline-line" />

        <div
          v-for="(exp, index) in experiences"
          :key="exp.id"
          class="experiences-item"
          :class="{
            'experiences-item--left': index % 2 === 0,
            'experiences-item--right': index % 2 !== 0
          }"
        >
          <div class="experiences-dot" />

          <div class="experiences-card">
            <div class="experiences-card-header">
              <p class="experiences-company">
                {{ exp.company }}
              </p>
              <p class="experiences-role">
                {{ exp.role }}
              </p>
            </div>

            <div class="experiences-meta">
              <span class="experiences-period">
                {{ exp.period }}
              </span>
              <span class="experiences-location">
                {{ exp.location }}
              </span>
            </div>

            <p class="experiences-description">
              {{ exp.description }}
            </p>

            <div class="experiences-technologies">
              <span
                v-for="tech in exp.technologies"
                :key="tech"
                class="experiences-technology-pill"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.experiences-section {
  position: relative;
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  padding: 5rem clamp(2rem, 6vw, 6rem);
  box-sizing: border-box;
  background-color: #000;
  color: #ffffff;
  overflow: hidden;
}

.dot-grid-container {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
}

.experiences-inner {
  position: relative;
  width: 100%;
  z-index: 1;
}

.experiences-title {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: clamp(3rem, 6vh, 4.5rem);
}

.experiences-title span {
  font-size: clamp(1.8rem, 4vw, 3.5rem);
  font-weight: 600;
  letter-spacing: 0.15em;
}

.experiences-timeline-container {
  position: relative;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 1rem 0 2rem;
}

.experiences-timeline-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.55),
    rgba(255, 255, 255, 0.15)
  );
  transform: translateX(-50%);
  pointer-events: none;
}

.experiences-item {
  position: relative;
  display: flex;
  margin: 1.75rem 0;
}

.experiences-item--left {
  justify-content: flex-end;
}

.experiences-item--right {
  justify-content: flex-start;
}

.experiences-dot {
  position: absolute;
  top: 1.1rem;
  left: 50%;
  width: 14px;
  height: 14px;
  border-radius: 999px;
  background: #0f4c5c;
  border: 3px solid #ffffff;
  transform: translateX(-50%);
  box-shadow:
    0 0 0 2px rgba(15, 76, 92, 0.55),
    0 0 18px rgba(15, 76, 92, 0.7);
}

.experiences-card {
  position: relative;
  width: 46%;
  max-width: 480px;
  border-radius: 1.25rem;
  padding: 1.4rem 1.7rem 1.4rem;
  background: radial-gradient(circle at top left, #1c3a4b 0, #050608 55%, #050608 100%);
  border: 1px solid rgba(255, 255, 255, 0.09);
  box-shadow:
    0 18px 45px rgba(0, 0, 0, 0.7),
    0 0 0 1px rgba(255, 255, 255, 0.02);
}

.experiences-item--left .experiences-card {
  margin-right: auto;
}

.experiences-item--right .experiences-card {
  margin-left: auto;
}

.experiences-card-header {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  margin-bottom: 0.5rem;
}

.experiences-company {
  font-size: clamp(1rem, 1.4vw, 1.25rem);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.experiences-role {
  font-size: clamp(0.9rem, 1.2vw, 1.1rem);
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
}

.experiences-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 0.75rem;
  font-size: 0.78rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.75rem;
}

.experiences-period {
  padding-right: 0.75rem;
  border-right: 1px solid rgba(255, 255, 255, 0.18);
}

.experiences-location {
  padding-left: 0.5rem;
}

.experiences-description {
  font-size: 0.86rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.88);
  margin-bottom: 0.85rem;
}

.experiences-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 0.5rem;
}

.experiences-technology-pill {
  display: inline-block;
  padding: 0.25rem 0.6rem;
  font-size: 0.72rem;
  font-weight: 500;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 999px;
  white-space: nowrap;
  backdrop-filter: blur(8px);
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.experiences-technology-pill:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.32);
  transform: translateY(-1px);
}

@media (max-width: 1024px) {
  .experiences-section {
    padding-inline: clamp(1.5rem, 5vw, 3rem);
  }

  .experiences-card {
    width: 48%;
  }
}

@media (max-width: 768px) {
  .experiences-section {
    padding: 4rem 1.5rem 3.5rem;
  }

  .experiences-timeline-line {
    left: 10px;
  }

  .experiences-dot {
    left: 10px;
    transform: translateX(-50%);
  }

  .experiences-item {
    justify-content: flex-start;
    padding-left: 1.75rem;
  }

  .experiences-card,
  .experiences-item--left .experiences-card,
  .experiences-item--right .experiences-card {
    width: 100%;
    margin: 0;
  }
}

@media (max-width: 480px) {
  .experiences-section {
    padding: 3.5rem 1.25rem 3rem;
  }

  .experiences-title span {
    font-size: 1.6rem;
  }

  .experiences-card {
    padding: 1.1rem 1.2rem 1.2rem;
  }

  .experiences-description {
    font-size: 0.8rem;
  }

  .experiences-technology-pill {
    font-size: 0.7rem;
  }
}
</style>

