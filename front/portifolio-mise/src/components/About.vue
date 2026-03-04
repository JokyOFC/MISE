<script setup lang="ts">

    import ProfileCard from "./ProfileCard/ProfileCard.vue";

    const handleContactClick = () => {
        console.log('Contact button clicked!');
    };

</script>

<template>
  <div class="about-container">
    <div class="about-content">
      <h1 class="about-title">SOBRE MIM</h1>
      <p class="about-text">
        Desenvolvedor Full Stack apaixonado por tecnologia e programação.
      </p>
    </div>
    <div class="profile-card-container">
        <ProfileCard
            name="Joaquim E."
            title="Software Engineer"
            handle="JokyOFC"
            status="Online"
            contact-text="Github"
            avatar-url="/src/assets/person.png"
            icon-url="/src/assets/iconpattern.png"
            grain-url="/src/assets/grain.webp"
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
  height: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: #0b0b0b;
  padding-left: 3vw;
}

.about-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 2rem;
  padding: 3em 5em;
  max-width: 1200px;
}

.about-title {
  font-size: 4rem;
  font-weight: 600;
  color: white;
  text-align: center;
  margin: 0;
}

.about-text {
  font-size: 1.5rem;
  font-weight: 400;
  color: white;
  text-align: justify;
  margin: 0;
}

.profile-card-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
