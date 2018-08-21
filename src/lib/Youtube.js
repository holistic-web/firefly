import youtubeSearch from 'youtube-api-v3-search';

// #Todo: disable this key and move to a secure location
const youtubeToken = 'AIzaSyCBSeq7wRNRQQYZnxZGYt35P-6-yHvwXIg';

export default {

	fetchResults: async query => {
		const results = await youtubeSearch(youtubeToken, {
			q: query,
			type: 'video',
			part: 'snippet'
		});
		const items = results.items;
		return items;
	}

};
