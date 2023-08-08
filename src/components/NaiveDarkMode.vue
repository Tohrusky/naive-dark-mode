<script lang="ts" setup>
import { onBeforeMount, watch, PropType, onMounted } from 'vue'
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
  // 预设 DarkTheme.value
  DarkTheme.value = false
  // 传入
  DarkMode.value = props.darkMode
  DesignDarkColor.value = props.designDark
  DesignLightColor.value = props.designLight
  // set designLightColor to globalcolor
  globalcolor.value = props.designLight
  FadeLayer.value = props.fadeLayer
  // console.log('onBeforeMount  DarkMode.value', DarkMode.value)
})

function handleDarkModeChange(mode: NaiveDarkModeType): void {
  // console.log('handleDarkModeChange  DarkTheme.value', DarkTheme.value)
  // console.log('handleDarkModeChange  mode', mode)
  if (mode === 'system' || mode === undefined) {
    DarkTheme.value = osThemeRef.value === 'dark'
  } else {
    DarkTheme.value = mode === 'dark'
  }
}

onMounted(() => {
  // console.log('onMounted  DarkMode.value', DarkMode.value)
  handleDarkModeChange(DarkMode.value)
})

watch(DarkMode, (value) => {
  // console.log('watch DarkMode  ', value)
  handleDarkModeChange(value)
})

// 检测系统主题，修改 DarkTheme.value
watch(osThemeRef, (value) => {
  // console.log('watch  osThemeRef', value)
  if (DarkMode.value === 'system' || DarkMode.value === undefined) {
    DarkTheme.value = value === 'dark'
  }
})

// 检测 DarkTheme.value，修改 CSS 样式
watch(DarkTheme, (value) => {
  // console.log('watch DarkTheme  ', value)
  if (value) {
    if (isCSSLight()) {
      switchCSSStyle('dark')
    }
  } else {
    if (isCSSDark()) {
      switchCSSStyle('light')
    }
  }
})
</script>

<template>
  <div />
</template>

<style lang="scss"></style>
