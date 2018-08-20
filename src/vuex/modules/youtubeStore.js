/**
 * Youtube module
 * 	- works with Youtube npm package https://www.npmjs.com/package/youtube-api-v3-search
 */
import youtubeSearch from 'youtube-api-v3-search';

export default {
	namespaced: true,
	state: {
		results: [],
		// #Todo: disable this key and move to a secure location
		token: 'AIzaSyCBSeq7wRNRQQYZnxZGYt35P-6-yHvwXIg'
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
			const results = await youtubeSearch(state.token, {
				q: queryTerm,
				type: 'video',
				part: 'snippet'
			});
			const items = results.items.map(i => {
				i._id = i.etag;
				i.youtubeItem = true;
				return i;
			});
			console.log(items);
			commit('SET_RESULTS', items);
			return results;
		},
		async setToken({ commit }, token) {
			commit('SET_TOKEN', token);
		}
	},
	getters: {
		results: state => state.results,
		token: state => state.token
	}
};
