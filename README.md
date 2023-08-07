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

| Property       | Type                  | Default        | Description                                                                                        |
| ------------ | ---------------------- | -------------- |----------------------------------------------------------------------------------------------------|
| dark-mode     | `NaiveDarkModeType`    | `'system'`     | The dark mode setting.                                                                             |
| design-dark   | `string`               | `'#000000'`    | The design color for dark mode.                                                                    |
| design-light  | `string`               | `'#ffffff'`    | The design color for light mode.                                                                   |
| fade-layer    | `number`               | `25`           | The number of steps or iterations for the smooth transition to dark mode. `< 1` for no transition. |


#### Exported Refs

| Ref           | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| naiveTheme    | Retrieves the current naive-ui theme.                        |
| DarkTheme     | Reactive variable for the dark mode state.                   |
| globalcolor   | Reactive variable for the global css color.                  |


#### Exported Methods

| Method           | Description                                                  |
| ---------------- | ------------------------------------------------------------ |
| switchCSSStyle   | Switches the CSS style sheet theme.                          |
| switchTheme      | Switches the application theme.                              |
| isCSSDark        | Checks if the current CSS style sheet is in dark mode.       |
| isCSSLight       | Checks if the current CSS style sheet is in light mode.      |


#### Example

```vue
<script lang="ts" setup>
import { NConfigProvider, NGlobalStyle } from 'naive-ui'
import { NaiveDarkMode, globalcolor, naiveTheme } from 'naive-dark-mode'
</script>

<template>
  <n-config-provider :theme="naiveTheme">
    <n-global-style />
    <naive-dark-mode
      :design-light="'#f1baba'"
      :design-dark="'#243333'"
      class="naive-dark-mode"
    />
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
</style>
```

## License
naive-dark-mode is licensed under the MIT License.
