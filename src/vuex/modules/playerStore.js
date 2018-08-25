/**
 * Player module
 *
 * Will store playlist queue and control the global play / pause functions
 */
import Spotify from '../../lib/Spotify';


export default {
	namespaced: true,
	state: {
		isPlaying: false,
		currentTrack: null
	},
	mutations: {
		SET_IS_PLAYING(state, isPlaying) {
			state.isPlaying = isPlaying;
		}
		// SET_CURRENT_TRACK(state, currentTrack) {
		// 	state.currentTrack = currentTrack;
		// }
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
		// setCurrentTrack({ commit }, track) {
		// 	commit('SET_CURRENT_TRACK', track);
		// }

	},
	getters: {
		isPlaying: state => state.isPlaying,
		currentTrack: state => state.currentTrack
	}
};
