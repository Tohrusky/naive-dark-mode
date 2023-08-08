import {
  DarkTheme,
  globalcolor,
  DesignDarkColor,
  DesignLightColor,
  FadeLayer,
  DarkMode
} from '../store/DarkModeStore.ts'
import { nextTick, computed } from 'vue'
import { darkTheme, useOsTheme } from 'naive-ui'
import { NaiveDarkModeType } from '../types/MyTypes.ts'

/**
 * @description Interpolate two colors by a given factor
 */
function interpolateColor(color1: string, color2: string, factor: number): string {
  if (factor === 0) return color1
  if (factor === 1) return color2

  const c1 = hexToRgb(color1)
  const c2 = hexToRgb(color2)

  const r = Math.round(interpolate(c1.r, c2.r, factor))
  const g = Math.round(interpolate(c1.g, c2.g, factor))
  const b = Math.round(interpolate(c1.b, c2.b, factor))

  return `rgb(${r}, ${g}, ${b})`
}

function interpolate(start: number, end: number, factor: number): number {
  return start + (end - start) * factor
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return { r, g, b }
}

/**
 * @description Smooth transition to dark mode
 * @param mode 'dark' or 'light' or 'system'
 */
function switchCSSStyle(mode: NaiveDarkModeType): void {
  if (mode === 'system') {
    const osThemeRef = useOsTheme()
    mode = osThemeRef.value === 'dark' ? 'dark' : 'light'
  }
  const targetColor = mode === 'dark' ? DesignDarkColor.value : DesignLightColor.value
  const initialColor = mode === 'dark' ? DesignLightColor.value : DesignDarkColor.value
  const layer = Math.ceil(FadeLayer.value)

  if (layer < 1) {
    globalcolor.value = targetColor
    return
  }

  for (let i = 1; i <= layer; i++) {
    setTimeout(() => {
      nextTick(() => {
        globalcolor.value = interpolateColor(initialColor, targetColor, i / layer)
      })
    }, layer * i)
  }
}

/**
 * @description Switch the theme between light and dark
 * @param mode 'dark' or 'light' or 'system'
 */
function switchTheme(mode: NaiveDarkModeType): void {
  DarkMode.value = mode
}

/**
 * @description Check if the current CSS theme is dark
 */
function isCSSDark(): boolean {
  return globalcolor.value === DesignDarkColor.value
}

/**
 * @description Check if the current CSS theme is light
 */
function isCSSLight(): boolean {
  return globalcolor.value === DesignLightColor.value
}

/**
 * @description Set the naive-ui theme according to the DarkTheme value
 */
const naiveTheme = computed(() => {
  return DarkTheme.value ? darkTheme : undefined
})

export { switchCSSStyle, switchTheme, isCSSDark, isCSSLight, naiveTheme }
