<script lang="ts" setup>
import {computed} from 'vue'

const {
  name,
  color,
  size = '1.6rem'
} = defineProps<{
  name: string
  color?: string
  size?: string
}>()

const iconStyles = computed(() => {
  const style = {
    height: size,
    minWidth: size,
    width: size
  } as {
    height: string
    minWidth: string
    width: string
    fill?: string
  }
  if (color) {
    style.fill = `var(--${color})`
  }
  return style
})
</script>

<template>
  <svg :style="iconStyles" class="e-icon">
    <use :href="`#${name}`"/>
  </svg>
</template>

<style>
.e-icon {
  display: block;
  fill: var(--text-black)
}
</style>
