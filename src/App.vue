<script lang="ts" setup>
import { ref, watch, Ref } from 'vue'
import {
  NConfigProvider,
  NGlobalStyle,
  NCard,
  NSpace,
  NButton,
  NInputNumber,
  NGradientText,
  NColorPicker,
  NButtonGroup
} from 'naive-ui'
import { NaiveDarkMode } from './index'
import type { NaiveDarkModeType } from './index'

const dmode = ref((localStorage.getItem('dm') || 'system') as NaiveDarkModeType)

const fadeLayer = ref(Number(localStorage.getItem('fadeLayer')) || 25)

const light = ref((localStorage.getItem('light') || '#FFE0E0FC') as string)

const dark = ref((localStorage.getItem('dark') || '#243333FC') as string)

// Watch for changes in variable and update the localStorage
watch(dmode, (value) => {
  if (value) {
    localStorage.setItem('dm', value.toString())
  }
})

watch(fadeLayer, (value) => {
  if (value) {
    localStorage.setItem('fadeLayer', value.toString())
  }
})

watch(light, (value) => {
  if (value) {
    localStorage.setItem('light', value.toString())
  }
})

watch(dark, (value) => {
  if (value) {
    localStorage.setItem('dark', value.toString())
  }
})

function handleDarkModeChange(mode: NaiveDarkModeType): void {
  dmode.value = mode
}

// v-model 子组件的值
const color = ref('')

const naiveTheme: Ref<any> = ref(undefined)
</script>

<template>
  <n-config-provider :theme="naiveTheme">
    <n-global-style />
    <naive-dark-mode
      v-model:color="color"
      v-model:naivetheme="naiveTheme"
      :dark-mode="dmode"
      :fade-layer="fadeLayer"
      :design-light="light"
      :design-dark="dark"
      class="naive-dark-mode"
    />
    <div class="main-space">
      <n-card style="width: fit-content">
        <n-space vertical>
          <n-space justify="center">
            <n-gradient-text :size="20">
              {{ dmode }}
            </n-gradient-text>
          </n-space>
          <n-space justify="center">
            <n-button-group>
              <n-button style="width: 80px" @click="handleDarkModeChange('system')">
                System
              </n-button>
              <n-button style="width: 80px" @click="handleDarkModeChange('light')">
                Light
              </n-button>
              <n-button style="width: 80px" @click="handleDarkModeChange('dark')"> Dark </n-button>
            </n-button-group>
          </n-space>
          <n-space justify="center">
            <n-input-number
              v-model:value="fadeLayer"
              clearable
              step="1"
              style="width: 240px"
              placeholder="FadeLayer"
            />
          </n-space>
          <n-color-picker v-model:value="light" :modes="['hex']" />
          <n-color-picker v-model:value="dark" :modes="['hex']" />
        </n-space>
      </n-card>
    </div>
  </n-config-provider>
</template>

<style lang="scss" scoped>
$global-color: v-bind(color);

.naive-dark-mode {
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: $global-color;
  display: flex;
  flex-direction: column;
}

.main-space {
  position: absolute;
  top: 30%;
  left: calc(50% - 150px);
  background-color: transparent;
}
</style>
