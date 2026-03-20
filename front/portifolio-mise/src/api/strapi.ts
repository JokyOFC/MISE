/**
 * Cliente para a API REST do Strapi.
 * Em desenvolvimento, defina VITE_STRAPI_URL (ex: http://localhost:1337).
 * Se não estiver definido, os componentes usam fallback dos JSONs estáticos.
 */

const STRAPI_URL = typeof import.meta !== 'undefined' && import.meta.env?.VITE_STRAPI_URL
  ? (import.meta.env.VITE_STRAPI_URL as string).replace(/\/$/, '')
  : '';

export const isStrapiEnabled = (): boolean => Boolean(STRAPI_URL);

/** Locale de conteúdo no Strapi (plugin i18n). Sem plugin, o parâmetro costuma ser ignorado. */
export type StrapiContentLocale = 'pt-BR' | 'en';

function withLocale(path: string, locale?: StrapiContentLocale): string {
  if (!locale) return path;
  const q = `locale=${encodeURIComponent(locale)}`;
  return path.includes('?') ? `${path}&${q}` : `${path}?${q}`;
}

async function strapiFetch<T>(endpoint: string): Promise<T> {
  if (!STRAPI_URL) throw new Error('Strapi URL not configured');
  const res = await fetch(`${STRAPI_URL}${endpoint}`, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`Strapi API error: ${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

/** Resposta padrão Strapi 5: data no topo (sem attributes). */
export interface StrapiSingleResponse<T> {
  data: T | null;
}

export interface StrapiCollectionResponse<T> {
  data: T[];
  meta?: { pagination?: { page: number; pageSize: number; pageCount: number; total: number } };
}

/** Experiência no formato do Strapi (campos no topo + documentId). */
export interface StrapiExperience {
  documentId: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  technologies: string[];
}

/** Formato usado pelos componentes (id numérico para compatibilidade). */
export interface Experience {
  id: number;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  technologies: string[];
}

function mapStrapiExperienceToExperience(d: StrapiExperience, index: number): Experience {
  return {
    id: index,
    company: d.company,
    role: d.role,
    period: d.period,
    location: d.location,
    description: d.description,
    technologies: Array.isArray(d.technologies) ? d.technologies : [],
  };
}

export async function fetchExperiences(locale?: StrapiContentLocale): Promise<Experience[]> {
  const res = await strapiFetch<StrapiCollectionResponse<StrapiExperience>>(
    withLocale('/api/experiences?sort[0]=createdAt:desc', locale)
  );
  const list = res.data ?? [];
  return list.map(mapStrapiExperienceToExperience);
}

/** Como posso ajudar - single type. */
export interface StrapiHowCanIHelp {
  documentId?: string;
  title: string;
  description: string;
  techLogos?: Array<{ icon: string; title: string; href: string | null }>;
  services?: Array<{ title: string; description: string; icon: string }>;
}

export interface HowCanIHelpConfig {
  intro: { title: string; description: string };
  services: Array<{ title: string; description: string; icon: string }>;
}

export async function fetchHowCanIHelp(locale?: StrapiContentLocale): Promise<HowCanIHelpConfig> {
  const res = await strapiFetch<StrapiSingleResponse<StrapiHowCanIHelp>>(
    withLocale('/api/how-can-i-helps', locale)
  );
  const d = res.data;
  if (!d) {
    return {
      intro: { title: 'Como posso ajudar', description: '' },
      services: [],
    };
  }
  return {
    intro: { title: d.title ?? 'Como posso ajudar', description: d.description ?? '' },
    services: Array.isArray(d.services) ? d.services : [],
  };
}

/** Footer - single type. */
export interface StrapiFooter {
  documentId?: string;
  socialLinks?: Array<{ slug: string; label: string; url: string }>;
  ctaText?: string | null;
  copyright?: string | null;
}

export interface FooterConfig {
  socialLinks: Array<{ id: string; label: string; url: string }>;
  ctaText: string;
  copyright: string;
}

export async function fetchFooter(locale?: StrapiContentLocale): Promise<FooterConfig> {
  const res = await strapiFetch<StrapiSingleResponse<StrapiFooter>>(withLocale('/api/footers', locale));
  const d = res.data;
  const rawLinks = Array.isArray(d?.socialLinks) ? d.socialLinks : [];
  return {
    socialLinks: rawLinks.map((link) => ({ id: link.slug, label: link.label, url: link.url })),
    ctaText: d?.ctaText ?? 'Entre em contato para conversarmos sobre seu próximo projeto.',
    copyright: d?.copyright ?? `© ${new Date().getFullYear()} Todos os direitos reservados.`,
  };
}

/** Header - single type com componentes */
export interface StrapiHeader {
  documentId?: string;
  fullName: string;
  rotatingTexts?: Array<{ text: string }>;
  mainTitle: string;
  subTitle?: string;
  tagline: string;
  buttons?: Array<{ label: string; url?: string }>;
}

export interface HeaderConfig {
  fullName: string;
  rotatingTexts: string[];
  mainTitle: string;
  subTitle: string;
  tagline: string;
  buttons: Array<{ label: string; url: string }>;
}

export async function fetchHeader(locale?: StrapiContentLocale): Promise<HeaderConfig> {
  const res = await strapiFetch<StrapiSingleResponse<StrapiHeader>>(withLocale('/api/headers', locale));
  const d = res.data;
  if (!d)
    return {
      fullName: '',
      rotatingTexts: [],
      mainTitle: '',
      subTitle: '',
      tagline: '',
      buttons: [],
    };
  return {
    fullName: d.fullName ?? '',
    rotatingTexts: (d.rotatingTexts ?? []).map((t) => t.text),
    mainTitle: d.mainTitle ?? '',
    subTitle: d.subTitle ?? '',
    tagline: d.tagline ?? '',
    buttons: (d.buttons ?? []).map((b) => ({ label: b.label, url: b.url ?? '' })),
  };
}

/** About - single type com componentes */
export interface StrapiAboutParagraph {
  content: string;
  highlight?: boolean;
}
export interface StrapiAboutProfile {
  name: string;
  title: string;
  handle: string;
  status?: string;
  contactText?: string;
  avatar?: { url: string } | null;
  icon?: { url: string } | null;
  grain?: { url: string } | null;
}
export interface StrapiAbout {
  documentId?: string;
  title: string;
  paragraphs?: StrapiAboutParagraph[];
  profile?: StrapiAboutProfile | null;
}

export interface AboutConfig {
  title: string;
  paragraphs: Array<{ content: string; highlight: boolean }>;
  profile: {
    name: string;
    title: string;
    handle: string;
    status: string;
    contactText: string;
    avatarUrl: string;
    iconUrl: string;
    grainUrl: string;
  };
}

function resolveMediaUrl(obj: { url?: string } | null | undefined): string {
  if (!obj?.url) return '';
  const u = obj.url;
  return u.startsWith('http') ? u : `${STRAPI_URL}${u}`;
}

export async function fetchAbout(locale?: StrapiContentLocale): Promise<AboutConfig> {
  const res = await strapiFetch<StrapiSingleResponse<StrapiAbout>>(
    withLocale(
      '/api/abouts?populate[profile][populate][avatar]=*&populate[profile][populate][icon]=*&populate[profile][populate][grain]=*',
      locale
    )
  );
  const d = res.data;
  if (!d)
    return {
      title: 'SOBRE MIM',
      paragraphs: [],
      profile: {
        name: '',
        title: '',
        handle: '',
        status: 'Online',
        contactText: 'Github',
        avatarUrl: '',
        iconUrl: '',
        grainUrl: '',
      },
    };
  const profile = d.profile;
  return {
    title: d.title ?? 'SOBRE MIM',
    paragraphs: (d.paragraphs ?? []).map((p) => ({ content: p.content, highlight: p.highlight ?? false })),
    profile: {
      name: profile?.name ?? '',
      title: profile?.title ?? '',
      handle: profile?.handle ?? '',
      status: profile?.status ?? 'Online',
      contactText: profile?.contactText ?? 'Github',
      avatarUrl: resolveMediaUrl(profile?.avatar),
      iconUrl: resolveMediaUrl(profile?.icon),
      grainUrl: resolveMediaUrl(profile?.grain),
    },
  };
}

/** Project - collection type */
export interface StrapiProject {
  documentId: string;
  name: string;
  description: string;
  image?: { url: string } | null;
  icon: string;
  technologies: string[];
  order?: number;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  icon: string;
  technologies: string[];
}

function mapStrapiProjectToProject(d: StrapiProject, index: number): Project {
  return {
    id: index,
    name: d.name,
    description: d.description,
    image: resolveMediaUrl(d.image),
    icon: d.icon ?? 'pi pi-code',
    technologies: Array.isArray(d.technologies) ? d.technologies : [],
  };
}

export async function fetchProjects(locale?: StrapiContentLocale): Promise<Project[]> {
  const res = await strapiFetch<StrapiCollectionResponse<StrapiProject>>(
    withLocale('/api/projects?sort[0]=order:asc&sort[1]=createdAt:desc&populate[image]=*', locale)
  );
  const list = res.data ?? [];
  return list.map(mapStrapiProjectToProject);
}
