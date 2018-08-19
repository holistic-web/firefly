<template>
	<section class="Spotify">

		<section class="Spotify__search">
			<b-form-group
				class="Spotify__searchTerm"
				description="Spotify track search"
				label="Enter a searchphrase"
				label-for="spotifySearchTerm">
				<b-form-input
					id="spotifySearchTerm"
					v-model.trim="searchTerm"/>
			</b-form-group>
			<b-button
				class="Spotify__searchButton"
				variant="outline-primary"
				@click="fetch"
				v-text="'Search'"/>
		</section>

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

export default {
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
