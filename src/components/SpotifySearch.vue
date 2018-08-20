<template>
	<section class="Spotify">

		<section class="Spotify__search App__inner">
			<search-input
				label="Spotify track search"
				@submit="onSearch"/>
		</section>

		<section class="Spotify__results">
			<b-card
				class="Spotify__result"
				v-for="result in results"
				:key="result.id"
				:title="result.name">
				<iframe
					v-if="isAlbum(result)"
					:src="getPlayerSrc(result.id)"
					width="220"
					height="80"
					frameborder="0"
					allowtransparency="true"
					allow="encrypted-media"/>
			</b-card>
		</section>


	</section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SearchInput from './SearchInput';

export default {
	components: {
		SearchInput
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
			console.log(this.results);
		},
		onSearch(searchTerm) {
			this.searchTerm = searchTerm;
			this.fetch();
		},
		isAlbum(result) {
			if (!result) return false;
			return !!result.album;
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

	&__search {
		display: block;
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
