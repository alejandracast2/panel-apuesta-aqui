/* eslint-disable*/
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import store from './store'

Vue.prototype.$http = axios;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

window.jivo_onLoadCallback = () => {

  console.log('Widget fully loaded');
  const jdivElements = document.getElementsByTagName('jdiv');
  const jivoTarget = jdivElements[1];
  if(jivoTarget){
    store.dispatch('updateJivoElements',jivoTarget)
    jivoTarget.style.display = 'none'
  }
  store.commit('setWidget', true);
};

window.jivo_onClose = () => {
  jivo_api.open()
  const jivoElement1 = store.getters['jivoElement1'];
  if (jivoElement1 ) {
    jivoElement1.style.display = 'none';
  }
  store.state.jivo_modal_flag = false;
}
window.jivo_onOpen = () => {
  const jivoElement1 = store.getters['jivoElement1'];
  if (jivoElement1 ) {
    jivoElement1.style.display = 'block';
  }

}
window.jivo_onMessageReceived = () => {
	console.log(`Check agents messages`);
  store.state.message_recived = true;
}