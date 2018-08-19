/**
 * Spotify module
 * 	- works with Spotfy npm package https://www.npmjs.com/package/spotify-web-api-js
 */
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

export default {
	namespaced: true,
	state: {
		results: [],
		token: null
	},
	mutations: {
		SET_RESULTS(state, results) {
			state.results = results;
		},
		SET_TOKEN(state, token) {
			state.token = token;
		}
	},
	actions: {
		async authorize() {
			let path = 'https://accounts.spotify.com/authorize';
			path += '?response_type=token';
			path += '&client_id=10de6a8d8aec44aaa4d8c5a03c85be88';
			path += '&redirect_uri=http://localhost:3000';
			window.location.replace(path);
			// #TODO: move this to a .env file and reset for security...
			// spotifyApi.setAccessToken('f0787962b898434eaafad7e60c297488');
		},
		async fetchResults({ commit }, { queryTerm }) {
			const limit = 20;
			const results = await spotifyApi.searchTracks({ queryTerm, limit });
			commit('SET_RESULTS', results.tracks.items);
			return results;
		},
		async setToken({ commit }, token) {
			await spotifyApi.setAccessToken(token);
			commit('SET_TOKEN', token);
		}
	},
	getters: {
		results: state => state.results,
		token: state => state.token
	}
};
