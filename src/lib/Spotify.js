import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();


export default {

	initTokenRedirect: () => {
		let path = 'https://accounts.spotify.com/authorize';
		path += '?response_type=token';
		path += '&client_id=10de6a8d8aec44aaa4d8c5a03c85be88';
		path += '&redirect_uri=http://localhost:3001/token';
		// path += '&redirect_uri=http://firefly-player.s3-website.eu-west-2.amazonaws.com';
		window.location.replace(path);
	},

	setToken: token => {
		spotifyApi.setAccessToken(token);
	},

	fetchResults: async query => {
		const results = await spotifyApi.searchTracks(query);
		const items = results.tracks.items;
		return items;
	}
};
