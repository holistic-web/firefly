/**
 * Authentication module
 * 	- works with Firebase to Provide the app with basic authentication
 *  - requires email and password accounts to be enabled in the firebase console
 */

import Spotify from '../../lib/Spotify';

export default {
	namespaced: true,
	state: {
		user: null,
		spotifyToken: null
	},
	mutations: {
		SET_USER(state, user) {
			state.user = user;
		},
		SET_SPOTIFY_TOKEN(state, spotifyToken) {
			state.spotifyToken = spotifyToken;
		}
	},
	actions: {
		async signIn({ state, commit, rootState }) {
			const result = await rootState.firebase.auth().signInWithPopup(rootState.provider);
			const user = result.user;
			commit('SET_USER', user);
			if (!state.spotifyToken) Spotify.initTokenRedirect();
			return result;
		},
		async signOut({ commit, rootState }) {
			const result = await rootState.firebase.auth().signOut();
			commit('SET_USER', null);
			return result;
		},
		setSpotifyToken({ commit }, token) {
			commit('SET_SPOTIFY_TOKEN', token);
		}
	},
	getters: {
		user: state => state.user,
		spotifyToken: state => state.spotifyToken
	}
};
