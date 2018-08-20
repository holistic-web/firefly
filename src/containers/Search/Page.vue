<template>
	<div class="Search">

		<section class="Search__content App__inner">
			<search-input
				label="Search for a song!"
				@submit="onSearch"/>
		</section>

		<search-results :results="results"/>

	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SearchInput from './components/SearchInput';
import SearchResults from './components/SearchResults';

/**
 * Shuffles array in place. -- https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
	let j;
	let	x;
	let i;
	for (i = a.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
	return a;
}

export default {
	components: {
		SearchInput,
		SearchResults
	},
	data() {
		return {
			searchTerm: null
		};
	},
	computed: {
		...mapGetters({
			spotifyResults: 'spotify/results',
			youtubeResults: 'youtube/results'
		}),
		results() {
			const results = [
				...this.youtubeResults,
				...this.spotifyResults
			];
			return shuffle(results);
		}
	},
	methods: {
		...mapActions({
			fetchSpotifyResults: 'spotify/fetchResults',
			fetchYoutubeResults: 'youtube/fetchResults'
		}),
		async fetch() {
			await Promise.all([
				this.fetchSpotifyResults({
					queryTerm: this.searchTerm
				}),
				this.fetchYoutubeResults({
					queryTerm: this.searchTerm
				})
			]);
		},
		onSearch(searchTerm) {
			this.searchTerm = searchTerm;
			this.fetch();
		}
	}
};
</script>

<style lang="scss">
@import '../../settings';

$youtubeRed: $Danger-Colour;

.Search {
	position: relative;

	&__content {
		margin-top: 3rem;
	}

}

</style>

