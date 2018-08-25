import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();


export default {

	initTokenRedirect: () => {
		let path = 'https://accounts.spotify.com/authorize';
		path += '?response_type=token';
		path += '&client_id=10de6a8d8aec44aaa4d8c5a03c85be88';
		path += '&scope=user-modify-playback-state';
		if (window.location.hostname.includes('localhost')) {
			path += '&redirect_uri=http://localhost:3001/token';
		} else {
			path += '&redirect_uri=https://firefly-5d179.firebaseapp.com/token';
		}
		window.location.replace(path);
	},

	setToken: token => {
		spotifyApi.setAccessToken(token);
	},

	fetchResults: async query => {
		const results = await spotifyApi.searchTracks(query);
		const items = results.tracks.items;
		return items;
	},

	play: async () => {
		// #Todo: implement spotify play pause
		// Make a global store to manage player state (playing, play/pause methods, including queues)
		console.log(spotifyApi);
	},

	pause: async () => {
		// #Todo: implement spotify play pause
		// Make a global store to manage player state (playing, play/pause methods, including queues)
		console.log(spotifyApi);
	}
};

// This is vuex, it's not usual vue
