export { default as NaiveDarkMode } from './components/NaiveDarkMode.vue'
export type { NaiveDarkModeType } from './types/MyTypes.ts'
export {
  switchCSSStyle,
  switchTheme,
  isCSSDark,
  isCSSLight,
  naiveTheme
} from './utils/DarkModeColor.ts'
export { DarkTheme, globalcolor } from './store/DarkModeStore.ts'
