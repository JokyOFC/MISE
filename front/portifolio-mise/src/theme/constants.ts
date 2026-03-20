export const THEME_STORAGE_KEY = 'mise-theme' as const;

export type ThemeId = 'light' | 'dark';

export const THEME_IDS: ThemeId[] = ['light', 'dark'];

export function isThemeId(value: unknown): value is ThemeId {
  return value === 'light' || value === 'dark';
}
