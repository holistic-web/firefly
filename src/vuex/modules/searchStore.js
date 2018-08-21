/**
 * Search module
 *
 * Combines results from multiple music apis into a single search result
 */
import common from '../../lib/common';
import Spotify from '../../lib/Spotify';
import Youtube from '../../lib/Youtube';

async function fetchYoutubeResults(queryTerm) {
	const results = await Youtube.fetchResults(queryTerm);
	return results.map(r => {
		r._id = r.id.videoId;
		r.title = r.snippet.title;
		r.album = '-';
		r.artist = '-';
		r.platform = 'youtube';
		return r;
	});
}

async function fetchSpotifyResults(queryTerm) {
	const results = await Spotify.fetchResults(queryTerm);
	return results.map(r => {
		r._id = r.id;
		r.title = r.name;
		r.album = r.album.name;
		r.artist = r.artists[0].name;
		r.platform = 'spotify';
		return r;
	});
}

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
		async fetchResults({ commit, rootGetters }, { queryTerm }) {
			try {
				const token = rootGetters['auth/spotifyToken'];
				await Spotify.setToken(token);
				const data = await Promise.all([
					fetchSpotifyResults(queryTerm),
					fetchYoutubeResults(queryTerm)
				]);
				const spotifyResults = data[0].splice(0, 5);
				const youtubeResults = data[1].splice(0, 5);
				const results = common.shuffle([
					...spotifyResults,
					...youtubeResults]
				);
				commit('SET_RESULTS', results);
			} catch (err) {
				// eslint-disable-next-line no-console
				console.error(err);
				Spotify.initTokenRedirect();
			}
		}

	},
	getters: {
		results: state => state.results
	}
};
