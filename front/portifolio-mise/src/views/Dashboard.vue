<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import DashboardSidebar from '../components/Dashboard/DashboardSidebar.vue';
import RevenueChart from '../components/Dashboard/RevenueChart.vue';

const { t } = useI18n();
const sidebarOpen = ref(false);

const closeSidebar = () => {
  sidebarOpen.value = false;
};

const chartData = [
  { day: '5 Mar', value: 4200 },
  { day: '6 Mar', value: 5100 },
  { day: '7 Mar', value: 7480 },
  { day: '8 Mar', value: 6200 },
  { day: '9 Mar', value: 7100 },
  { day: '10 Mar', value: 5800 },
  { day: '11 Mar', value: 6900 },
  { day: '12 Mar', value: 8200 },
  { day: '13 Mar', value: 7500 },
  { day: '14 Mar', value: 9100 },
  { day: '15 Mar', value: 8800 },
  { day: '16 Mar', value: 9500 },
  { day: '17 Mar', value: 8700 },
  { day: '18 Mar', value: 9200 },
  { day: '19 Mar', value: 5288 },
];

const transactions = [
  { id: 'TXN-001', date: '19 Mar 2026', status: 'paid', email: 'cliente@email.com', amount: 'R$ 1.240' },
  { id: 'TXN-002', date: '18 Mar 2026', status: 'pending', email: 'outro@email.com', amount: 'R$ 890' },
  { id: 'TXN-003', date: '17 Mar 2026', status: 'paid', email: 'contato@empresa.com', amount: 'R$ 2.100' },
  { id: 'TXN-004', date: '16 Mar 2026', status: 'paid', email: 'vendas@loja.com', amount: 'R$ 450' },
  { id: 'TXN-005', date: '15 Mar 2026', status: 'pending', email: 'suporte@tech.com', amount: 'R$ 3.200' },
];
</script>

<template>
  <div class="dashboard-layout">
    <div
      class="dashboard-overlay"
      :class="{ 'dashboard-overlay--visible': sidebarOpen }"
      aria-hidden="true"
      @click="closeSidebar"
    />
    <DashboardSidebar v-model:open="sidebarOpen" />

    <main class="dashboard-main">
      <header class="dashboard-main__header">
        <div class="dashboard-main__header-top">
          <button
            type="button"
            class="dashboard-main__menu-btn"
            :aria-label="t('dashboard.menu')"
            @click="sidebarOpen = true"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <h1 class="dashboard-main__title">
            <svg class="dashboard-main__title-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            {{ t('dashboard.home') }}
          </h1>
          <div class="dashboard-main__actions">
            <button type="button" class="dashboard-main__action" aria-label="Notificações">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </button>
            <button type="button" class="dashboard-main__action dashboard-main__action--primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>
        </div>
        <div class="dashboard-main__filters">
          <div class="dashboard-main__filter">
            <label class="dashboard-main__filter-label">{{ t('dashboard.dateRange') }}</label>
            <span class="dashboard-main__filter-value">5 Mar 2026 — 19 Mar 2026</span>
          </div>
          <div class="dashboard-main__filter">
            <label class="dashboard-main__filter-label">{{ t('dashboard.frequency') }}</label>
            <span class="dashboard-main__filter-value">{{ t('dashboard.daily') }}</span>
          </div>
        </div>
      </header>

      <section class="dashboard-main__kpis">
        <div class="dashboard-kpi">
          <span class="dashboard-kpi__icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </span>
          <div class="dashboard-kpi__content">
            <span class="dashboard-kpi__value">709</span>
            <span class="dashboard-kpi__label">{{ t('dashboard.customersLabel') }}</span>
            <span class="dashboard-kpi__badge">+11%</span>
          </div>
        </div>
        <div class="dashboard-kpi">
          <span class="dashboard-kpi__icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          </span>
          <div class="dashboard-kpi__content">
            <span class="dashboard-kpi__value">1.595</span>
            <span class="dashboard-kpi__label">{{ t('dashboard.conversions') }}</span>
            <span class="dashboard-kpi__badge">+11%</span>
          </div>
        </div>
        <div class="dashboard-kpi">
          <span class="dashboard-kpi__icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </span>
          <div class="dashboard-kpi__content">
            <span class="dashboard-kpi__value">R$ 239.336</span>
            <span class="dashboard-kpi__label">{{ t('dashboard.revenue') }}</span>
            <span class="dashboard-kpi__badge">+16%</span>
          </div>
        </div>
        <div class="dashboard-kpi">
          <span class="dashboard-kpi__icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </span>
          <div class="dashboard-kpi__content">
            <span class="dashboard-kpi__value">154</span>
            <span class="dashboard-kpi__label">{{ t('dashboard.orders') }}</span>
            <span class="dashboard-kpi__badge dashboard-kpi__badge--negative">−5%</span>
          </div>
        </div>
      </section>

      <section class="dashboard-main__chart">
        <div class="dashboard-chart__header">
          <h2 class="dashboard-chart__title">{{ t('dashboard.revenueChart') }}</h2>
          <span class="dashboard-chart__total">R$ 79.315</span>
        </div>
        <div class="dashboard-chart__canvas">
          <RevenueChart :data="chartData" />
        </div>
      </section>

      <section class="dashboard-main__table">
        <h2 class="dashboard-table__title">{{ t('dashboard.recentTransactions') }}</h2>
        <div class="dashboard-table__wrap">
          <table class="dashboard-table">
            <thead>
              <tr>
                <th>{{ t('dashboard.id') }}</th>
                <th>{{ t('dashboard.date') }}</th>
                <th>{{ t('dashboard.status') }}</th>
                <th>Email</th>
                <th>{{ t('dashboard.amount') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tx in transactions" :key="tx.id">
                <td>{{ tx.id }}</td>
                <td>{{ tx.date }}</td>
                <td>
                  <span
                    class="dashboard-table__badge"
                    :class="tx.status === 'paid' ? 'dashboard-table__badge--success' : 'dashboard-table__badge--pending'"
                  >
                    {{ tx.status === 'paid' ? t('dashboard.paid') : t('dashboard.pending') }}
                  </span>
                </td>
                <td>{{ tx.email }}</td>
                <td>{{ tx.amount }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: flex;
  height: 100vh;
  min-height: 100vh;
  overflow: hidden;
  background: var(--mise-bg);
  color: var(--mise-text-heading);
  position: relative;
}

.dashboard-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 55;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease;
}

.dashboard-overlay--visible {
  opacity: 1;
  pointer-events: auto;
}

@media (max-width: 900px) {
  .dashboard-overlay {
    display: block;
  }
}

.dashboard-main {
  flex: 1;
  min-width: 0;
  min-height: 0;
  overflow-y: auto;
  padding: 2rem 2.5rem 3rem;
}

.dashboard-main__header {
  margin-bottom: 2.25rem;
}

.dashboard-main__header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.dashboard-main__menu-btn {
  display: none;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 0.5rem;
  background: transparent;
  color: var(--mise-text-heading);
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s;
}

.dashboard-main__menu-btn:hover {
  background: color-mix(in srgb, var(--mise-text) 8%, transparent);
}

@media (max-width: 900px) {
  .dashboard-main__menu-btn {
    display: flex;
  }
}

.dashboard-main__title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin: 0;
  color: var(--mise-text-heading);
  min-width: 0;
  flex: 1;
}

.dashboard-main__title-icon {
  flex-shrink: 0;
  opacity: 0.85;
  color: var(--mise-text-muted);
}

.dashboard-main__actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.dashboard-main__action {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  border: 1px solid color-mix(in srgb, var(--mise-text) 15%, transparent);
  background: color-mix(in srgb, var(--mise-text) 5%, transparent);
  color: var(--mise-text-heading);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}

.dashboard-main__action svg {
  flex-shrink: 0;
  stroke: currentColor;
}

.dashboard-main__action:hover {
  background: color-mix(in srgb, var(--mise-text) 12%, transparent);
  border-color: color-mix(in srgb, var(--mise-text) 25%, transparent);
}

.dashboard-main__action--primary {
  color: #fff;
  background: var(--mise-accent);
  border-color: var(--mise-accent);
}

.dashboard-main__action--primary:hover {
  background: var(--mise-accent-hover);
  border-color: var(--mise-accent-hover);
}

.dashboard-main__filters {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.dashboard-main__filter {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.dashboard-main__filter-label {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--mise-text-muted);
}

.dashboard-main__filter-value {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--mise-text-heading);
}

.dashboard-main__kpis {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.25rem;
  margin-bottom: 2.25rem;
}

.dashboard-kpi {
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid color-mix(in srgb, var(--mise-text) 10%, transparent);
  background: transparent;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  min-width: 0;
  transition: background 0.2s, border-color 0.2s;
}

.dashboard-kpi:hover {
  background: color-mix(in srgb, var(--mise-text) 4%, transparent);
  border-color: color-mix(in srgb, var(--mise-text) 18%, transparent);
}

.dashboard-kpi__icon {
  display: flex;
  flex-shrink: 0;
  color: var(--mise-text-muted);
  opacity: 0.9;
}

.dashboard-kpi__content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.dashboard-kpi__value {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--mise-text-heading);
}

.dashboard-kpi__label {
  font-size: 0.8125rem;
  color: var(--mise-text-muted);
}

.dashboard-kpi__badge {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--mise-accent);
  margin-top: 0.125rem;
}

.dashboard-main__chart {
  margin-bottom: 2.25rem;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid color-mix(in srgb, var(--mise-text) 10%, transparent);
  background: transparent;
}

.dashboard-chart__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.dashboard-chart__title {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--mise-text-muted);
  margin: 0;
}

.dashboard-chart__total {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--mise-accent);
}

.dashboard-chart__canvas {
  margin-top: 0.5rem;
}

.dashboard-main__table {
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid color-mix(in srgb, var(--mise-text) 10%, transparent);
  background: transparent;
}

.dashboard-table__title {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--mise-text-muted);
  margin: 0 0 1rem;
}

.dashboard-table__wrap {
  overflow-x: auto;
}

.dashboard-table {
  width: 100%;
  min-width: 480px;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.dashboard-table th {
  text-align: left;
  padding: 0.625rem 1rem;
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--mise-text-muted);
  border-bottom: 1px solid color-mix(in srgb, var(--mise-text) 12%, transparent);
}

.dashboard-table td {
  padding: 0.875rem 1rem;
  border-bottom: 1px solid color-mix(in srgb, var(--mise-text) 8%, transparent);
  color: var(--mise-text);
}

.dashboard-table tbody tr {
  transition: background 0.2s;
}

.dashboard-table tbody tr:hover {
  background: color-mix(in srgb, var(--mise-text) 5%, transparent);
}

.dashboard-table__badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  font-size: 0.6875rem;
  font-weight: 600;
}

.dashboard-table__badge--success {
  background: transparent;
  color: var(--mise-accent);
}

.dashboard-table__badge--pending {
  background: transparent;
  color: var(--mise-text-muted);
}

@media (max-width: 1200px) {
  .dashboard-main__kpis {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .dashboard-main {
    padding: 1.25rem 1rem 2rem;
  }

  .dashboard-main__header-top {
    flex-wrap: wrap;
  }

  .dashboard-main__title {
    font-size: 1.25rem;
  }

  .dashboard-main__kpis {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .dashboard-kpi {
    padding: 1rem;
  }

  .dashboard-kpi__value {
    font-size: 1.25rem;
  }

  .dashboard-main__filters {
    flex-direction: column;
    gap: 1rem;
  }

  .dashboard-main__chart,
  .dashboard-main__table {
    padding: 1.25rem;
  }

  .dashboard-chart__total {
    font-size: 1.5rem;
  }
}
</style>
