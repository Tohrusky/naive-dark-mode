<script lang="ts" setup>
import { ref } from 'vue'
import { NConfigProvider, NGlobalStyle, NCard, NSpace, NButton, NInputNumber } from 'naive-ui'
import { NaiveDarkMode, NaiveDarkModeType, globalcolor, naiveTheme, switchTheme } from './index'

const fadeLayer = ref(25)

function handleDarkModeChange(mode: NaiveDarkModeType): void {
  switchTheme(mode)
}
</script>

<template>
  <n-config-provider :theme="naiveTheme">
    <n-global-style />
    <NaiveDarkMode
      :key="fadeLayer"
      :fade-layer="fadeLayer"
      :design-light="'#f1baba'"
      :design-dark="'#243333'"
      class="naive-dark-mode"
    />
    <div class="main-space">
      <n-card style="width: fit-content">
        <n-space justify="center">
          <n-button round @click="handleDarkModeChange('system')"> System </n-button>
          <n-button round @click="handleDarkModeChange('light')"> Light </n-button>
          <n-button round @click="handleDarkModeChange('dark')"> Dark </n-button>
        </n-space>
        <br />
        <n-space justify="center">
          <n-input-number
            v-model:value="fadeLayer"
            clearable
            :precision="0"
            min="1"
            style="width: 240px"
            placeholder="FadeLayer"
          />
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
