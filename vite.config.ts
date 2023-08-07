import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

const libName = 'naive-dark-mode'

// 获取命令行参数
const args = process.argv.slice(2)
const modeIndex = args.findIndex((arg) => arg === '--mode')
const mode = args[modeIndex + 1]
console.log('mode: ', mode)
const isLib = mode === 'lib'

export default defineConfig(
  isLib
    ? {
        build: {
          lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: libName,
            formats: ['es'],
            fileName: libName
          },
          rollupOptions: {
            // Add _all_ external dependencies here
            external: ['vue', 'naive-ui'],
            output: {
              globals: {
                vue: 'Vue'
              }
            }
          }
        },
        plugins: [vue(), dts({ rollupTypes: true })]
      }
    : {
        plugins: [vue()]
      }
)
