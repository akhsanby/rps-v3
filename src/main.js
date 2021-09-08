import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import VuePageTransition from 'vue-page-transition'
import "./assets/brainjs/brain-browser.min.js"
 
Vue.use(VuePageTransition)
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
