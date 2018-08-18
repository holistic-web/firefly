/**
 * Spotify module
 * 	- works with Spotfy npm package https://www.npmjs.com/package/spotify-web-api-js
 */

import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

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
		async init() {
			const code = 'TEST';
			const token = axios.post({
				url: 'https://accounts.spotify.com/api/token',
				data: {
					grant_type: 'authorization_code',
					code,
					client_secret: 'f0787962b898434eaafad7e60c297488',
					client_id: '10de6a8d8aec44aaa4d8c5a03c85be88'
				}
			});
			console.log(token);
			// #TODO: move this to a .env file and reset for security...
			spotifyApi.setAccessToken('f0787962b898434eaafad7e60c297488');
		},
		async fetchResults({ commit }, { queryTerm }) {
			const limit = 20;
			const results = await spotifyApi.searchTracks({ queryTerm, limit });
			commit('SET_RESULTS', results.data);
			return results;
		}
	},
	getters: {
		results: state => state.results
	}
};
