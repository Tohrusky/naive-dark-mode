# Naïve Dark Mode

Dark Mode for Vue3 and Naive UI.

[![npm version](https://badge.fury.io/js/naive-dark-mode.svg)](https://badge.fury.io/js/naive-dark-mode)
[![publish](https://github.com/Tohrusky/naive-dark-mode/actions/workflows/publish.yml/badge.svg)](https://github.com/Tohrusky/naive-dark-mode/actions/workflows/publish.yml)
![GitHub](https://img.shields.io/github/license/Tohrusky/naive-dark-mode)

## [Online Demo](https://naive-dark-mode.tohru.top/)

## Installation

Use your favorite package manager to install:

```shell
yarn add naive-dark-mode
```

## Usage

#### Type

```typescript
export type NaiveDarkModeType = undefined | 'light' | 'dark' | 'system'
```

#### Component API

| Property           | Type                | Default     | Description                                                                                         |
| ------------------ | ------------------- | ----------- | --------------------------------------------------------------------------------------------------- |
| dark-mode          | `NaiveDarkModeType` | `'system'`  | The dark mode setting.                                                                              |
| design-dark        | `string`            | `'#000000'` | The design color for dark mode.                                                                     |
| design-light       | `string`            | `'#ffffff'` | The design color for light mode.                                                                    |
| fade-layer         | `number`            | `25`        | The number of steps or iterations for the smooth transition to dark mode. `<= 0` for no transition. |
| v-model:color      | `string`            | `'#ffffff'` | The transition color value.                                                                         |
| v-model:naivetheme | `any`               | `undefined` | The Naive UI theme.                                                                                 |

#### Example

```vue
<script lang="ts" setup>
import { ref, Ref } from 'vue'
import { NConfigProvider, NGlobalStyle } from 'naive-ui'
import { NaiveDarkMode } from 'naive-dark-mode'
import type { NaiveDarkModeType } from 'naive-dark-mode'

const dmode = ref('system' as NaiveDarkModeType)
// v-model child component
const color = ref('')
const naiveTheme: Ref<any> = ref(undefined)

// // Change dark mode
// function handleDarkModeChange(mode: NaiveDarkModeType): void {
//   dmode.value = mode
// }
</script>

<template>
  <n-config-provider :theme="naiveTheme">
    <n-global-style />
    <naive-dark-mode
      v-model:color="color"
      v-model:naivetheme="naiveTheme"
      :dark-mode="dmode"
      :fade-layer="20"
      :design-light="'#fcf1f1'"
      :design-dark="'#051f1f'"
      class="naive-dark-mode"
    />
    <my-app />
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
</style>
```

## License

naive-dark-mode is licensed under the MIT License.
