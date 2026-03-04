<template>
  <button
    :class="buttonClasses"
    :style="buttonStyles"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

type ButtonType = 'transparent' | 'dark' | 'light' | 'color';
type ButtonShape = 'rounded' | 'round';

interface ButtonProps {
  type?: ButtonType;
  shape?: ButtonShape;
  color?: string;
  disabled?: boolean;
  className?: string;
  elevation?: boolean;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'transparent',
  shape: 'rounded',
  color: undefined,
  disabled: false,
  className: '',
  elevation: true
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const isHovered = ref(false);

const buttonClasses = computed(() => {
  const classes: string[] = [
    'button',
    `button--${props.type}`,
    `button--${props.shape}`,
    props.className
  ];

  if (props.disabled) {
    classes.push('button--disabled');
  }

  if (isHovered.value && props.elevation) {
    classes.push('button--elevated');
  }

  return classes.join(' ');
});

const buttonStyles = computed(() => {
  const styles: Record<string, string> = {};

  if (props.type === 'color' && props.color) {
    styles.backgroundColor = props.color;
    styles.borderColor = props.color;
  }

  return styles;
});

const handleMouseEnter = () => {
  if (!props.disabled) {
    isHovered.value = true;
  }
};

const handleMouseLeave = () => {
  isHovered.value = false;
};

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event);
  }
};
</script>

<style scoped>
.button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: 2px solid;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  outline: none;
  position: relative;
  overflow: hidden;
  background: transparent;
  text-decoration: none;
}

/* Shapes */
.button--rounded {
  border-radius: 0.5rem;
}

.button--round {
  border-radius: 9999px;
}

/* Types */
.button--transparent {
  background-color: transparent;
  border-color: rgba(255, 255, 255, 0.3);
  color: white;
}

.button--transparent:hover:not(.button--disabled) {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
}

.button--dark {
  background-color: #1a1a1a;
  border-color: #1a1a1a;
  color: white;
}

.button--dark:hover:not(.button--disabled) {
  background-color: #2a2a2a;
  border-color: #2a2a2a;
}

.button--light {
  background-color: white;
  border-color: white;
  color: #1a1a1a;
}

.button--light:hover:not(.button--disabled) {
  background-color: #f5f5f5;
  border-color: #f5f5f5;
}

.button--color {
  color: white;
}

.button--color:hover:not(.button--disabled) {
  opacity: 0.9;
}

/* Elevation */
.button--elevated {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}

/* Disabled */
.button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Active state */
.button:active:not(.button--disabled) {
  transform: translateY(0);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* Responsive */
@media (max-width: 768px) {
  .button {
    padding: 0.6rem 1.2rem;
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .button {
    padding: 0.5rem 0.9rem;
    font-size: 0.75rem;
  }
}
</style>
