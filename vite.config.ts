import {defineConfig} from 'vite'
import Vue from '@vitejs/plugin-vue'
import PostCssNesting from 'postcss-nesting'
import svgIcon from './vite-plugins/svg-icon-vite-plugin'
import {ViteImageOptimizer} from 'vite-plugin-image-optimizer'
import VueRouter from 'unplugin-vue-router/vite'

export default defineConfig({
  css: {
    postcss: {
      plugins: [PostCssNesting],
    },
  },
  plugins: [
    svgIcon,
    ViteImageOptimizer(),
    VueRouter({
      /* options */
    }),
    Vue({
      script: {
        defineModel: true,
        propsDestructure: true,
      },
      include: [/\.vue$/, /\.md$/],
    }),
  ],
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },
})
