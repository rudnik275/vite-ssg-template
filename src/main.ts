import './style/index.css'
import {ViteSSG} from 'vite-ssg'
import App from './App.vue'
import UiKit from './ui-kit'
import {routes} from 'vue-router/auto/routes'

export const createApp = ViteSSG(
  App,
  {
    routes,
  },
  ({app, router}) => {
    router.options.scrollBehavior = (to) => {
      if (to.hash) {
        return {
          top: 100,
          behavior: 'smooth',
          el: to.hash
        }
      }
      return {
        behavior: 'smooth',
        top: 0
      }
    }
    app.use(UiKit)
  }
)
