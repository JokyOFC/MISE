<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import type { AppLocale } from '../../i18n/constants';

const props = withDefaults(
  defineProps<{ placement?: 'top' | 'bottom' }>(),
  { placement: 'bottom' }
);

const { locale, t } = useI18n();
const open = ref(false);
const rootRef = useTemplateRef('rootRef');

onClickOutside(rootRef, () => {
  open.value = false;
});

const current = computed(() => locale.value as AppLocale);

const options: { code: AppLocale; labelKey: string }[] = [
  { code: 'pt-BR', labelKey: 'language.portuguese' },
  { code: 'en', labelKey: 'language.english' },
];

const toggle = () => {
  open.value = !open.value;
};

const select = (code: AppLocale) => {
  locale.value = code;
  open.value = false;
};
</script>

<template>
  <div ref="rootRef" class="mise-lang">
    <button
      type="button"
      class="mise-lang__btn"
      :aria-expanded="open"
      :aria-label="t('language.switcherAria')"
      aria-haspopup="listbox"
      @click="toggle"
    >
      <span class="mise-lang__icon" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </span>
    </button>

    <Transition name="mise-lang-pop">
      <div
        v-if="open"
        class="mise-lang__popover"
        :class="{ 'mise-lang__popover--top': props.placement === 'top' }"
        role="listbox"
        :aria-label="t('language.choose')"
      >
        <button
          v-for="opt in options"
          :key="opt.code"
          type="button"
          role="option"
          class="mise-lang__option"
          :class="{ 'mise-lang__option--active': current === opt.code }"
          :aria-selected="current === opt.code"
          @click="select(opt.code)"
        >
          {{ t(opt.labelKey) }}
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.mise-lang {
  position: relative;
  z-index: 52;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  flex-shrink: 0;
}

.mise-lang__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: none;
  border-radius: 0.5rem;
  background: color-mix(in srgb, currentColor 12%, transparent);
  color: inherit;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.15s ease;
}

.mise-lang__btn:hover {
  background: color-mix(in srgb, currentColor 20%, transparent);
}

.mise-lang__btn:focus-visible {
  outline: 2px solid var(--mise-accent, #0f4c5c);
  outline-offset: 3px;
}

.mise-lang__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.92;
}

.mise-lang__popover {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 10rem;
  padding: 0.35rem;
  border-radius: 0.65rem;
  background: var(--mise-surface-glass, rgba(255, 255, 255, 0.94));
  border: 1px solid var(--mise-border, rgba(0, 0, 0, 0.08));
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.mise-lang__popover--top {
  top: auto;
  bottom: calc(100% + 0.5rem);
}

.mise-lang__option {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.55rem 0.75rem;
  border: none;
  border-radius: 0.45rem;
  background: transparent;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--mise-text-heading, #0f172a);
  cursor: pointer;
  transition: background 0.15s ease;
}

.mise-lang__option:hover {
  background: color-mix(in srgb, var(--mise-accent, #0f4c5c) 14%, transparent);
}

.mise-lang__option--active {
  color: var(--mise-accent, #0f4c5c);
  font-weight: 600;
}

.mise-lang-pop-enter-active,
.mise-lang-pop-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.mise-lang-pop-enter-from,
.mise-lang-pop-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.mise-lang__popover--top.mise-lang-pop-enter-from,
.mise-lang__popover--top.mise-lang-pop-leave-to {
  transform: translateY(4px);
}
</style>
