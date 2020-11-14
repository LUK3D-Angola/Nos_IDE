import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueZoomer from 'vue-zoomer'
import i18n from './i18n';
import globalAlerts from './globalAlerts';
import {Nos} from './noEngine';

import LoadScript from 'vue-plugin-load-script';
// import vue-panzoom
import panZoom from 'vue-panzoom'


Vue.config.productionTip = false;

window.eventBus = new Vue();
new Vue({
  router,
  store,
  i18n, 
  vuetify,
  globalAlerts,
  render: h => h(App)
}).$mount("#app");
 
// install plugin
Vue.use(panZoom).use(VueZoomer).use(Nos)

Vue.use(LoadScript)