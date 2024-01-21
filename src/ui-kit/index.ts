import {Plugin} from 'vue'
import EButton from './EButton.vue'
import EIcon from './EIcon.vue'
import ETransitionCollapse from './ETransitionCollapse.vue'
import ESlider from './ESlider.vue'

export default {
  install: app => {
    app.component('EButton', EButton)
    app.component('EIcon', EIcon)
    app.component('ETransitionCollapse', ETransitionCollapse)
    app.component('ESlider', ESlider)
  }
} as Plugin
