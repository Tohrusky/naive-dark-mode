<script lang="ts" setup>
import { ref, watch, Ref } from 'vue'
import {
  NConfigProvider,
  NGlobalStyle,
  NCard,
  NSpace,
  NInputNumber,
  NColorPicker,
  NRadioGroup,
  NRadioButton
} from 'naive-ui'
import { NaiveDarkMode } from './index'
import type { NaiveDarkModeType } from './index'

const dmode = ref((localStorage.getItem('dm') || 'system') as NaiveDarkModeType)

const modes: { value: NaiveDarkModeType; label: string }[] = [
  {
    value: 'system',
    label: 'System'
  },
  {
    value: 'light',
    label: 'Light'
  },
  {
    value: 'dark',
    label: 'Dark'
  }
]

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
      <n-card hoverable style="width: fit-content">
        <n-space vertical>
          <n-space justify="center">
            <n-radio-group v-model:value="dmode">
              <n-radio-button
                v-for="m in modes"
                :key="m.value"
                :value="m.value"
                :label="m.label"
                style="width: 80px"
              />
            </n-radio-group>
          </n-space>
          <div />
          <n-space justify="center">
            <n-input-number
              v-model:value="fadeLayer"
              clearable
              step="1"
              style="width: 240px"
              placeholder="FadeLayer"
            />
          </n-space>
          <div />
          <n-space vertical>
            <n-color-picker v-model:value="light" :modes="['hex']" />
            <n-color-picker v-model:value="dark" :modes="['hex']" />
          </n-space>
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
