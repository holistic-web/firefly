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

		{{results}}

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
			this.fetchResults({
				type: 'track',
				query: this.searchTerm
			});
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
}

</style>
