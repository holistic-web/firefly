import firebase from 'firebase';
import Cookies from 'js-cookie';
import VuexPersistence from 'vuex-persist';
import authStore from './modules/authStore';

// Firebase connection. Since this info is public it's important to have security rules set.
const firebaseConfig = {
    apiKey: "AIzaSyAPBoH31ojiPCc8BrgbSKTKN5Deg354KD8",
    authDomain: "firefly-5d179.firebaseapp.com",
    databaseURL: "https://firefly-5d179.firebaseio.com",
    projectId: "firefly-5d179",
    storageBucket: "firefly-5d179.appspot.com",
    messagingSenderId: "820401474248"
  };;

// Create a persisted state cookie
const vuexCookie = new VuexPersistence({
	restoreState: key => Cookies.getJSON(key),
	saveState: (key, state) => Cookies.set(key, state, {
		expires: 3
	}),
	modules: ['auth'] // only save user module
});

const app = firebase.initializeApp(firebaseConfig);
const db = app.database();

const store = {
	state: {
		firebase,
		db
	},
	modules: {
		auth: authStore
	},
	plugins: [
		vuexCookie.plugin
	]
};

export default store;

