import { computed } from 'vue';
import logoDarkBg from '../assets/logo.svg';
import logoLightBg from '../assets/logo_dark.svg';
import { useTheme } from './useTheme';

/** `logo.svg` (claro no SVG) no site escuro; `logo_dark.svg` (escuro) no site claro. */
export function useBrandedLogo() {
  const { isDark } = useTheme();
  return computed(() => (isDark.value ? logoDarkBg : logoLightBg));
}
