/**
 * Spotify module
 * 	- works with Spotfy npm package https://www.npmjs.com/package/spotify
 */

import Spotify from 'node-spotify-api';

// #TODO: move this to a .env file and reset for security...
const spotify = new Spotify({
	id: '10de6a8d8aec44aaa4d8c5a03c85be88',
	secret: 'f0787962b898434eaafad7e60c297488'
});

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
