<script generic="Slide" lang="ts" setup>
import {ref} from 'vue'
import {useDebounceFn, useIntervalFn} from '@vueuse/core'

interface NavigationProps {
  length: number
  activeIndex: number
  setIndex: (index: number) => void
  next: () => void
  prev: () => void
}

type NavigationSlot = (props: NavigationProps) => any

defineSlots<{
  slide(props: { slide: Slide, index: number }): any
  'navigation-before'?: NavigationSlot
  'navigation-after'?: NavigationSlot
}>()

const {
  slides,
  timeout = 7000
} = defineProps<{
  slides: Slide[]
  timeout?: number
}>()

const activeIndex = ref(0)

const sliderElement = ref<HTMLElement>()
const onScroll = useDebounceFn((event: Event) => {
  const {scrollLeft, scrollWidth} = event.target as HTMLElement
  activeIndex.value = Math.round(scrollLeft / (scrollWidth / slides.length))
}, 100)

const scrollToIndex = (index: number) => {
  activeIndex.value = index
  const element = sliderElement.value!
  element.scrollTo({
    behavior: 'smooth',
    left: index * element.clientWidth
  })
}

const next = () => {
  if (activeIndex.value === slides.length - 1) {
    scrollToIndex(0)
  } else {
    scrollToIndex(activeIndex.value + 1)
  }
}

const prev = () => {
  if (activeIndex.value === 0) {
    scrollToIndex(slides.length - 1)
  } else {
    scrollToIndex(activeIndex.value - 1)
  }
}

const {pause, resume} = useIntervalFn(next, timeout)
</script>

<template>
  <div
    class="e-slider-container"
    tabindex="-1"
    @focusin="pause"
    @focusout="resume"
  >
    <slot
      :active-index="activeIndex"
      :length="slides.length"
      :next="next"
      :prev="prev"
      :set-index="scrollToIndex"
      name="navigation-before"
    />
    <div
      ref="sliderElement"
      class="e-slider"
      @scroll="onScroll"
    >
      <div
        v-for="(slide, index) in slides"
        class="e-slider__slide"
      >
        <slot
          :index="index"
          :slide="slide"
          name="slide"
        />
      </div>
    </div>
    <slot
      :active-index="activeIndex"
      :length="slides.length"
      :next="next"
      :prev="prev"
      :set-index="scrollToIndex"
      name="navigation-after"
    />
  </div>
</template>

<style>
.e-slider-container {
  &:focus {
    outline: none;
  }
}

.e-slider {
  display: flex;
  overflow: auto;
  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar {
    display: none;
  }
}

.e-slider__slide {
  flex: 1 0 100%;
  scroll-snap-align: start;
  user-select: none;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
