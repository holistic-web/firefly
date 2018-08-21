<template>
	<div class="Search">

		<section class="Search__input">

			<b-link
				class="Search__title"
				href="https://github.com/holistic-web"
				target="_blank">
				<p>A <code>Holistics</code> project</p>
			</b-link>

			<search-input
				class="Search__textBox"
				label="Search for a song"
				@submit="onSearch"/>

		</section>

		<section class="Search__results">

			<search-results :results="results"/>

		</section>

	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import common from '../../lib/common';
import SearchInput from './components/SearchInput';
import SearchResults from './components/SearchResults';

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
			return common.shuffle(results);
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

$textColour: $Text-Colour;

.Search {
	height: 100vh;
	width: 100vw;
	overflow: hidden;

	&__title {
		margin: 2rem;
		color: $textColour !important;
		float: left;

		&:hover {
			text-decoration: none !important;
		}
	}

	&__input {
		width: 35%;
		height: 100%;
		border-right: 1px dashed $textColour;
		position: relative;
		display: inline-block;
	}

	&__textBox {
		width: 80%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	&__results {
		width: 64%;
		height: 100%;
		display: inline-block;
		overflow: scroll;
	}

}

</style>

