<script lang="ts" setup>
import { ref, watch } from 'vue'
import {
  NConfigProvider,
  NGlobalStyle,
  NCard,
  NSpace,
  NButton,
  NInputNumber,
  NGradientText,
  NColorPicker
} from 'naive-ui'
import { NaiveDarkMode, NaiveDarkModeType, globalcolor, naiveTheme, switchTheme } from './index'

const dm = ref((localStorage.getItem('dm') || 'system') as NaiveDarkModeType)

const fadeLayer = ref(Number(localStorage.getItem('fadeLayer')) || 25)

const light = ref((localStorage.getItem('light') || '#FFE0E0FC') as string)

const dark = ref((localStorage.getItem('dark') || '#243333FC') as string)

// Watch for changes in variable and update the localStorage
watch(dm, (value) => {
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
  dm.value = mode
  switchTheme(mode)
}
</script>

<template>
  <n-config-provider :theme="naiveTheme">
    <n-global-style />
    <NaiveDarkMode
      :key="fadeLayer.toString() + light.toString() + dark.toString()"
      :dark-mode="dm"
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
              {{ dm }}
            </n-gradient-text>
          </n-space>
          <n-space justify="center">
            <n-button round @click="handleDarkModeChange('system')"> System </n-button>
            <n-button round @click="handleDarkModeChange('light')"> Light </n-button>
            <n-button round @click="handleDarkModeChange('dark')"> Dark </n-button>
          </n-space>
          <n-space justify="center">
            <n-input-number
              v-model:value="fadeLayer"
              clearable
              min="0"
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
$global-color: v-bind(globalcolor);

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
