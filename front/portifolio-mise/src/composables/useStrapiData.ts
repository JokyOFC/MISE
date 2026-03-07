import { ref, onMounted, type Ref } from 'vue';
import {
  isStrapiEnabled,
  fetchExperiences,
  fetchHowCanIHelp,
  fetchFooter,
  fetchHeader,
  fetchAbout,
  fetchProjects,
  type Experience,
  type HowCanIHelpConfig,
  type FooterConfig,
  type HeaderConfig,
  type AboutConfig,
  type Project,
} from '../api/strapi';
import howCanIHelpFallback from '../data/howCanIHelp.json';
import experiencesFallback from '../data/experiences.json';
import footerFallback from '../data/footer.json';
import headerFallback from '../data/header.json';
import aboutFallback from '../data/about.json';
import projectsFallback from '../data/projects.json';

export function useHowCanIHelp(): {
  config: Ref<HowCanIHelpConfig>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
} {
  const config = ref<HowCanIHelpConfig>({
    intro: (howCanIHelpFallback as HowCanIHelpConfig).intro,
    services: (howCanIHelpFallback as HowCanIHelpConfig).services,
  });
  const loading = ref(isStrapiEnabled());
  const error = ref<Error | null>(null);

  onMounted(async () => {
    if (!isStrapiEnabled()) return;
    try {
      config.value = await fetchHowCanIHelp();
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e));
      config.value = {
        intro: (howCanIHelpFallback as HowCanIHelpConfig).intro,
        services: (howCanIHelpFallback as HowCanIHelpConfig).services,
      };
    } finally {
      loading.value = false;
    }
  });

  return { config, loading, error };
}

export function useHeader(): {
  config: Ref<HeaderConfig>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
} {
  const fallback = headerFallback as HeaderConfig & { rotatingTexts?: Array<{ text: string }> | string[] };
  const rot = fallback.rotatingTexts;
  const rotatingTexts = Array.isArray(rot)
    ? (typeof rot[0] === 'string' ? rot : (rot as Array<{ text: string }>).map((t) => t.text))
    : [];
  const config = ref<HeaderConfig>({
    fullName: fallback.fullName,
    rotatingTexts,
    mainTitle: fallback.mainTitle,
    subTitle: fallback.subTitle ?? '',
    tagline: fallback.tagline,
    buttons: fallback.buttons ?? [],
  });
  const loading = ref(isStrapiEnabled());
  const error = ref<Error | null>(null);

  onMounted(async () => {
    if (!isStrapiEnabled()) return;
    try {
      config.value = await fetchHeader();
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e));
      config.value = { fullName: fallback.fullName, rotatingTexts, mainTitle: fallback.mainTitle, subTitle: fallback.subTitle ?? '', tagline: fallback.tagline, buttons: fallback.buttons ?? [] };
    } finally {
      loading.value = false;
    }
  });

  return { config, loading, error };
}

export function useAbout(): {
  config: Ref<AboutConfig>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
} {
  const fallback = aboutFallback as AboutConfig & { profile?: { avatarUrl?: string; iconUrl?: string; grainUrl?: string } };
  const defaultProfile = {
    name: fallback.profile?.name ?? '',
    title: fallback.profile?.title ?? '',
    handle: fallback.profile?.handle ?? '',
    status: fallback.profile?.status ?? 'Online',
    contactText: fallback.profile?.contactText ?? 'Github',
    avatarUrl: fallback.profile?.avatarUrl ?? '',
    iconUrl: fallback.profile?.iconUrl ?? '',
    grainUrl: fallback.profile?.grainUrl ?? '',
  };
  const config = ref<AboutConfig>({ title: fallback.title, paragraphs: fallback.paragraphs ?? [], profile: defaultProfile });
  const loading = ref(isStrapiEnabled());
  const error = ref<Error | null>(null);

  onMounted(async () => {
    if (!isStrapiEnabled()) return;
    try {
      config.value = await fetchAbout();
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e));
      config.value = { title: fallback.title, paragraphs: fallback.paragraphs ?? [], profile: defaultProfile };
    } finally {
      loading.value = false;
    }
  });

  return { config, loading, error };
}

export function useProjects(): {
  projects: Ref<Project[]>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
} {
  const fallbackList = (projectsFallback as Array<Record<string, unknown>>).map((item, index) => ({
    id: (item.id as number) ?? index + 1,
    name: (item.name as string) ?? '',
    description: (item.description as string) ?? '',
    image: '',
    icon: (item.icon as string) ?? 'pi pi-code',
    technologies: (item.technologies as string[]) ?? [],
  })) as Project[];
  const projects = ref<Project[]>(fallbackList.map((p) => ({ ...p, image: '' })));
  const loading = ref(isStrapiEnabled());
  const error = ref<Error | null>(null);

  onMounted(async () => {
    if (!isStrapiEnabled()) return;
    try {
      projects.value = await fetchProjects();
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e));
      projects.value = fallbackList.map((p) => ({ ...p, image: '' }));
    } finally {
      loading.value = false;
    }
  });

  return { projects, loading, error };
}

export function useExperiences(): {
  experiences: Ref<Experience[]>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
} {
  const experiences = ref<Experience[]>(
    (experiencesFallback as Array<Record<string, unknown>>).map((item, index) => ({
      id: (item.id as number) ?? index,
      company: item.company as string,
      role: item.role as string,
      period: item.period as string,
      location: item.location as string,
      description: item.description as string,
      technologies: (item.technologies as string[]) ?? [],
    }))
  );
  const loading = ref(isStrapiEnabled());
  const error = ref<Error | null>(null);

  onMounted(async () => {
    if (!isStrapiEnabled()) return;
    try {
      experiences.value = await fetchExperiences();
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e));
      experiences.value = (experiencesFallback as Experience[]).map((item, index) => ({
        ...item,
        id: item.id ?? index,
      }));
    } finally {
      loading.value = false;
    }
  });

  return { experiences, loading, error };
}

export function useFooter(): {
  config: Ref<FooterConfig>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
} {
  const fallback = footerFallback as FooterConfig;
  const config = ref<FooterConfig>({
    socialLinks: fallback.socialLinks ?? [],
    ctaText: fallback.ctaText ?? 'Entre em contato para conversarmos sobre seu próximo projeto.',
    copyright: fallback.copyright ?? `© ${new Date().getFullYear()} Todos os direitos reservados.`,
  });
  const loading = ref(isStrapiEnabled());
  const error = ref<Error | null>(null);

  onMounted(async () => {
    if (!isStrapiEnabled()) return;
    try {
      config.value = await fetchFooter();
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e));
      config.value = {
        socialLinks: fallback.socialLinks ?? [],
        ctaText: fallback.ctaText ?? config.value.ctaText,
        copyright: fallback.copyright ?? config.value.copyright,
      };
    } finally {
      loading.value = false;
    }
  });

  return { config, loading, error };
}
