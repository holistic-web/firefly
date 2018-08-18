/**
 * Authentication module
 * 	- works with Firebase to Provide the app with basic authentication
 *  - requires email and password accounts to be enabled in the firebase console
 */

export default {
	namespaced: true,
	state: {
		user: null
	},
	mutations: {
		SET_USER(state, user) {
			state.user = user;
		}
	},
	actions: {
		async createUser({ rootState }, { email, password }) {
			const result = await rootState.firebase.auth().createUserWithEmailAndPassword(email, password);
			return result;
		},
		async signIn({ commit, rootState }, { email, password }) {
			const result = await rootState.firebase.auth().signInWithEmailAndPassword(email, password);
			const user = result.user;
			commit('SET_USER', user);
			return result;
		},
		async signOut({ commit, rootState }) {
			const result = await rootState.firebase.auth().signOut();
			commit('SET_USER', null);
			return result;
		}
	},
	getters: {
		user: state => state.user
	}
};
