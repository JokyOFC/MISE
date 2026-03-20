<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch.vue';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher.vue';

const props = defineProps<{ open?: boolean }>();
const emit = defineEmits<{ 'update:open': [value: boolean] }>();

const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const settingsOpen = ref(true);
const searchQuery = ref('');

const isOpen = computed({
  get: () => props.open ?? false,
  set: (v) => emit('update:open', v),
});

const isActive = (path: string, key?: string) =>
  route.path === path || (key === 'home' && route.path === '/dashboard');

const handleLogout = () => {
  isOpen.value = false;
  void router.push('/login');
};

const closeSidebar = () => {
  isOpen.value = false;
};

const navItems = computed(() => [
  { key: 'home', label: t('dashboard.home'), to: '/dashboard', icon: 'home' },
  { key: 'inbox', label: t('dashboard.inbox'), to: '/dashboard', icon: 'inbox', badge: 4 },
  { key: 'customers', label: t('dashboard.customers'), to: '/dashboard', icon: 'users' },
]);

const settingsItems = computed(() => [
  { key: 'general', label: t('dashboard.settingsGeneral'), to: '/dashboard' },
  { key: 'members', label: t('dashboard.settingsMembers'), to: '/dashboard' },
  { key: 'notifications', label: t('dashboard.settingsNotifications'), to: '/dashboard' },
  { key: 'security', label: t('dashboard.settingsSecurity'), to: '/dashboard' },
]);
</script>

<template>
  <aside
    class="sidebar"
    :class="{ 'sidebar--open': isOpen }"
  >
    <button
      type="button"
      class="sidebar__close"
      :aria-label="t('nav.closeLabel')"
      @click="closeSidebar"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>

    <div class="sidebar__head">
      <div class="sidebar__brand">{{ t('dashboard.workspace') }}</div>
      <div class="sidebar__search">
        <svg class="sidebar__search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="t('dashboard.search')"
          class="sidebar__search-input"
        />
        <kbd class="sidebar__search-kbd">{{ t('dashboard.searchShortcut') }}</kbd>
      </div>
    </div>

    <nav class="sidebar__nav">
      <div class="sidebar__section">
        <RouterLink
          v-for="item in navItems"
          :key="item.key"
          :to="item.to"
          class="sidebar__link"
          :class="{ 'sidebar__link--active': isActive(item.to, item.key) }"
          @click="closeSidebar"
        >
          <span class="sidebar__link-icon">
            <svg v-if="item.icon === 'home'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <svg v-else-if="item.icon === 'inbox'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
              <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
            </svg>
            <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </span>
          <span class="sidebar__link-text">{{ item.label }}</span>
          <span v-if="item.badge" class="sidebar__badge">{{ item.badge }}</span>
        </RouterLink>
      </div>

      <div class="sidebar__section">
        <button
          type="button"
          class="sidebar__link sidebar__link--toggle"
          :class="{ 'sidebar__link--expanded': settingsOpen }"
          @click="settingsOpen = !settingsOpen"
        >
          <span class="sidebar__link-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          </span>
          <span class="sidebar__link-text">{{ t('dashboard.settings') }}</span>
          <svg class="sidebar__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :style="{ transform: settingsOpen ? 'rotate(180deg)' : 'none' }">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        <div v-show="settingsOpen" class="sidebar__sublinks">
          <RouterLink
            v-for="sub in settingsItems"
            :key="sub.key"
            :to="sub.to"
            class="sidebar__sublink"
            :class="{ 'sidebar__sublink--active': route.path === sub.to }"
            @click="closeSidebar"
          >
            {{ sub.label }}
          </RouterLink>
        </div>
      </div>
    </nav>

    <div class="sidebar__bottom">
      <div class="sidebar__links">
        <a href="#" class="sidebar__foot-link">{{ t('dashboard.feedback') }}</a>
        <a href="#" class="sidebar__foot-link">{{ t('dashboard.helpSupport') }}</a>
      </div>

      <div class="sidebar__user">
        <div class="sidebar__avatar">U</div>
        <div class="sidebar__user-info">
          <span class="sidebar__user-name">{{ t('dashboard.userName') }}</span>
          <span class="sidebar__user-role">{{ t('dashboard.profile') }}</span>
        </div>
        <button
          type="button"
          class="sidebar__logout"
          :aria-label="t('dashboard.logout')"
          @click="handleLogout"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>{{ t('dashboard.logout') }}</span>
        </button>
      </div>

      <div class="sidebar__switches">
        <ThemeSwitch />
        <LanguageSwitcher placement="top" />
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  --sidebar-w: 256px;
  --sidebar-px: 1rem;
  --sidebar-gap: 0.5rem;
  width: var(--sidebar-w);
  min-width: var(--sidebar-w);
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--mise-bg-deep);
  flex-shrink: 0;
  position: relative;
  z-index: 60;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  align-self: stretch;
}

.sidebar__close {
  display: none;
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.25rem;
  height: 2.25rem;
  border: none;
  border-radius: 0.5rem;
  background: transparent;
  color: var(--mise-text-muted);
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: color 0.2s, background 0.2s;
}

.sidebar__close:hover {
  color: var(--mise-text-heading);
  background: color-mix(in srgb, var(--mise-text) 8%, transparent);
}

.sidebar__head {
  padding: 1.5rem var(--sidebar-px) 1.25rem;
  flex-shrink: 0;
}

.sidebar__brand {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--mise-text-heading);
  margin-bottom: 1rem;
}

.sidebar__search {
  position: relative;
  display: flex;
  align-items: center;
}

.sidebar__search-icon {
  position: absolute;
  left: 0.625rem;
  color: var(--mise-text-muted);
  pointer-events: none;
}

.sidebar__search-input {
  width: 100%;
  padding: 0.5rem 2rem 0.5rem 2rem;
  border: none;
  border-radius: 0.5rem;
  background: color-mix(in srgb, var(--mise-text) 5%, transparent);
  color: var(--mise-text-heading);
  font-size: 0.8125rem;
  outline: none;
  transition: background 0.2s;
}

.sidebar__search-input::placeholder {
  color: var(--mise-text-muted);
}

.sidebar__search-input:focus {
  background: color-mix(in srgb, var(--mise-text) 8%, transparent);
}

.sidebar__search-kbd {
  position: absolute;
  right: 0.5rem;
  padding: 0.125rem 0.25rem;
  font-size: 0.5625rem;
  font-family: inherit;
  color: var(--mise-text-muted);
  background: color-mix(in srgb, var(--mise-text) 12%, transparent);
  border-radius: 0.25rem;
  pointer-events: none;
}

.sidebar__nav {
  flex: 1;
  padding: 0.75rem var(--sidebar-px);
  overflow-y: auto;
  min-height: 0;
}

.sidebar__section {
  margin-bottom: 1.25rem;
}

.sidebar__section:last-child {
  margin-bottom: 0;
}

.sidebar__link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0.875rem;
  margin-bottom: var(--sidebar-gap);
  border-radius: 0.5rem;
  color: var(--mise-text-muted);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.2s, background 0.2s;
  width: 100%;
  text-align: left;
  border: none;
  background: transparent;
  cursor: pointer;
}

.sidebar__link:last-child {
  margin-bottom: 0;
}

.sidebar__link:hover {
  color: var(--mise-text-heading);
  background: color-mix(in srgb, var(--mise-text) 6%, transparent);
}

.sidebar__link--active {
  color: var(--mise-accent);
  background: transparent;
}

.sidebar__link--active:hover {
  color: var(--mise-accent);
  background: color-mix(in srgb, var(--mise-accent) 12%, transparent);
}

.sidebar__link-icon {
  display: flex;
  flex-shrink: 0;
  opacity: 0.85;
}

.sidebar__link--active .sidebar__link-icon {
  opacity: 1;
}

.sidebar__link-text {
  flex: 1;
  min-width: 0;
}

.sidebar__badge {
  font-size: 0.6875rem;
  padding: 0.125rem 0.375rem;
  border-radius: 999px;
  background: var(--mise-accent);
  color: #fff;
  font-weight: 600;
}

.sidebar__chevron {
  flex-shrink: 0;
  color: var(--mise-text-muted);
  transition: transform 0.2s ease;
}

.sidebar__sublinks {
  padding-left: 2.5rem;
  margin-top: var(--sidebar-gap);
  display: flex;
  flex-direction: column;
  gap: var(--sidebar-gap);
}

.sidebar__sublink {
  padding: 0.5rem 0;
  border-radius: 0;
  color: var(--mise-text-muted);
  text-decoration: none;
  font-size: 0.8125rem;
  font-weight: 500;
  transition: color 0.2s;
}

.sidebar__sublink:hover {
  color: var(--mise-text-heading);
}

.sidebar__sublink--active {
  color: var(--mise-accent);
}

.sidebar__bottom {
  padding: 1.25rem var(--sidebar-px);
  border-top: 1px solid color-mix(in srgb, var(--mise-text) 10%, transparent);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.sidebar__links {
  display: flex;
  gap: 1rem;
}

.sidebar__foot-link {
  font-size: 0.8125rem;
  font-weight: 500;
  padding: 0.5rem 0;
  color: var(--mise-text-muted);
  text-decoration: none;
  transition: color 0.2s;
}

.sidebar__foot-link:hover {
  color: var(--mise-accent);
}

.sidebar__user {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.sidebar__avatar {
  width: 32px;
  height: 32px;
  border-radius: 0.375rem;
  background: var(--mise-accent);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.8125rem;
  flex-shrink: 0;
}

.sidebar__user-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.0625rem;
}

.sidebar__user-name {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--mise-text-heading);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar__user-role {
  font-size: 0.6875rem;
  color: var(--mise-text-muted);
}

.sidebar__logout {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 0.5rem;
  background: transparent;
  color: var(--mise-text-muted);
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
}

.sidebar__logout:hover {
  color: var(--mise-accent);
  background: color-mix(in srgb, var(--mise-accent) 10%, transparent);
}

.sidebar__logout svg {
  flex-shrink: 0;
}

.sidebar__switches {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  color: var(--mise-text-heading);
}

.sidebar__switches :deep(.mise-theme-switch) {
  flex: 1;
  min-width: 0;
}

.sidebar__switches :deep(.mise-theme-switch__label) {
  display: none;
}

.sidebar__switches :deep(.mise-theme-switch__track) {
  height: 36px;
  max-width: 100%;
}

.sidebar__switches :deep(.mise-theme-switch__segment-text) {
  color: inherit;
  opacity: 0.65;
}

.sidebar__switches :deep(.mise-lang__btn) {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.5rem;
  border: none;
  background: transparent;
}

.sidebar__switches :deep(.mise-lang__btn:hover) {
  background: color-mix(in srgb, var(--mise-text) 10%, transparent);
}

@media (max-width: 900px) {
  .sidebar {
    --sidebar-w: 280px;
    position: fixed;
    top: 0;
    left: 0;
    width: var(--sidebar-w);
    min-width: var(--sidebar-w);
    height: 100vh;
    min-height: 100vh;
    transform: translateX(-100%);
    box-shadow: none;
  }

  .sidebar--open {
    transform: translateX(0);
    box-shadow: 16px 0 48px rgba(0, 0, 0, 0.5);
  }

  .sidebar__close {
    display: flex;
  }

  .sidebar__head {
    padding-top: 2.5rem;
  }
}

@media (min-width: 901px) {
  .sidebar__close {
    display: none !important;
  }
}
</style>
