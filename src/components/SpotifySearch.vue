<template>
	<section class="Spotify">

		<section class="App__inner">
			<search-input
				label="Spotify track search"
				@submit="onSearch"/>
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

				<iframe
					v-if="isAlbum(result)"
					:src="getAlbumPlayerSrc(result.album)"
					width="300"
					height="380"
					frameborder="0"
					allowtransparency="true"
					allow="encrypted-media"/>

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
		},
		isAlbum(result) {
			if (!result) return false;
			return !!result.album;
		},
		getAlbumPlayerSrc(album) {
			const id = album.id;
			return `https://open.spotify.com/embed/album/${id}`;
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
