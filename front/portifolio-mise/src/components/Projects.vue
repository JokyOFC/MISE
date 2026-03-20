<script setup lang="ts">
    import { ref, computed, onMounted, nextTick, useTemplateRef } from 'vue';
    import { useWindowSize } from '@vueuse/core';
    import { gsap } from 'gsap';
    import CardSwap from './CardSwap/CardSwap.vue';
    import AnimatedContent from './AnimatedContent/AnimatedContent.vue';
    import { useI18n } from 'vue-i18n';
    import { useProjects } from '../composables/useStrapiData';
    import project1Image from '../assets/projects/project_1.png';
    import project2Image from '../assets/projects/project_2.png';
    import project3Image from '../assets/projects/project_3.png';

    const { t } = useI18n();
    const defaultImages = [project1Image, project2Image, project3Image];
    const { projects } = useProjects();
    const projectsWithImages = computed(() =>
        projects.value.map((p, i) => ({
            ...p,
            image: p.image || defaultImages[i] || ''
        }))
    );

    // Estado para rastrear qual projeto está na frente (índice na ordem do CardSwap)
    const currentProjectIndex = ref(0);
    const isInitialized = ref(false);
    
    // Refs para animação do título, descrição e pastilhas
    const titleRef = useTemplateRef<HTMLParagraphElement>('titleRef');
    const descriptionRef = useTemplateRef<HTMLParagraphElement>('descriptionRef');
    const technologiesRef = useTemplateRef<HTMLDivElement>('technologiesRef');

    // Proporção de cada imagem (width/height) para o card acompanhar e evitar faixas
    const imageAspect = ref<Record<number, number>>({});
    const onImageLoad = (e: Event, projectId: number) => {
        const img = e.target as HTMLImageElement;
        if (img?.naturalWidth && img?.naturalHeight) {
            imageAspect.value = { ...imageAspect.value, [projectId]: img.naturalWidth / img.naturalHeight };
        }
    };

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
        const animOut = [titleRef.value, descriptionRef.value];
        if (technologiesRef.value) animOut.push(technologiesRef.value);
        if (animOut.length) {
            gsap.to(animOut, {
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
        const animIn = [titleRef.value, descriptionRef.value];
        if (technologiesRef.value) animIn.push(technologiesRef.value);
        if (animIn.length) {
            gsap.set(animIn, {
                opacity: 0,
                y: 15
            });
            
            gsap.to(animIn, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out',
                stagger: 0.1
            });
        }
    };

    const currentProject = computed(() => {
        const list = projectsWithImages.value;
        return list[currentProjectIndex.value] || list[0];
    });

    const { width: windowWidth } = useWindowSize();

    /** Dimensões e espaçamento do stack alinhados à largura real da viewport (evita 1100px + scale no mobile). */
    const cardSwapLayout = computed(() => {
        const w = windowWidth.value || 1200;
        const pad = 24;
        if (w <= 480) {
            const cw = Math.min(340, Math.max(260, w - pad * 2));
            const ch = Math.round(cw * 0.58);
            return {
                width: cw,
                height: ch,
                cardDistance: 22,
                verticalDistance: 26,
                skewAmount: 3
            };
        }
        if (w <= 768) {
            const cw = Math.min(520, Math.max(300, w - pad * 2));
            const ch = Math.round(cw * 0.56);
            return {
                width: cw,
                height: ch,
                cardDistance: 34,
                verticalDistance: 42,
                skewAmount: 4
            };
        }
        if (w <= 1024) {
            return {
                width: Math.min(780, w - 80),
                height: 440,
                cardDistance: 48,
                verticalDistance: 56,
                skewAmount: 5
            };
        }
        /* Desktop: 1100×600 quando cabe; encolhe só o necessário para não cortar */
        const gutter = 140;
        const cw = Math.min(1100, Math.max(720, w - gutter));
        const ch = Math.round(cw * (600 / 1100));
        return {
            width: cw,
            height: ch,
            cardDistance: 60,
            verticalDistance: 70,
            skewAmount: 6
        };
    });

    /** Largura/altura do wrapper = área do stack (filho é absolute; sem isto o bloco colapsa). */
    const cardsOffsetStyle = computed(() => {
        const { width, height } = cardSwapLayout.value;
        return {
            width: `${width}px`,
            maxWidth: '100%',
            minHeight: `${height}px`
        };
    });

    onMounted(() => {
        // Inicializa a animação do título e descrição
        nextTick(() => {
            const els = [titleRef.value, descriptionRef.value];
            if (technologiesRef.value) els.push(technologiesRef.value);
            if (els.length) {
                gsap.set(els, { opacity: 1, y: 0 });
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
            <span>{{ t('sections.projects') }}</span>
        </AnimatedContent>
    </div>
    <div class="projects-description">
        <p ref="titleRef" class="projects-description-title">{{ currentProject?.name.toUpperCase() }}</p>
        <p ref="descriptionRef" class="projects-description-text">{{ currentProject?.description }}</p>
        <div ref="technologiesRef" class="projects-technologies">
            <span
                v-for="tech in (currentProject?.technologies ?? [])"
                :key="tech"
                class="technology-pill"
            >
                {{ tech }}
            </span>
        </div>
    </div>
  <div class="projects-container">
      <div
        class="projects-cards-offset"
        :style="cardsOffsetStyle"
      >
      <CardSwap
      :card-distance="cardSwapLayout.cardDistance"
      :vertical-distance="cardSwapLayout.verticalDistance"
      :delay="10000"
      :skew-amount="cardSwapLayout.skewAmount"
      easing="elastic"
      :pause-on-hover="true"
      @card-click="handleCardClick"
      @order-changed="handleOrderChanged"
      :width="cardSwapLayout.width"
      :height="cardSwapLayout.height"
    >
    <template v-for="(project, index) in projectsWithImages" :key="project.id" #[`card-${index}`]>
      <div class="card-wrapper">
        <div class="card-header">
          <div class="card-inner">
            <i :class="project.icon + ' card-icon'"></i>
            <span>{{ project.name.toUpperCase() }}</span>
          </div>
        </div>
        <div
          class="card-body"
          :style="imageAspect[project.id] ? { aspectRatio: String(imageAspect[project.id]) } : undefined"
        >
          <img
            :src="project.image"
            :alt="project.name"
            class="project-image mise-themed-graphic"
            @load="onImageLoad($event, project.id)"
          />
        </div>
      </div>
    </template>
    </CardSwap>
      </div>
  </div>
</template>

<style scoped>
.projects-container {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2em 3em;
  box-sizing: border-box;
  overflow: visible;
  position: absolute;
  inset: 0;
  margin-bottom: -20vh;
  z-index: 10;
}

@media (min-width: 769px) {
  .projects-container {
    justify-content: flex-end;
    align-items: flex-end;
    /* Abaixo do “PROJETOS” + folga para o stack 3D (cards sobem em relação ao contentor) */
    padding-top: clamp(9.5rem, 24vh, 14.5rem);
    padding-bottom: 10vh;
  }

  .projects-description {
    justify-content: flex-start;
    padding-top: clamp(9.5rem, 24vh, 14.5rem);
  }

  /* O stack ancora em bottom:0 e os offsets GSAP projetam para cima — reserva espaço extra só na coluna dos cards */
  .projects-cards-offset {
    padding-top: clamp(3.75rem, 9.5vh, 5.75rem);
  }
}

/* Stack à direita; sem translateY grande (empurrava tudo para baixo e cortava em baixo) */
.projects-cards-offset {
  position: relative;
  flex: 0 0 auto;
  box-sizing: border-box;
  transform: none;
  display: block;
  pointer-events: none;
}

.projects-cards-offset :deep(.card-swap-container) {
  pointer-events: auto;
}

.card-wrapper {
  width: 100%;
  height: auto;
  max-height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-self: center;
}

.card-header {
  border-radius: 1rem;
  border-bottom: 1.5px solid var(--mise-project-card-border);
  background: var(--mise-project-card-header);
  flex-shrink: 0;
}

.card-inner {
  margin: 0.7rem;
  display: flex;
  align-items: center;
  color: var(--mise-text-heading);
}

.card-icon {
  margin-right: 0.5rem;
  color: var(--mise-accent);
}

.card-body {
  position: relative;
  padding: 0.5rem;
  width: 100%;
  flex: none;
  overflow: hidden;
  border-radius: 15px;
  aspect-ratio: 16 / 9;
}

.project-image {
  display: block;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  object-fit: cover;
  object-position: center;
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
  padding-top: clamp(2rem, 10vh, 13vh);
  pointer-events: none;
  /* Acima dos cards (projects-container z-index 10) para o título não ser tapado */
  z-index: 12;
}

.projects-title span {
  font-size: clamp(1.75rem, 5vw, 4rem);
  font-weight: 600;
  color: var(--mise-text-heading);
}

.projects-description {
  position: absolute;
  top: 0;
  left: 0;
  width: 38%;
  max-width: 520px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.75rem 1rem;
  padding: 2rem 0 2rem clamp(2rem, 6vw, 9rem);
  z-index: 2;
  box-sizing: border-box;
}

.projects-description-title {
  font-size: clamp(1.1rem, 2vw, 2rem);
  font-weight: 600;
  color: var(--mise-text-heading);
  line-height: 1.25;
}

.projects-description-text {
  font-size: clamp(0.875rem, 1.2vw, 1.2rem);
  font-weight: 400;
  color: var(--mise-text);
  line-height: 1.5;
}

.projects-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 0.5rem;
  margin-top: 0.25rem;
}

.technology-pill {
  display: inline-block;
  padding: 0.25rem 0.6rem;
  font-size: clamp(0.7rem, 1.5vw, 0.85rem);
  font-weight: 500;
  color: var(--mise-text-heading);
  background: var(--mise-project-pill-bg);
  border: 1px solid var(--mise-project-pill-border);
  border-radius: 9999px;
  white-space: nowrap;
}

.technology-pill:hover {
  background: color-mix(in srgb, var(--mise-project-pill-bg) 80%, var(--mise-accent) 12%);
  border-color: color-mix(in srgb, var(--mise-project-pill-border) 70%, var(--mise-accent) 30%);
}

/* Tablet */
@media (max-width: 1024px) {
  .projects-container {
    padding: 1.5em 2em;
  }

  .projects-description {
    width: 42%;
    padding-left: clamp(1.5rem, 4vw, 4rem);
  }

  .projects-cards-offset {
    transform: none;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .projects-container {
    padding-top: clamp(10.25rem, 25vh, 15rem);
  }

  .projects-description {
    padding-top: clamp(10.25rem, 25vh, 15rem);
  }
}

/* Mobile landscape / tablet portrait */
@media (max-width: 768px) {
  .projects-container {
    padding: 1.25em 1.5em;
    align-items: flex-end;
    justify-content: center;
    overflow-x: hidden;
  }

  .projects-cards-offset {
    flex: 1 1 auto;
    width: 100% !important;
    max-width: 100% !important;
    min-height: min(48vh, 380px) !important;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    transform: none;
    padding-bottom: env(safe-area-inset-bottom, 0);
  }

  .projects-title {
    padding-top: 1.5rem;
  }

  .projects-description {
    width: 100%;
    max-width: none;
    height: auto;
    top: 0;
    left: 0;
    right: 0;
    justify-content: flex-start;
    padding: 4.5rem 1.5rem 0.75rem;
    gap: 0.5rem 0.75rem;
  }

  .projects-description-title {
    font-size: 1.05rem;
  }

  .projects-description-text {
    font-size: 0.875rem;
    max-width: 42rem;
  }

  .technology-pill {
    padding: 0.2rem 0.5rem;
    font-size: 0.75rem;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .projects-container {
    padding: 0.75rem 0.75rem 0.5rem;
    align-items: flex-end;
    justify-content: center;
  }

  .projects-cards-offset {
    flex: 1 1 auto;
    width: 100% !important;
    max-width: 100% !important;
    min-height: min(44vh, 340px) !important;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    transform: none;
  }

  .projects-title {
    padding-top: 1rem;
  }

  .projects-title span {
    font-size: 1.5rem;
  }

  .projects-description {
    width: 100%;
    max-width: none;
    padding: 3.75rem 1rem 0.5rem;
    justify-content: flex-start;
    gap: 0.4rem 0.6rem;
  }

  .projects-description-title {
    font-size: 1rem;
  }

  .projects-description-text {
    font-size: 0.8rem;
    line-height: 1.45;
  }

  .projects-technologies {
    gap: 0.35rem;
  }

  .technology-pill {
    font-size: 0.7rem;
    padding: 0.18rem 0.45rem;
  }
}

</style>