<script lang="ts" setup>
/** @link https://markus.oberlehner.net/blog/transition-to-height-auto-with-vue/ for more info */

const emits = defineEmits<{
  'after-enter': []
}>()

const enter = async (element: HTMLElement) => {
  element.style.width = getComputedStyle(element).width
  element.style.position = 'absolute'
  element.style.visibility = 'hidden'
  element.style.height = 'auto'

  const height = getComputedStyle(element).height

  element.style.width = ''
  element.style.position = ''
  element.style.visibility = ''
  element.style.height = '0'

  setTimeout(() => {
    element.style.height = height
  }, 0)
}

const afterEnter = (element: HTMLElement) => {
  element.style.height = 'auto'
  emits('after-enter')
}

const leave = async (element: HTMLElement) => {
  element.style.height = getComputedStyle(element).height
  setTimeout(() => {
    element.style.height = '0'
  }, 0)
}
</script>

<template>
  <transition
    name="collapse"
    @enter="enter"
    @leave="leave"
    @after-enter="afterEnter"
  >
    <slot/>
  </transition>
</template>

<style>
.collapse-enter-active,
.collapse-leave-active {
  transition: height 0.2s cubic-bezier(0.4, 0.0, 0.2, 1);
  overflow: hidden;
}

.collapse-enter-from,
.collapse-leave-to {
  height: 0;
}
</style>
