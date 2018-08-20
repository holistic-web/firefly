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
			path += '&redirect_uri=http://localhost:3001';
			// path += '&redirect_uri=http://firefly-player.s3-website.eu-west-2.amazonaws.com';
			window.location.replace(path);
		},
		async fetchResults({ state, commit }, { queryTerm }) {
			try {
				await spotifyApi.setAccessToken(state.token);
				const results = await spotifyApi.searchTracks(queryTerm);
				const items = results.tracks.items.map(i => {
					i._id = i.id;
					return i;
				});
				commit('SET_RESULTS', items);
			} catch (err) {
				console.log(err);
			}
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
