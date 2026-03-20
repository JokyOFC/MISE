<template>
  <footer class="footer" :data-variant="variant">
      <div v-if="variant === 'full'" class="footer-main">
      <div class="footer-cta">
        <p class="footer-cta-label">{{ t('footer.contactLabel') }}</p>
        <h2 class="footer-title">{{ t('footer.title') }}</h2>
        <p class="footer-text">
          {{ ctaText }}
        </p>
        <Button
          type="color"
          color="#0F4C5C"
          shape="round"
          class="footer-button"
          @click="handleContactClick"
        >
          {{ t('footer.ctaButton') }}
        </Button>
      </div>

      <div v-if="socialLinks.length" class="footer-socials">
        <span class="footer-socials-title">{{ t('footer.networks') }}</span>
        <ul class="footer-socials-list">
          <li
            v-for="social in socialLinks"
            :key="social.id"
            class="footer-social-item"
          >
            <a
              class="footer-social-link"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ social.label }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <p class="footer-copy">
        {{ copyrightText }}
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import Button from './Button/Button.vue';
import { useFooter } from '../composables/useStrapiData';

const { t } = useI18n();

interface FooterProps {
  variant?: 'full' | 'minimal';
}

const props = withDefaults(defineProps<FooterProps>(), {
  variant: 'full'
});

const router = useRouter();
const { config: footerConfig } = useFooter();

const socialLinks = computed(() => footerConfig.value.socialLinks ?? []);
const ctaText = computed(() => footerConfig.value.ctaText);
const copyrightText = computed(() => footerConfig.value.copyright);

const handleContactClick = () => {
  router.push('/contato');
};
</script>

<style scoped>
.footer {
  width: 100%;
  padding: 3.5rem 4rem 2.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  background: var(--mise-bg);
  color: var(--mise-text-heading);
}

.footer-main {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 3rem;
  flex-wrap: wrap;
}

.footer-cta {
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-cta-label {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--mise-text-muted);
}

.footer-title {
  font-size: 1.75rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.3;
  margin: 0;
}

.footer-text {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--mise-text);
}

.footer-button {
  margin-top: 0.25rem;
  align-self: flex-start;
}

.footer-socials {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 140px;
}

.footer-socials-title {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--mise-text-muted);
}

.footer-socials-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.footer-social-item {
  margin: 0;
}

.footer-social-link {
  display: inline-block;
  font-size: 0.9375rem;
  color: var(--mise-text);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-social-link:hover {
  color: var(--mise-accent);
}

.footer-bottom {
  margin-top: 0.5rem;
  padding-top: 1.5rem;
  text-align: center;
}

.footer-bottom::before {
  content: '';
  display: block;
  max-width: 110rem;
  margin: 0 auto 1.5rem;
  border-top: 1px solid var(--mise-border);
}

.footer-copy {
  margin: 0;
  font-size: 0.85rem;
  color: var(--mise-text-muted);
}

.footer[data-variant='minimal'] {
  padding: 1.5rem 2rem;
  min-height: auto;
  height: auto;
  justify-content: center;
  gap: 0;
}

.footer[data-variant='minimal'] .footer-main {
  display: none;
}

@media (max-width: 1024px) {
  .footer {
    padding: 2.75rem 2.5rem 2rem;
  }

  .footer-main {
    align-items: flex-start;
  }

  .footer-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 2.25rem 1.75rem 1.75rem;
  }

  .footer-main {
    flex-direction: column;
    align-items: flex-start;
    gap: 2.5rem;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 1.75rem 1.25rem 1.5rem;
  }

  .footer-title {
    font-size: 1.35rem;
  }

  .footer-text {
    font-size: 0.9rem;
  }
}
</style>
