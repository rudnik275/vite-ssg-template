<script lang="ts" setup>
const {
  size = 'medium',
  appearance = 'primary',
  tag = 'button'
} = defineProps<{
  size?: 'medium' | 'large'
  appearance?: 'primary' | 'primary-invert' | 'plain' | 'plain-invert' | 'plain-invert-borderless'
  icon?: string
  tag?: string
}>()
</script>

<template>
  <component
    :is="tag"
    :class="[
      `e-button__size-${size}`,
      `e-button__appearance-${appearance}`
    ]"
    class="e-button"
  >
    <span>
      <slot/>
    </span>
    <EIcon
      v-if="icon"
      :name="icon"
    />
  </component>
</template>

<style>
.e-button {
  --button-text-color: var(--text-white);
  color: var(--button-text-color);
  padding: 0.9rem 2rem;
  font-weight: 600;
  border: 1px solid transparent;
  border-radius: 4px;
  background: var(--primary);
  cursor: pointer;
  transition: background-color 0.15s;
  display: flex;
  align-items: center;
  gap: 1rem;
  text-align: center;
  line-height: 1;

  .e-icon {
    fill: var(--button-text-color);
  }

  & span {
    flex-grow: 1;
  }

  &:hover {
    background-color: var(--primary-light);
  }
}

.e-button__size-large {
  font-size: 1.6rem;
}

.e-button__appearance-primary-invert {
  background: var(--surface-white);
  --button-text-color: var(--primary);

  &:hover {
    background-color: var(--primary-surface-light);
  }
}

.e-button__appearance-plain {
  border-color: var(--primary);
  --button-text-color: var(--primary);
  background: transparent;

  &:hover {
    background-color: var(--primary-surface-light);
  }
}

.e-button__appearance-plain-invert-borderless,
.e-button__appearance-plain-invert {
  border-color: var(--surface-white);
  --button-text-color: var(--surface-white);
  background: transparent;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
}

.e-button__appearance-plain-invert-borderless {
  border-color: transparent;
}
</style>
