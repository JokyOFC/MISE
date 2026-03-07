<script setup lang="ts">
  import { computed, onMounted, onUnmounted } from 'vue';
  import Header from '../components/Header.vue';
  import StaggeredMenu from '../components/StaggeredMenu/StaggeredMenu.vue';
  import logoUrl from '../assets/logo.svg';
  import About from '../components/About.vue';
  import Projects from '../components/Projects.vue';
  import Experiences from '../components/Experiences.vue';
  import Footer from '../components/Footer.vue';
  import { useFooter } from '../composables/useStrapiData';

  const { config: footerConfig } = useFooter();

  const menuItems = [
    { label: 'Inicio', ariaLabel: 'Go to home page', link: '#inicio' },
    { label: 'Sobre', ariaLabel: 'Learn about us', link: '#sobre' },
    { label: 'Projetos', ariaLabel: 'View our services', link: '#projetos' },
    { label: 'Experiências', ariaLabel: 'View professional experiences', link: '#experiencias' },
    { label: 'Contato', ariaLabel: 'Get in touch', link: '#contato' }
  ]
  
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  const handleMenuLinkClick = (e: Event) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a.sm-panel-item');
    if (link) {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        scrollToSection(href);
        
        // Fechar o menu ao clicar no link
        const menuWrapper = document.querySelector('.staggered-menu-wrapper[data-open]');
        if (menuWrapper) {
          const toggleButton = document.querySelector('.sm-toggle') as HTMLButtonElement;
          if (toggleButton) {
            toggleButton.click();
          }
        }
      }
    }
  };

  const socialItems = computed(() =>
    (footerConfig.value.socialLinks || []).map((link) => ({
      label: link.label,
      link: link.url
    }))
  );

  const handleMenuOpen = () => console.log('Menu opened')
  const handleMenuClose = () => console.log('Menu closed')
  
  onMounted(() => {
    document.addEventListener('click', handleMenuLinkClick);
  });
  
  onUnmounted(() => {
    document.removeEventListener('click', handleMenuLinkClick);
  });
</script>

<template>
  <div class="home-container">
   <StaggeredMenu
     position="right"
     :items="menuItems"
     :social-items="socialItems"
     :display-socials="true"
     :display-item-numbering="true"
     menu-button-color="#fff"
     open-menu-button-color="#000"
     :change-menu-color-on-open="true"
     :colors="['#0A2F36', '#0F4C5C']"
     :logo-url="logoUrl"
     accent-color="#0F4C5C"
     @menu-open="handleMenuOpen"
     @menu-close="handleMenuClose"
   />
   <div id="inicio" class="header-wrapper">
     <Header/>
   </div>
   <div id="sobre" class="about-wrapper">
      <About />
   </div>
   <div id="projetos" class="projects-wrapper">
      <Projects />
   </div>
   <div id="experiencias" class="experiences-wrapper">
      <Experiences />
   </div>
   <div id="contato" class="footer-wrapper">
      <Footer />
   </div>
 </div>
</template>

<style scoped>
.home-container {
  position: relative;
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: visible;
}

.header-wrapper {
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
  scroll-snap-align: center;
  scroll-snap-stop: always;
}

.header-wrapper > * {
  pointer-events: auto;
  width: 100%;
  max-width: 100%;
}

.about-wrapper {
  position: relative;
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  z-index: 2;
  background-color: #0b0b0b;
  overflow: visible;
  scroll-snap-align: center;
  scroll-snap-stop: always;
}

.projects-wrapper {
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;
  z-index: 2;
  background-color: #000;
  overflow: visible;
  scroll-snap-align: center;
  scroll-snap-stop: always;
}

.experiences-wrapper {
  position: relative;
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  z-index: 2;
  background-color: #000;
  overflow: visible;
  scroll-snap-align: center;
  scroll-snap-stop: always;
}

.how-can-i-help-wrapper {
  position: relative;
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  z-index: 2;
  background-color: #0b0b0b;
  overflow: visible;
}

.footer-wrapper {
  position: relative;
  width: 100%;
  max-width: 100%;
  z-index: 2;
  background-color: #0b0b0b;
  padding: 4rem 0 2rem;
  overflow: visible;
}
</style>
