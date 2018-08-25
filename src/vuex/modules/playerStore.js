/**
 * Player module
 *
 * Will store playlist queue and control the global play / pause functions
 */
import Spotify from '../../lib/Spotify';


export default {
	namespaced: true,
	state: {
		isPlaying: false
	},
	mutations: {
		SET_IS_PLAYING(state, isPlaying) {
			state.isPlaying = isPlaying;
		}
	},
	actions: {
		async play({ commit }) {
			await Spotify.play();
			commit('SET_IS_PLAYING', true);
		},
		async pause({ commit }) {
			await Spotify.pause();
			commit('SET_IS_PLAYING', false);
		}

	},
	getters: {
		results: state => state.results
	}
};
