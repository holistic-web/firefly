/**
 * Spotify module
 * 	- works with Spotfy npm package https://www.npmjs.com/package/spotify
 */

import spotify from 'spotify';

export default {
	namespaced: true,
	state: {
		results: []
	},
	mutations: {
		SET_RESULTS(state, results) {
			state.results = results;
		}
	},
	actions: {
		async fetchResults({ commit }, { type, query }) {
			const results = await spotify.search({ type, query });
			commit('SET_RESULTS', results.data);
			return results;
		}
	},
	getters: {
		results: state => state.results
	}
};
