import Vue from 'vue';
import Vuex from 'vuex';

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import storeConfig from './vuex/store';
import router from './router';
import App from './App';
import AppLoader from './components/AppLoader';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(BootstrapVue);

Vue.component('app-loader', AppLoader);

const store = new Vuex.Store(storeConfig);

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
});
