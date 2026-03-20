<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
} from 'chart.js';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip
);

const props = defineProps<{
  data: { day: string; value: number }[];
}>();

const canvasRef = ref<HTMLCanvasElement | null>(null);
let chart: Chart | null = null;

const getCssVar = (name: string, fallback: string) =>
  getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim() || fallback;

const chartData = () => ({
  labels: props.data.map((d) => d.day),
  datasets: [
    {
      data: props.data.map((d) => d.value),
      fill: true,
      borderColor: getCssVar('--mise-accent', '#0f4c5c'),
      backgroundColor: `${getCssVar('--mise-accent', '#0f4c5c')}26`,
      borderWidth: 2,
      tension: 0.35,
      pointRadius: 0,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: getCssVar('--mise-accent', '#0f4c5c'),
      pointHoverBorderColor: '#fff',
      pointHoverBorderWidth: 2,
    },
  ],
});

const chartOptions = () => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
    mode: 'index' as const,
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      titleColor: '#fff',
      bodyColor: '#94a3b8',
      padding: 12,
      cornerRadius: 8,
      displayColors: false,
      callbacks: {
        label: (ctx: { raw: unknown }) =>
          `R$ ${Number(ctx.raw).toLocaleString('pt-BR')}`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      border: { display: false },
      ticks: {
        color: getCssVar('--mise-text-muted', '#94a3b8'),
        font: { size: 11 },
        maxRotation: 0,
      },
    },
    y: {
      grid: {
        color: 'rgba(148, 163, 184, 0.12)',
      },
      border: { display: false },
      ticks: {
        color: getCssVar('--mise-text-muted', '#94a3b8'),
        font: { size: 11 },
        callback: (value: string | number) =>
          Number(value) >= 1000 ? `${Number(value) / 1000}k` : value,
      },
    },
  },
});

onMounted(() => {
  if (!canvasRef.value) return;
  const ctx = canvasRef.value.getContext('2d');
  if (!ctx) return;
  chart = new Chart(ctx, {
    type: 'line',
    data: chartData(),
    options: chartOptions(),
  });
});

onBeforeUnmount(() => {
  chart?.destroy();
});

watch(
  () => props.data,
  () => {
    if (chart) {
      chart.data = chartData();
      chart.update('none');
    }
  },
  { deep: true }
);
</script>

<template>
  <div class="revenue-chart">
    <canvas ref="canvasRef" />
  </div>
</template>

<style scoped>
.revenue-chart {
  width: 100%;
  height: 180px;
  min-height: 120px;
  position: relative;
}
</style>
