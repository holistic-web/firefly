<template>
	<section class="Spotify">

		<search-input
			label="Spotify track search"
			@submit="onSearch"/>

		<b-card
			class="Spotify__resultCard"
			v-for="result in results"
			:key="result.id"
			:title="result.name"
			:img-src="result.album.images[0].url">

				<b-link
					:href="result.preview_url"
					target="_blank"
					v-text="'Preview'"/>

			</b-card>


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
		}
	}
};
</script>

<style lang="scss">

.Spotify {

	&__searchTerm {
		display: inline-block;
		width: 80%;
	}

	&__searchButton {
		float: right;
		margin-top: 2rem;
	}

	&__resultCard {
		width: 20%;
		margin: 30px 2.5%;
		float: left;
	}

	&__resultImage {
		width: 50%;
		float: left;
	}
}

</style>
