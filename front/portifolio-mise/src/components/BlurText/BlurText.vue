<template>
  <p ref="rootRef" :class="['blur-text', className, 'flex', 'flex-wrap']">
    <Motion
      v-for="(segment, index) in elements"
      :key="`${animationKey}-${index}`"
      tag="span"
      :initial="fromSnapshot"
      :animate="inView ? getAnimateKeyframes() : fromSnapshot"
      :transition="getTransition(index)"
      :style="{
        display: 'inline-block',
        willChange: 'transform, filter, opacity'
      }"
      @animation-complete="() => handleAnimationComplete(index)"
    >
      {{ segment === ' ' ? '\u00A0' : segment
      }}{{ animateBy === 'words' && index < elements.length - 1 ? '\u00A0' : '' }}
    </Motion>
  </p>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, useTemplateRef } from 'vue';
import { Motion } from 'motion-v';

type AnimateBy = 'words' | 'letters';
type Direction = 'top' | 'bottom';
type AnimationSnapshot = Record<string, string | number>;

interface BlurTextProps {
  text?: string;
  texts?: string[];
  delay?: number;
  className?: string;
  animateBy?: AnimateBy;
  direction?: Direction;
  threshold?: number;
  rootMargin?: string;
  animationFrom?: AnimationSnapshot;
  animationTo?: AnimationSnapshot[];
  easing?: (t: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  rotationInterval?: number;
  auto?: boolean;
  loop?: boolean;
}

const props = withDefaults(defineProps<BlurTextProps>(), {
  text: '',
  texts: undefined,
  delay: 200,
  className: '',
  animateBy: 'words' as AnimateBy,
  direction: 'top' as Direction,
  threshold: 0.1,
  rootMargin: '0px',
  easing: (t: number) => t,
  stepDuration: 0.35,
  rotationInterval: 3000,
  auto: true,
  loop: true
});

const buildKeyframes = (
  from: AnimationSnapshot,
  steps: AnimationSnapshot[]
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([...Object.keys(from), ...steps.flatMap(step => Object.keys(step))]);

  const keyframes: Record<string, Array<string | number>> = {};

  for (const key of keys) {
    const fromVal = from[key] ?? '';
    const toVals = steps.map(step => step[key] ?? '');
    keyframes[key] = [fromVal, ...toVals];
  }

  return keyframes;
};

const currentTextIndex = ref(0);
let intervalId: ReturnType<typeof setInterval> | null = null;

const currentText = computed(() => {
  if (props.texts && props.texts.length > 0) {
    return props.texts[currentTextIndex.value] || '';
  }
  return props.text || '';
});

const elements = computed(() => {
  const text = currentText.value;
  if (!text) return [];
  return props.animateBy === 'words' ? text.split(' ') : text.split('');
});

const defaultFrom = computed<AnimationSnapshot>(() =>
  props.direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -50 } : { filter: 'blur(10px)', opacity: 0, y: 50 }
);

const defaultTo = computed<AnimationSnapshot[]>(() => [
  {
    filter: 'blur(5px)',
    opacity: 0.5,
    y: props.direction === 'top' ? 5 : -5
  },
  {
    filter: 'blur(0px)',
    opacity: 1,
    y: 0
  }
]);

const fromSnapshot = computed(() => props.animationFrom ?? defaultFrom.value);
const toSnapshots = computed(() => props.animationTo ?? defaultTo.value);

const stepCount = computed(() => toSnapshots.value.length + 1);
const totalDuration = computed(() => props.stepDuration * (stepCount.value - 1));
const times = computed(() =>
  Array.from({ length: stepCount.value }, (_, i) => (stepCount.value === 1 ? 0 : i / (stepCount.value - 1)))
);

const inView = ref(false);
const animationKey = ref(0);
const completionFired = ref(false);
const rootRef = useTemplateRef<HTMLParagraphElement>('rootRef');

let observer: IntersectionObserver | null = null;

const setupObserver = () => {
  if (!rootRef.value) return;

  observer = new IntersectionObserver(
    entries => {
      const entry = entries[0];
      if (entry && entry.isIntersecting) {
        inView.value = true;
        observer?.unobserve(rootRef.value as Element);
      }
    },
    {
      threshold: props.threshold,
      rootMargin: props.rootMargin
    }
  );

  observer.observe(rootRef.value);
};

const getAnimateKeyframes = () => {
  return buildKeyframes(fromSnapshot.value, toSnapshots.value);
};

const getTransition = (index: number) => {
  return {
    duration: totalDuration.value,
    times: times.value,
    delay: (index * props.delay) / 1000,
    ease: props.easing
  };
};

let rotationTimeoutId: ReturnType<typeof setTimeout> | null = null;

const handleAnimationComplete = (index: number) => {
  if (index === elements.value.length - 1 && !completionFired.value) {
    completionFired.value = true;
    props.onAnimationComplete?.();
    
    // Schedule next text rotation after animation completes
    if (props.auto && props.texts && props.texts.length > 1) {
      if (rotationTimeoutId) {
        clearTimeout(rotationTimeoutId);
      }
      rotationTimeoutId = setTimeout(() => {
        if (completionFired.value) {
          nextText();
        }
      }, props.rotationInterval);
    }
  }
};

const nextText = () => {
  if (!props.texts || props.texts.length === 0) return;
  
  const isAtEnd = currentTextIndex.value === props.texts.length - 1;
  if (isAtEnd && !props.loop) return;
  
  currentTextIndex.value = isAtEnd ? 0 : currentTextIndex.value + 1;
  animationKey.value++;
  completionFired.value = false;
  inView.value = false;
  
  // Reset observer to trigger animation again
  if (rootRef.value) {
    observer?.disconnect();
    setupObserver();
  }
};

const cleanupInterval = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  if (rotationTimeoutId) {
    clearTimeout(rotationTimeoutId);
    rotationTimeoutId = null;
  }
};

const startInterval = () => {
  cleanupInterval();
  // The rotation will be triggered by handleAnimationComplete
  // This function is kept for compatibility but the actual rotation
  // happens after animation completes
};

const next = () => {
  nextText();
};

const previous = () => {
  if (!props.texts || props.texts.length === 0) return;
  
  const isAtStart = currentTextIndex.value === 0;
  if (isAtStart && !props.loop) return;
  
  currentTextIndex.value = isAtStart ? props.texts.length - 1 : currentTextIndex.value - 1;
  animationKey.value++;
  completionFired.value = false;
  inView.value = false;
  
  if (rootRef.value) {
    observer?.disconnect();
    setupObserver();
  }
};

const jumpTo = (index: number) => {
  if (!props.texts || props.texts.length === 0) return;
  
  const validIndex = Math.max(0, Math.min(index, props.texts.length - 1));
  if (validIndex !== currentTextIndex.value) {
    currentTextIndex.value = validIndex;
    animationKey.value++;
    completionFired.value = false;
    inView.value = false;
    
    if (rootRef.value) {
      observer?.disconnect();
      setupObserver();
    }
  }
};

defineExpose({
  next,
  previous,
  jumpTo
});

onMounted(() => {
  setupObserver();
  // Start interval is handled by animation completion
});

onUnmounted(() => {
  observer?.disconnect();
  cleanupInterval();
});

watch([() => props.threshold, () => props.rootMargin], () => {
  observer?.disconnect();
  setupObserver();
});

watch([() => props.delay, () => props.stepDuration, () => props.animateBy, () => props.direction], () => {
  animationKey.value++;
  completionFired.value = false;
});

watch([() => props.auto, () => props.rotationInterval, () => props.texts], () => {
  cleanupInterval();
  startInterval();
});

watch(() => currentText.value, () => {
  animationKey.value++;
  completionFired.value = false;
  inView.value = false;
  if (rootRef.value) {
    observer?.disconnect();
    setupObserver();
  }
});
</script>
