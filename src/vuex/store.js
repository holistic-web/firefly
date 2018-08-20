import firebase from 'firebase';
import Cookies from 'js-cookie';
import VuexPersistence from 'vuex-persist';
import authStore from './modules/authStore';
import spotifyStore from './modules/spotifyStore';

// Firebase connection. Since this info is public it's important to have security rules set.
const firebaseConfig = {
	apiKey: 'AIzaSyAPBoH31ojiPCc8BrgbSKTKN5Deg354KD8',
	authDomain: 'firefly-5d179.firebaseapp.com',
	databaseURL: 'https://firefly-5d179.firebaseio.com',
	projectId: 'firefly-5d179',
	storageBucket: 'firefly-5d179.appspot.com',
	messagingSenderId: '820401474248'
};

// Set Facebook as our authentication provider
const provider = new firebase.auth.GoogleAuthProvider();

// Create a persisted state cookie
const vuexCookie = new VuexPersistence({
	restoreState: key => Cookies.getJSON(key),
	saveState: (key, state) => Cookies.set(key, state, {
		expires: 3
	}),
	modules: [
		'auth',
		'spotify'
	]
});

const app = firebase.initializeApp(firebaseConfig);
const db = app.database();

const store = {
	state: {
		firebase,
		db,
		provider
	},
	modules: {
		auth: authStore,
		spotify: spotifyStore
	},
	plugins: [
		vuexCookie.plugin
	]
};

export default store;

