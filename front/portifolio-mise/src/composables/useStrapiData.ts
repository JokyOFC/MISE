import { ref, onMounted, watch, type Ref } from 'vue';
import {
  isStrapiEnabled,
  fetchExperiences,
  fetchHowCanIHelp,
  fetchFooter,
  fetchHeader,
  fetchAbout,
  fetchProjects,
  type StrapiContentLocale,
  type Experience,
  type HowCanIHelpConfig,
  type FooterConfig,
  type HeaderConfig,
  type AboutConfig,
  type Project,
} from '../api/strapi';
import { i18n } from '../i18n';
import howCanIHelpFallbackPt from '../data/howCanIHelp.json';
import howCanIHelpFallbackEn from '../data/howCanIHelp.en.json';
import experiencesFallbackPt from '../data/experiences.json';
import experiencesFallbackEn from '../data/experiences.en.json';
import footerFallbackPt from '../data/footer.json';
import footerFallbackEn from '../data/footer.en.json';
import headerFallbackPt from '../data/header.json';
import headerFallbackEn from '../data/header.en.json';
import aboutFallbackPt from '../data/about.json';
import aboutFallbackEn from '../data/about.en.json';
import projectsFallbackPt from '../data/projects.json';
import projectsFallbackEn from '../data/projects.en.json';

function strapiLocale(): StrapiContentLocale {
  return i18n.global.locale.value === 'en' ? 'en' : 'pt-BR';
}

function useEnglishFallbacks(): boolean {
  return i18n.global.locale.value === 'en';
}

function headerFromStatic(raw: {
  fullName: string;
  rotatingTexts?: Array<{ text: string }> | string[];
  mainTitle: string;
  subTitle?: string;
  tagline: string;
  buttons?: Array<{ label: string; url?: string }>;
}): HeaderConfig {
  const rot = raw.rotatingTexts;
  const rotatingTexts = Array.isArray(rot)
    ? typeof rot[0] === 'string'
      ? (rot as string[])
      : (rot as Array<{ text: string }>).map((t) => t.text)
    : [];
  return {
    fullName: raw.fullName,
    rotatingTexts,
    mainTitle: raw.mainTitle,
    subTitle: raw.subTitle ?? '',
    tagline: raw.tagline,
    buttons: (raw.buttons ?? []).map((b) => ({ label: b.label, url: b.url ?? '' })),
  };
}

function aboutFromStatic(
  fallback: typeof aboutFallbackPt & { profile?: { avatarUrl?: string; iconUrl?: string; grainUrl?: string } }
): AboutConfig {
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
  return {
    title: fallback.title,
    paragraphs: fallback.paragraphs ?? [],
    profile: defaultProfile,
  };
}

function footerFromStatic(raw: typeof footerFallbackPt): FooterConfig {
  return {
    socialLinks: (raw.socialLinks ?? []).map((link) => ({
      id: link.id,
      label: link.label,
      url: link.url,
    })),
    ctaText: raw.ctaText ?? '',
    copyright: raw.copyright ?? '',
  };
}

function projectsFromStatic(raw: typeof projectsFallbackPt): Project[] {
  return (raw as Array<Record<string, unknown>>).map((item, index) => ({
    id: (item.id as number) ?? index + 1,
    name: (item.name as string) ?? '',
    description: (item.description as string) ?? '',
    image: '',
    icon: (item.icon as string) ?? 'pi pi-code',
    technologies: (item.technologies as string[]) ?? [],
  }));
}

function experiencesFromStatic(raw: typeof experiencesFallbackPt): Experience[] {
  return (raw as Array<Record<string, unknown>>).map((item, index) => ({
    id: (item.id as number) ?? index,
    company: item.company as string,
    role: item.role as string,
    period: item.period as string,
    location: item.location as string,
    description: item.description as string,
    technologies: (item.technologies as string[]) ?? [],
  }));
}

export function useHowCanIHelp(): {
  config: Ref<HowCanIHelpConfig>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
} {
  const pickStatic = (): HowCanIHelpConfig => {
    const raw = useEnglishFallbacks() ? howCanIHelpFallbackEn : howCanIHelpFallbackPt;
    return {
      intro: raw.intro,
      services: raw.services ?? [],
    };
  };
  const config = ref<HowCanIHelpConfig>(pickStatic());
  const loading = ref(isStrapiEnabled());
  const error = ref<Error | null>(null);

  const load = async () => {
    config.value = pickStatic();
    if (!isStrapiEnabled()) {
      loading.value = false;
      return;
    }
    loading.value = true;
    try {
      config.value = await fetchHowCanIHelp(strapiLocale());
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e));
      config.value = pickStatic();
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => void load());
  watch(() => i18n.global.locale.value, () => void load());

  return { config, loading, error };
}

export function useHeader(): {
  config: Ref<HeaderConfig>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
} {
  const pickStatic = () =>
    headerFromStatic(useEnglishFallbacks() ? headerFallbackEn : headerFallbackPt);
  const config = ref<HeaderConfig>(pickStatic());
  const loading = ref(isStrapiEnabled());
  const error = ref<Error | null>(null);

  const load = async () => {
    config.value = pickStatic();
    if (!isStrapiEnabled()) {
      loading.value = false;
      return;
    }
    loading.value = true;
    try {
      config.value = await fetchHeader(strapiLocale());
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e));
      config.value = pickStatic();
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => void load());
  watch(() => i18n.global.locale.value, () => void load());

  return { config, loading, error };
}

export function useAbout(): {
  config: Ref<AboutConfig>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
} {
  const pickStatic = () => aboutFromStatic(useEnglishFallbacks() ? aboutFallbackEn : aboutFallbackPt);
  const config = ref<AboutConfig>(pickStatic());
  const loading = ref(isStrapiEnabled());
  const error = ref<Error | null>(null);

  const load = async () => {
    config.value = pickStatic();
    if (!isStrapiEnabled()) {
      loading.value = false;
      return;
    }
    loading.value = true;
    try {
      config.value = await fetchAbout(strapiLocale());
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e));
      config.value = pickStatic();
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => void load());
  watch(() => i18n.global.locale.value, () => void load());

  return { config, loading, error };
}

export function useProjects(): {
  projects: Ref<Project[]>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
} {
  const pickStatic = () => projectsFromStatic(useEnglishFallbacks() ? projectsFallbackEn : projectsFallbackPt);
  const projects = ref<Project[]>(pickStatic());
  const loading = ref(isStrapiEnabled());
  const error = ref<Error | null>(null);

  const load = async () => {
    projects.value = pickStatic();
    if (!isStrapiEnabled()) {
      loading.value = false;
      return;
    }
    loading.value = true;
    try {
      projects.value = await fetchProjects(strapiLocale());
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e));
      projects.value = pickStatic();
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => void load());
  watch(() => i18n.global.locale.value, () => void load());

  return { projects, loading, error };
}

export function useExperiences(): {
  experiences: Ref<Experience[]>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
} {
  const pickStatic = () =>
    experiencesFromStatic(useEnglishFallbacks() ? experiencesFallbackEn : experiencesFallbackPt);
  const experiences = ref<Experience[]>(pickStatic());
  const loading = ref(isStrapiEnabled());
  const error = ref<Error | null>(null);

  const load = async () => {
    experiences.value = pickStatic();
    if (!isStrapiEnabled()) {
      loading.value = false;
      return;
    }
    loading.value = true;
    try {
      experiences.value = await fetchExperiences(strapiLocale());
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e));
      experiences.value = pickStatic();
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => void load());
  watch(() => i18n.global.locale.value, () => void load());

  return { experiences, loading, error };
}

export function useFooter(): {
  config: Ref<FooterConfig>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
} {
  const pickStatic = () => footerFromStatic(useEnglishFallbacks() ? footerFallbackEn : footerFallbackPt);
  const config = ref<FooterConfig>(pickStatic());
  const loading = ref(isStrapiEnabled());
  const error = ref<Error | null>(null);

  const load = async () => {
    config.value = pickStatic();
    if (!isStrapiEnabled()) {
      loading.value = false;
      return;
    }
    loading.value = true;
    try {
      config.value = await fetchFooter(strapiLocale());
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e));
      config.value = pickStatic();
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => void load());
  watch(() => i18n.global.locale.value, () => void load());

  return { config, loading, error };
}
