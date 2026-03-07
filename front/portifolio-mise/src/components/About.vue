<script setup lang="ts">
    import { computed } from 'vue';
    import ProfileCard from "./ProfileCard/ProfileCard.vue";
    import personImg from "../assets/person.png";
    import iconPatternImg from "../assets/iconpattern.png";
    import grainImg from "../assets/grain.webp";
    import { useAbout } from '../composables/useStrapiData';

    const { config: aboutConfig } = useAbout();

    const avatarUrl = computed(() => aboutConfig.value.profile.avatarUrl || personImg);
    const iconUrl = computed(() => aboutConfig.value.profile.iconUrl || iconPatternImg);
    const grainUrl = computed(() => aboutConfig.value.profile.grainUrl || grainImg);

    const handleContactClick = () => {
        console.log('Contact button clicked!');
    };
</script>

<template>
  <div class="about-container">
    <div class="about-content">
      <h1 class="about-title">{{ aboutConfig.title }}</h1>
      <div class="about-text-wrapper">
        <p
          v-for="(p, i) in aboutConfig.paragraphs"
          :key="i"
          class="about-text"
          :class="{ 'about-text--highlight': p.highlight }"
          v-html="p.content"
        />
      </div>
    </div>
    <div class="profile-card-container">
        <ProfileCard
            :name="aboutConfig.profile.name"
            :title="aboutConfig.profile.title"
            :handle="aboutConfig.profile.handle"
            :status="aboutConfig.profile.status"
            :contact-text="aboutConfig.profile.contactText"
            :avatar-url="avatarUrl"
            :icon-url="iconUrl"
            :grain-url="grainUrl"
            :show-user-info="true"
            :show-behind-gradient="true"
            :enable-tilt="true"
            @contact-click="handleContactClick"
        />
    </div>
  </div>
</template>

<style scoped>
.about-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0b0b0b;
  padding: 3rem 7vw;
  box-sizing: border-box;
  gap: 2.5rem;
}

.about-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1.6rem;
  flex: 1.4 1 0;
  max-width: 760px;
}

.about-title {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 600;
  color: white;
  margin: 0;
}

.about-text-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.about-text {
  font-size: clamp(0.95rem, 1.8vw, 1.15rem);
  line-height: 1.7;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.92);
  text-align: left;
  margin: 0;
}

.about-text strong {
  color: white;
  font-weight: 600;
}

.about-text--highlight {
  color: white;
  font-weight: 500;
  padding-left: 1rem;
  border-left: 3px solid rgba(255, 255, 255, 0.4);
}

.profile-card-container {
  flex: 1 1 0;
  max-width: 420px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 1024px) {
  .about-container {
    gap: 2.5rem;
  }
}

@media (max-width: 768px) {
  .about-container {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 3rem 1.5rem;
    gap: 2rem;
  }

  .about-content {
    max-width: 100%;
  }

  .about-text {
    line-height: 1.65;
  }

  .about-text--highlight {
    padding-left: 0.75rem;
  }

  .profile-card-container {
    max-width: 320px;
  }
}

@media (max-width: 480px) {
  .about-container {
    padding: 2.5rem 1.25rem;
  }

  .about-title {
    font-size: 1.75rem;
  }
}
</style>
