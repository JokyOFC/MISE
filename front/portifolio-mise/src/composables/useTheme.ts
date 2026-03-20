import { computed, ref } from 'vue';
import { applyDocumentTheme, persistTheme, readStoredTheme } from '../theme/applyDocumentTheme';
import { THEME_STORAGE_KEY, type ThemeId } from '../theme/constants';

const themeRef = ref<ThemeId>('dark');

function syncFromStorage(): void {
  const stored = readStoredTheme();
  const next: ThemeId = stored ?? 'dark';
  themeRef.value = next;
  applyDocumentTheme(next);
}

/** Chamar uma vez na inicialização da app (após o script inline do index.html). */
export function initThemeFromStorage(): void {
  syncFromStorage();
}

export function useTheme() {
  const theme = computed(() => themeRef.value);
  const isDark = computed(() => themeRef.value === 'dark');

  const setTheme = (next: ThemeId) => {
    themeRef.value = next;
    applyDocumentTheme(next);
    persistTheme(next);
  };

  const toggleTheme = () => {
    setTheme(themeRef.value === 'dark' ? 'light' : 'dark');
  };

  const menuChrome = computed(() =>
    themeRef.value === 'dark'
      ? { menuButton: '#ffffff', menuOpen: '#000000', headerBlur: 'rgba(0, 0, 0, 0.4)' }
      : { menuButton: '#0f172a', menuOpen: '#0f172a', headerBlur: 'rgba(255, 255, 255, 0.65)' }
  );

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme,
    menuChrome
  };
}

/** Mantém abas / storage events alinhados (opcional). */
export function watchThemeStorageSync(): void {
  if (typeof window === 'undefined') return;
  window.addEventListener('storage', (e) => {
    if (e.key !== THEME_STORAGE_KEY || !e.newValue) return;
    if (e.newValue !== 'light' && e.newValue !== 'dark') return;
    themeRef.value = e.newValue;
    applyDocumentTheme(e.newValue);
  });
}
