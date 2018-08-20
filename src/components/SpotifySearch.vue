<template>
	<section class="Spotify">

		<section class="Spotify__search App__inner">
			<search-input
				label="Spotify track search"
				@submit="onSearch"/>
		</section>

		<search-results :results="results"/>

	</section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';

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
			results: 'spotify/results'
		})
	},
	methods: {
		...mapActions({
			fetchResults: 'spotify/fetchResults'
		}),
		async fetch() {
			await this.fetchResults({
				queryTerm: this.searchTerm
			});
		},
		onSearch(searchTerm) {
			this.searchTerm = searchTerm;
			this.fetch();
		},
		getPlayerSrc(id) {
			return `https://open.spotify.com/embed/track/${id}`;
		}
	}
};
</script>

<style lang="scss">
@import '../settings';

$frameWidth: $Frame-Width;

.Spotify {
	float: left;
	width: 100%;

	&__search {
		display: block;
		width: auto;
	}

	&__results {
		display: block;
	}

	&__result {
		width: 23%;
		margin: 30px 1%;
		display: inline-block;

		@media all and (max-width: $frameWidth) {
			width: 48%;
			margin: 30px 1%;
		}
	}
}

</style>
