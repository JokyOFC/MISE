import { createI18n } from 'vue-i18n';
import { watchEffect } from 'vue';
import ptBR from '../locales/pt-BR.json';
import en from '../locales/en.json';
import { LOCALE_STORAGE_KEY, type AppLocale } from './constants';

function detectInitialLocale(): AppLocale {
  if (typeof window === 'undefined') return 'pt-BR';
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored === 'en' || stored === 'pt-BR') return stored;
  const nav = navigator.language?.toLowerCase() ?? 'pt-br';
  if (nav.startsWith('pt')) return 'pt-BR';
  return 'en';
}

export const i18n = createI18n({
  legacy: false,
  locale: detectInitialLocale(),
  fallbackLocale: 'pt-BR',
  messages: {
    'pt-BR': ptBR,
    en,
  },
  globalInjection: true,
});

function applyDocumentLocale(loc: AppLocale): void {
  if (typeof document === 'undefined' || typeof localStorage === 'undefined') return;
  document.documentElement.lang = loc === 'en' ? 'en' : 'pt-BR';
  localStorage.setItem(LOCALE_STORAGE_KEY, loc);
}

/** Sincroniza `<html lang>` e `localStorage` (fora de `setup`, usa `watchEffect`). */
export function initLocalePersistence(): void {
  if (typeof window === 'undefined') return;
  watchEffect(() => {
    applyDocumentLocale(i18n.global.locale.value as AppLocale);
  });
}
