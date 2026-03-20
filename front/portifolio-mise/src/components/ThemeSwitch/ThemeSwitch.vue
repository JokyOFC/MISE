<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useTheme } from '../../composables/useTheme';

const { t } = useI18n();
const { theme, setTheme } = useTheme();

const activeLabel = computed(() => (theme.value === 'dark' ? t('theme.dark') : t('theme.light')));

const toggle = () => setTheme(theme.value === 'dark' ? 'light' : 'dark');

const ariaSwitch = computed(() =>
  theme.value === 'dark' ? t('theme.ariaDarkOn') : t('theme.ariaLightOn')
);
</script>

<template>
  <div class="mise-theme-switch" role="group" aria-labelledby="mise-theme-switch-label">
    <span id="mise-theme-switch-label" class="mise-theme-switch__label">{{ t('theme.section') }}</span>
    <button
      type="button"
      class="mise-theme-switch__track"
      role="switch"
      :aria-checked="theme === 'dark'"
      :aria-label="ariaSwitch"
      @click="toggle"
    >
      <span class="mise-theme-switch__segments" aria-hidden="true">
        <span class="mise-theme-switch__segment">
          <span class="mise-theme-switch__segment-text">{{ t('theme.light') }}</span>
        </span>
        <span class="mise-theme-switch__segment">
          <span class="mise-theme-switch__segment-text">{{ t('theme.dark') }}</span>
        </span>
      </span>
      <span
        class="mise-theme-switch__thumb"
        :class="{ 'mise-theme-switch__thumb--dark': theme === 'dark' }"
      >
        <span class="mise-theme-switch__thumb-text">{{ activeLabel }}</span>
      </span>
    </button>
  </div>
</template>

<style scoped>
.mise-theme-switch {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  width: 100%;
  padding-top: 0.25rem;
}

.mise-theme-switch__label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: inherit;
  opacity: 0.85;
}

.mise-theme-switch__track {
  position: relative;
  width: 100%;
  max-width: 220px;
  height: 42px;
  padding: 0;
  border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, currentColor 8%, transparent);
  cursor: pointer;
  transition:
    background 0.25s ease,
    border-color 0.25s ease;
}

.mise-theme-switch__track:hover {
  border-color: color-mix(in srgb, currentColor 35%, transparent);
}

.mise-theme-switch__track:focus-visible {
  outline: 2px solid var(--mise-accent, #0f4c5c);
  outline-offset: 3px;
}

/* Duas metades com rótulos sempre visíveis (a não selecionada fica por baixo do polegar) */
.mise-theme-switch__segments {
  position: absolute;
  inset: 4px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  z-index: 0;
  pointer-events: none;
}

.mise-theme-switch__segment {
  display: flex;
  align-items: center;
  justify-content: center;
}

.mise-theme-switch__segment-text {
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: inherit;
  opacity: 0.6;
  line-height: 1.25;
  white-space: nowrap;
}

.mise-theme-switch__thumb {
  position: absolute;
  top: 4px;
  left: 4px;
  width: calc(50% - 8px);
  height: calc(100% - 8px);
  border-radius: 999px;
  background: var(--mise-accent, #0f4c5c);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 0.45rem;
  will-change: transform, left;
  transition:
    left 0.28s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
  pointer-events: none;
  transform: translateX(0);
}

/* Tema escuro ativo → polegar à direita, texto “Escuro” */
.mise-theme-switch__thumb--dark {
  left: calc(100% - 4px);
  transform: translateX(-100%);
}

.mise-theme-switch__thumb-text {
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #fff;
  line-height: 1.25;
  white-space: nowrap;
  text-align: center;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
