import { default as NaiveDarkMode } from './components/NaiveDarkMode.vue'
import type { NaiveDarkModeType } from './types/MyTypes.ts'
import {
  switchCSSStyle,
  switchTheme,
  isCSSDark,
  isCSSLight,
  naiveTheme
} from './utils/DarkModeColor.ts'
import { DarkTheme, globalcolor } from './store/DarkModeStore.ts'

export { NaiveDarkMode }
export type { NaiveDarkModeType }
export { switchCSSStyle, switchTheme, isCSSDark, isCSSLight, naiveTheme }
export { DarkTheme, globalcolor }
