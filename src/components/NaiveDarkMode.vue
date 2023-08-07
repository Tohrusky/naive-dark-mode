<script lang="ts" setup>
import { onBeforeMount, onMounted, watch, PropType } from 'vue'
import { useOsTheme } from 'naive-ui'
import {
  DarkMode,
  DarkTheme,
  globalcolor,
  DesignDarkColor,
  DesignLightColor,
  FadeLayer
} from '../store/DarkModeStore.ts'
import { switchCSSStyle, isCSSDark, isCSSLight } from '../utils/DarkModeColor'
import { NaiveDarkModeType } from '../types/MyTypes.ts'

const osThemeRef = useOsTheme()

const props = defineProps({
  darkMode: {
    type: String as PropType<NaiveDarkModeType>,
    default: () => 'system'
  },
  designDark: {
    type: String,
    default: () => '#000000'
  },
  designLight: {
    type: String,
    default: () => '#ffffff'
  },
  fadeLayer: {
    type: Number,
    default: () => 25
  }
})

onBeforeMount(() => {
  DarkMode.value = props.darkMode
  DesignDarkColor.value = props.designDark
  DesignLightColor.value = props.designLight
  // set designLightColor to globalcolor
  globalcolor.value = props.designLight
  FadeLayer.value = props.fadeLayer
})

onMounted(async () => {
  if (DarkMode.value === 'system' || DarkMode.value === undefined) {
    DarkTheme.value = osThemeRef.value === 'dark'
  } else {
    DarkTheme.value = DarkMode.value === 'dark'
    if (DarkMode.value === 'dark') {
      if (isCSSLight()) {
        switchCSSStyle('dark-theme')
      }
    } else {
      if (isCSSDark()) {
        switchCSSStyle('light-theme')
      }
    }
  }
  console.log('onMounted  ', DarkTheme.value)
})

// 检测系统主题，修改 DarkTheme.value
watch(osThemeRef, (value) => {
  if (DarkMode.value === 'system' || DarkMode.value === undefined) {
    DarkTheme.value = value === 'dark'
    console.log('watch  ', DarkTheme.value)
  }
})
</script>

<template>
  <div />
</template>

<style lang="scss"></style>
