<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink, useRouter } from 'vue-router';
import DotGrid from '../components/DotGrid/DotGrid.vue';
import ThemeSwitch from '../components/ThemeSwitch/ThemeSwitch.vue';
import LanguageSwitcher from '../components/LanguageSwitcher/LanguageSwitcher.vue';
import { useTheme } from '../composables/useTheme';

const { t } = useI18n();
const router = useRouter();
const email = ref('');
const password = ref('');
const { isDark } = useTheme();

/* Base mais clara para os pontos ficarem visíveis (não só no hover) */
const dotBaseColor = computed(() => (isDark.value ? '#2a2a2a' : '#cbd5e1'));

/** Credenciais fake para demonstração: admin@admin.com / 123456 */
const FAKE_EMAIL = 'admin@admin.com';
const FAKE_PASSWORD = '123456';

const handleLogin = () => {
  if (email.value.trim().toLowerCase() === FAKE_EMAIL && password.value === FAKE_PASSWORD) {
    void router.push('/dashboard');
  } else {
    alert(t('login.errorInvalid'));
  }
};
</script>

<template>
  <div class="login-page">
    <div class="login-page__controls">
      <div class="login-page__theme-wrap">
        <ThemeSwitch />
      </div>
      <LanguageSwitcher />
    </div>

    <div class="login-page__split">
      <div class="login-page__form">
        <div class="login-form__inner">
          <RouterLink to="/" class="login-form__logo" :aria-label="t('login.ariaHome')">
            <span class="login-form__logo-text">&gt; Joky</span>
          </RouterLink>
          <h1 class="login-form__title">{{ t('login.title') }}</h1>
          <p class="login-form__subtitle">{{ t('login.subtitle') }}</p>

          <form class="login-form" @submit.prevent="handleLogin">
            <div class="form-group">
              <label for="login-email">{{ t('login.email') }}</label>
              <input
                id="login-email"
                v-model="email"
                type="email"
                required
                :placeholder="t('login.emailPlaceholder')"
                class="form-input"
                autocomplete="email"
              />
            </div>
            <div class="form-group">
              <label for="login-password">{{ t('login.password') }}</label>
              <input
                id="login-password"
                v-model="password"
                type="password"
                required
                :placeholder="t('login.passwordPh')"
                class="form-input"
                autocomplete="current-password"
              />
            </div>
            <button type="submit" class="login-button">{{ t('login.submit') }}</button>
          </form>

          <RouterLink to="/" class="login-form__back">{{ t('login.backHome') }}</RouterLink>
        </div>
      </div>

      <div class="login-page__info">
        <div class="login-page__dotgrid">
          <DotGrid
            :dot-size="10"
            :gap="28"
            :base-color="dotBaseColor"
            active-color="#0F4C5C"
            :proximity="150"
            :speed-trigger="100"
            :shock-radius="250"
            :shock-strength="5"
            :max-speed="5000"
            :resistance="750"
            :return-duration="1.5"
            class-name="login-dotgrid"
          />
        </div>
        <div class="login-page__info-content">
          <h2 class="login-info__title">{{ t('login.panelTitle') }}</h2>
          <p class="login-info__text">{{ t('login.panelText') }}</p>
          <RouterLink to="/contato" class="login-info__cta">{{ t('login.panelCta') }}</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: var(--mise-bg);
  color: var(--mise-text-heading);
}

.login-page__controls {
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 50;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
  min-height: 42px;
}

/* Evita o switch esticar e ficar “vertical” */
.login-page__theme-wrap {
  flex-shrink: 0;
  width: 200px;
  display: flex;
  align-items: center;
}

.login-page__theme-wrap :deep(.mise-theme-switch) {
  width: 100%;
  padding-top: 0;
}

.login-page__theme-wrap :deep(.mise-theme-switch__label) {
  display: none;
}

.login-page__controls :deep(.mise-theme-switch__label),
.login-page__controls :deep(.mise-theme-switch__segment-text) {
  color: var(--mise-text-heading);
}

.login-page__controls :deep(.mise-theme-switch__track) {
  border-color: color-mix(in srgb, var(--mise-text-heading) 25%, transparent);
  background: color-mix(in srgb, var(--mise-text-heading) 8%, transparent);
}

.login-page__controls :deep(.mise-theme-switch__track:hover) {
  border-color: color-mix(in srgb, var(--mise-text-heading) 35%, transparent);
}

.login-page__controls :deep(.mise-lang__btn) {
  width: 2.5rem;
  height: 2.5rem;
  min-height: 42px;
  min-width: 42px;
}

.login-page__split {
  flex: 1;
  display: flex;
  flex-direction: row;
  min-height: 100vh;
}

.login-page__form {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  background: var(--mise-bg);
}

.login-form__inner {
  width: 100%;
  max-width: 380px;
}

.login-form__logo {
  display: inline-block;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--mise-accent);
  text-decoration: none;
  margin-bottom: 2.5rem;
  letter-spacing: -0.02em;
  transition: color 0.2s ease;
}

.login-form__logo:hover {
  color: var(--mise-accent-hover);
}

.login-form__logo-text {
  font-family: ui-monospace, monospace;
}

.login-form__title {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  margin: 0 0 0.5rem;
  color: var(--mise-text-heading);
}

.login-form__subtitle {
  font-size: 1rem;
  color: var(--mise-text-muted);
  margin: 0 0 2rem;
  line-height: 1.5;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--mise-text-heading);
}

.form-input {
  padding: 0.75rem 1rem;
  border: 1px solid var(--mise-border-strong);
  border-radius: 0.5rem;
  font-size: 1rem;
  background: var(--mise-bg-elevated);
  color: var(--mise-text-heading);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-input::placeholder {
  color: var(--mise-text-muted);
}

.form-input:focus {
  outline: none;
  border-color: var(--mise-accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--mise-accent) 25%, transparent);
}

.login-button {
  padding: 0.875rem 1.5rem;
  background: var(--mise-accent);
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
  margin-top: 0.25rem;
}

.login-button:hover {
  background: var(--mise-accent-hover);
}

.login-button:active {
  transform: scale(0.99);
}

.login-form__back {
  display: inline-block;
  margin-top: 2rem;
  font-size: 0.9rem;
  color: var(--mise-accent);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.login-form__back:hover {
  color: var(--mise-accent-hover);
}

/* Painel direito com DotGrid */
.login-page__info {
  flex: 1;
  position: relative;
  min-height: 50vh;
  overflow: hidden;
}

.login-page__dotgrid {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.login-page__info-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem 2.5rem;
  height: 100%;
  min-height: 400px;
  background: linear-gradient(
    to top,
    color-mix(in srgb, var(--mise-bg-deep) 85%, transparent),
    color-mix(in srgb, var(--mise-bg-deep) 60%, transparent)
  );
}

.login-info__title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  margin: 0 0 1rem;
  color: var(--mise-text-heading);
}

.login-info__text {
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--mise-text);
  margin: 0 0 1.5rem;
  max-width: 360px;
}

.login-info__cta {
  font-size: 0.95rem;
  color: var(--mise-accent);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.login-info__cta:hover {
  color: var(--mise-link-hover);
}

@media (max-width: 900px) {
  .login-page__split {
    flex-direction: column;
  }

  .login-page__form {
    min-height: auto;
    padding: 4rem 1.5rem 2rem;
  }

  .login-page__info {
    min-height: 45vh;
  }

  .login-page__info-content {
    min-height: 320px;
    padding: 2.5rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .login-page__controls {
    top: 1rem;
    right: 1rem;
    gap: 0.5rem;
  }

  .login-form__title {
    font-size: 1.65rem;
  }

  .login-form__inner {
    max-width: 100%;
  }
}
</style>
