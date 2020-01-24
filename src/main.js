import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import TreeView from 'vue-json-tree-view'
// import Vue2Filters from 'vue2-filters'
import './assets/tailwind.css'

Vue.use(TreeView)
Vue.use(require('vue-moment'))
// Vue.use(Vue2Filters)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
