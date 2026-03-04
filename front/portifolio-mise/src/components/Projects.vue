<script setup lang="ts">
    import { ref, computed, onMounted, nextTick, useTemplateRef } from 'vue';
    import { gsap } from 'gsap';
    import CardSwap from './CardSwap/CardSwap.vue';
    import AnimatedContent from './AnimatedContent/AnimatedContent.vue';
    
    // Importar imagens dos projetos
    import project1Image from '../assets/projects/project_1.png';
    // Adicione mais imports conforme necessário:
    // import project2Image from '../assets/projects/project_2.png';
    // import project3Image from '../assets/projects/project_3.png';

    interface Project {
        id: number;
        name: string;
        description: string;
        image: string;
        icon: string;
    }

    const projects: Project[] = [
        {
            id: 1,
            name: 'Projeto 1',
            description: 'Descrição do primeiro projeto. Uma solução inovadora que resolve problemas complexos com tecnologia de ponta.',
            image: project1Image,
            icon: 'pi pi-circle-fill'
        },
        {
            id: 2,
            name: 'Projeto 2',
            description: 'Descrição do segundo projeto. Uma plataforma moderna desenvolvida com as melhores práticas de desenvolvimento.',
            image: project1Image, // Substitua por project2Image quando tiver a imagem
            icon: 'pi pi-code'
        },
        {
            id: 3,
            name: 'Projeto 3',
            description: 'Descrição do terceiro projeto. Uma aplicação web responsiva com foco em experiência do usuário.',
            image: project1Image, // Substitua por project3Image quando tiver a imagem
            icon: 'pi pi-sliders-h'
        }
    ];

    // Estado para rastrear qual projeto está na frente (índice na ordem do CardSwap)
    const currentProjectIndex = ref(0);
    const isInitialized = ref(false);
    
    // Refs para animação do título e descrição
    const titleRef = useTemplateRef<HTMLParagraphElement>('titleRef');
    const descriptionRef = useTemplateRef<HTMLParagraphElement>('descriptionRef');

    const handleComplete = () => {
        console.log("Animation completed!");
    };
    
    const handleCardClick = (index: number) => {
        console.log(`Card ${index} clicked`);
        // Quando um card é clicado, atualiza o índice do projeto atual
        updateProject(index);
    };

    // Handler para quando a ordem do CardSwap muda automaticamente
    const handleOrderChanged = (frontIndex: number) => {
        updateProject(frontIndex);
    };

    // Função para atualizar o projeto com animação
    const updateProject = async (newIndex: number) => {
        if (newIndex === currentProjectIndex.value && isInitialized.value) return;
        
        // Se ainda não foi inicializado, apenas atualiza sem animação
        if (!isInitialized.value) {
            currentProjectIndex.value = newIndex;
            isInitialized.value = true;
            return;
        }
        
        // Anima a saída do conteúdo atual (mais rápida)
        if (titleRef.value && descriptionRef.value) {
            gsap.to([titleRef.value, descriptionRef.value], {
                opacity: 0,
                y: -20,
                duration: 0.3,
                ease: 'power2.in'
            });
        }

        // Aguarda um pouco antes de atualizar o conteúdo
        await new Promise(resolve => setTimeout(resolve, 5));

        // Atualiza o índice
        currentProjectIndex.value = newIndex;

        // Aguarda o próximo tick para garantir que o DOM foi atualizado
        await nextTick();

        // Anima a entrada do novo conteúdo (mais rápida e simultânea)
        if (titleRef.value && descriptionRef.value) {
            gsap.set([titleRef.value, descriptionRef.value], {
                opacity: 0,
                y: 15
            });
            
            gsap.to([titleRef.value, descriptionRef.value], {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out',
                stagger: 0.1
            });
        }
    };

    // Projeto atual baseado no índice
    const currentProject = computed(() => {
        return projects[currentProjectIndex.value] || projects[0];
    });

    onMounted(() => {
        // Inicializa a animação do título e descrição
        nextTick(() => {
            if (titleRef.value && descriptionRef.value) {
                gsap.set([titleRef.value, descriptionRef.value], {
                    opacity: 1,
                    y: 0
                });
            }
        });
    });
    
</script>

<template>
    <div class="projects-title">
        <AnimatedContent
            :distance="100"
            direction="vertical"
            :reverse="false"
            :duration="0.8"
            ease="power3.out"
            :initial-opacity="0"
            :animate-opacity="true"
            :scale="1"
            :threshold="0.1"
            :delay="0"
            @complete="handleComplete"
        >
            <span>PROJETOS</span>
        </AnimatedContent>
    </div>
    <div class="projects-description">
        <p ref="titleRef" class="projects-description-title">{{ currentProject?.name.toUpperCase() }}</p>
        <p ref="descriptionRef" class="projects-description-text">{{ currentProject?.description }}</p>
    </div>
  <div class="projects-container">
      <CardSwap 
      :card-distance="60"
      :vertical-distance="70"
      :delay="10000"
      :skew-amount="6"
      easing="elastic"
      :pause-on-hover="true"
      @card-click="handleCardClick"
      @order-changed="handleOrderChanged"
      :width="900"
      :height="800"
    >
    <template v-for="(project, index) in projects" :key="project.id" #[`card-${index}`]>
      <div class="card-wrapper">
        <div class="card-header">
          <div class="card-inner">
            <i :class="project.icon + ' card-icon'"></i>
            <span>{{ project.name.toUpperCase() }}</span>
          </div>
        </div>
        <div class="card-body">
          <img :src="project.image" :alt="project.name" class="project-image" />
        </div>
      </div>
    </template>
    </CardSwap>
  </div>
</template>

<style scoped>
.projects-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3em 5em;
  box-sizing: border-box;
  overflow: hidden;
  position: absolute;
  z-index: 10;
}

.card-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-header {
  border-radius: 1rem;
  border-bottom: 1.5px solid white;
  background: linear-gradient(to top, #222222, #0b0b0b);
  flex-shrink: 0;
}

.card-inner {
  margin: 0.7rem;
  display: flex;
  align-items: center;
}

.card-icon {
  margin-right: 0.5rem;
}

.card-body {
  position: relative;
  padding: 0.5rem;
  flex: 1;
  overflow: hidden;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.projects-title {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  padding-top: 13vh;
}

.projects-title span {
  font-size: 4rem;
  font-weight: 600;
  color: white;
}

.projects-description {
  position: absolute;
  top: 0;
  left: 0;
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  padding-left: 9rem;
}

.projects-description-title {
  font-size: 2rem;
  font-weight: 600;
  color: white;
}

.projects-description-text {
  font-size: 1.2rem;
  font-weight: 400;
  color: white;
}

</style>