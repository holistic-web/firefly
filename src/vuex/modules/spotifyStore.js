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
		async authorize() {
			const token = axios.get(
				'https://accounts.spotify.com/authorize',
				{
					params: {
						grant_type: 'authorization_code',
						response_type: 'token',
						// #Todo: change below line before deploying to a different endpoint
						redirect_uri: 'http://firefly-player.s3-website.eu-west-2.amazonaws.com/',
						client_secret: 'f0787962b898434eaafad7e60c297488',
						client_id: '10de6a8d8aec44aaa4d8c5a03c85be88'
					}
				});
			console.log(token);
			// #TODO: move this to a .env file and reset for security...
			// spotifyApi.setAccessToken('f0787962b898434eaafad7e60c297488');
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
