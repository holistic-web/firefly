<template>
	<section class="Youtube">

		<section class="Youtube__search App__inner">
			<search-input
				label="Youtube track search"
				@submit="onSearch"/>
		</section>

		<section class="Youtube__results">
			<b-card
				class="Youtube__result"
				v-for="result in results"
				:key="result._id"
				:title="result.name">

				<!-- #Todo: replace below iframe with youtube preview iframe https://www.w3schools.com/html/html_youtube.asp -->
				<iframe width="220" height="80"
				src="https://www.youtube.com/embed/hIGq1A2yy3s">
				</iframe>


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
			// #Todo: update to use getter from youtube store
			results: 'youtube/results'
		})
	},
	methods: {
		...mapActions({
			// #Todo: update to use action from youtube store
			fetchResults: 'youtube/fetchResults'
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
			// #Todo: write out correct string to generate link for youtube iframe
			return `https://open.youtube.com/embed/track/${id}`;
		}
	}
};
</script>

<style lang="scss">
@import '../settings';

$frameWidth: $Frame-Width;

.Youtube {
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
