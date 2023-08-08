import { ref, Ref } from 'vue'
import { NaiveDarkModeType } from '../types/MyTypes.ts'

export const DarkMode: Ref<NaiveDarkModeType> = ref(undefined)
export const globalcolor = ref('#ffffff')
export const DarkTheme = ref(false)
export const DesignDarkColor = ref('#000000')
export const DesignLightColor = ref('#ffffff')
export const FadeLayer = ref(25)
