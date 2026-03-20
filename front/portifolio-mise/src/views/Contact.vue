<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import StaggeredMenu from '../components/StaggeredMenu/StaggeredMenu.vue';
import Footer from '../components/Footer.vue';
import Button from '../components/Button/Button.vue';
import { useBrandedLogo } from '../composables/useBrandedLogo';
import { useFooter } from '../composables/useStrapiData';
import { useTheme } from '../composables/useTheme';

const { t } = useI18n();
const { config: footerConfig } = useFooter();
const { isDark, menuChrome } = useTheme();

const menuPrelayers = computed(() =>
  isDark.value ? ['#0A2F36', '#0F4C5C'] : ['#e2e8f0', '#cbd5e1']
);

const logoUrl = useBrandedLogo();

const menuItems = computed(() => [
  { label: t('nav.home'), ariaLabel: t('nav.ariaHome'), link: '/#inicio' },
  { label: t('nav.about'), ariaLabel: t('nav.ariaAbout'), link: '/#sobre' },
  { label: t('nav.projects'), ariaLabel: t('nav.ariaProjects'), link: '/#projetos' },
  { label: t('nav.contact'), ariaLabel: t('nav.ariaContact'), link: '/contato' },
]);

const socialItems = computed(() =>
  (footerConfig.value.socialLinks || []).map((link) => ({
    label: link.label,
    link: link.url
  }))
);

const handleMenuOpen = () => console.log('Menu opened');
const handleMenuClose = () => console.log('Menu closed');

const contactEmail = 'contato@joaquimdev.com';

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const phone = ref('');
const project = ref('');

const handleSubmit = () => {
  const fullName = `${firstName.value} ${lastName.value}`.trim();
  const subject = `Novo contato pelo portfólio - ${fullName || 'Sem nome'}`;

  const bodyLines = [
    `Nome: ${fullName || '-'}`,
    `E-mail: ${email.value || '-'}`,
    `Telefone: ${phone.value || '-'}`,
    '',
    'Sobre o projeto:',
    project.value || '-'
  ];

  const body = bodyLines.join('\n');
  const mailto = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    body
  )}`;

  window.location.href = mailto;
};
</script>

<template>
  <div class="contact-page">
    <StaggeredMenu
      position="right"
      :items="menuItems"
      :social-items="socialItems"
      :display-socials="true"
      :display-item-numbering="true"
      :menu-button-color="menuChrome.menuButton"
      :open-menu-button-color="menuChrome.menuOpen"
      :change-menu-color-on-open="true"
      :colors="menuPrelayers"
      :logo-url="logoUrl"
      accent-color="#0F4C5C"
      @menu-open="handleMenuOpen"
      @menu-close="handleMenuClose"
    />

    <main class="contact-content">
      <header class="contact-header">
        <p class="contact-pill">{{ t('contact.pill') }}</p>
        <h1 class="contact-title">{{ t('contact.title') }}</h1>
        <p class="contact-subtitle">
          {{ t('contact.subtitle') }}
        </p>
      </header>

      <div class="contact-grid">
        <section class="contact-panel contact-panel--info">
          <h2 class="contact-panel-title">{{ t('contact.helpTitle') }}</h2>
          <p class="contact-panel-text">
            {{ t('contact.helpText') }}
          </p>

          <div class="contact-info-group">
            <div class="contact-info-item">
              <span class="contact-info-label">{{ t('contact.emailLabel') }}</span>
              <a class="contact-info-value" :href="`mailto:${contactEmail}`">
                {{ contactEmail }}
              </a>
            </div>
          </div>

          <div v-if="socialItems.length" class="contact-socials">
            <span class="contact-socials-title">{{ t('contact.socialsTitle') }}</span>
            <ul class="contact-socials-list">
              <li
                v-for="social in socialItems"
                :key="social.label"
                class="contact-socials-item"
              >
                <a
                  class="contact-socials-link"
                  :href="social.link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ social.label }}
                </a>
              </li>
            </ul>
          </div>
        </section>

        <section class="contact-panel contact-panel--form">
          <h2 class="contact-panel-title">{{ t('contact.formSectionTitle') }}</h2>
          <p class="contact-panel-text">
            {{ t('contact.formSectionText') }}
          </p>

          <form class="contact-form" @submit.prevent="handleSubmit" novalidate>
            <div class="contact-form-row">
              <div class="contact-form-field">
                <label class="contact-label" for="firstName">{{ t('contact.firstName') }}</label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  class="contact-input"
                  :placeholder="t('contact.placeholders.firstName')"
                  autocomplete="given-name"
                  v-model="firstName"
                />
              </div>
              <div class="contact-form-field">
                <label class="contact-label" for="lastName">{{ t('contact.lastName') }}</label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  class="contact-input"
                  :placeholder="t('contact.placeholders.lastName')"
                  autocomplete="family-name"
                  v-model="lastName"
                />
              </div>
            </div>

            <div class="contact-form-row">
              <div class="contact-form-field">
                <label class="contact-label" for="email">{{ t('contact.emailLabel') }}</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  class="contact-input"
                  :placeholder="t('contact.placeholders.email')"
                  autocomplete="email"
                  v-model="email"
                />
              </div>
              <div class="contact-form-field">
                <label class="contact-label" for="phone">{{ t('contact.phone') }}</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  class="contact-input"
                  :placeholder="t('contact.placeholders.phone')"
                  autocomplete="tel"
                  v-model="phone"
                />
              </div>
            </div>

            <div class="contact-form-field">
              <label class="contact-label" for="project">{{ t('contact.projectLabel') }}</label>
              <textarea
                id="project"
                name="project"
                class="contact-textarea"
                rows="5"
                :placeholder="t('contact.placeholders.project')"
                v-model="project"
              ></textarea>
            </div>

            <div class="contact-form-actions">
              <Button
                type="color"
                color="#0F4C5C"
                shape="round"
                class="contact-submit-button"
              >
                {{ t('contact.submit') }}
              </Button>
            </div>
          </form>
        </section>
      </div>
    </main>

    <Footer variant="minimal" />
  </div>
</template>

<style scoped>
.contact-page {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--mise-bg);
  color: var(--mise-text-heading);
}

.contact-content {
  flex: 1;
  max-width: 1120px;
  width: 100%;
  margin: 0 auto;
  padding: 10rem 2.5rem 4.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.contact-header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.contact-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.85rem;
  border-radius: 999px;
  border: 1px solid var(--mise-border);
  font-size: 0.75rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--mise-text-muted);
}

.contact-title {
  font-size: 2.5rem;
  font-weight: 600;
  letter-spacing: -0.04em;
  margin: 0;
}

.contact-subtitle {
  margin: 0;
  font-size: 1.05rem;
  max-width: 640px;
  line-height: 1.7;
  color: var(--mise-text);
}

.contact-grid {
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.4fr);
  gap: 1.75rem;
  align-items: flex-start;
}

.contact-panel {
  border-radius: 1rem;
  border: 1px solid var(--mise-border);
  background: var(--mise-surface-glass);
  padding: 1.75rem 1.75rem 1.9rem;
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

.contact-panel-title {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.contact-panel-text {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--mise-text-muted);
}

.contact-info-group {
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.contact-info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.contact-info-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--mise-text-muted);
}

.contact-info-value {
  font-size: 0.95rem;
  color: var(--mise-text);
  text-decoration: none;
}

.contact-info-value:hover {
  color: var(--mise-link-hover);
}

.contact-form {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.contact-form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
}

.contact-form-field {
  flex: 1 1 220px;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.contact-label {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--mise-text);
  transition: color 0.2s ease;
}

.contact-form-field:focus-within .contact-label {
  color: var(--mise-accent);
}

.contact-input,
.contact-textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem 0 0.625rem;
  border: none;
  border-bottom: 1px solid var(--mise-border-strong);
  border-radius: 0;
  background: transparent;
  color: var(--mise-text-heading);
  font-size: 1rem;
  line-height: 1.5;
  outline: none;
  transition: border-color 0.2s ease, border-width 0.2s ease;
  resize: vertical;
  appearance: none;
  -webkit-appearance: none;
}

.contact-input:hover,
.contact-textarea:hover {
  border-bottom-color: var(--mise-text-muted);
}

.contact-input:focus,
.contact-textarea:focus {
  border-bottom-width: 2px;
  border-bottom-color: var(--mise-accent);
  padding-bottom: calc(0.625rem - 1px); /* evita “pulo” ao passar de 1px para 2px */
}

.contact-input::placeholder,
.contact-textarea::placeholder {
  color: var(--mise-text-muted);
  opacity: 0.85;
}

.contact-textarea {
  min-height: 5rem;
  padding-top: 0.5rem;
}

.contact-socials {
  margin-top: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.contact-socials-title {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--mise-text-muted);
}

.contact-socials-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.contact-socials-item {
  margin: 0;
}

.contact-socials-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  border: 1px solid var(--mise-border-strong);
  color: var(--mise-text);
  text-decoration: none;
  font-size: 0.9rem;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease,
    transform 0.15s ease;
}

.contact-socials-link:hover {
  background: radial-gradient(
    circle at top left,
    color-mix(in srgb, var(--mise-accent) 45%, transparent),
    color-mix(in srgb, var(--mise-bg-deep) 92%, transparent)
  );
  border-color: var(--mise-accent);
  color: var(--mise-text-heading);
  transform: translateY(-1px);
}

.contact-form-actions {
  margin-top: 0.5rem;
  display: flex;
  justify-content: flex-end;
}

.contact-submit-button {
  min-width: 180px;
}

@media (max-width: 768px) {
  .contact-content {
    padding: 6rem 1.5rem 3.5rem;
  }

  .contact-title {
    font-size: 2rem;
  }

  .contact-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .contact-panel {
    padding: 1.5rem 1.5rem 1.7rem;
  }
}

@media (max-width: 480px) {
  .contact-content {
    padding: 4.75rem 1.25rem 2.75rem;
  }

  .contact-title {
    font-size: 1.8rem;
  }

  .contact-subtitle {
    font-size: 0.98rem;
  }
}
</style>
