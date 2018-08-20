<template>
	<section class="Results">

		<b-card
			class="Result__result"
			v-for="result in results"
			:key="result._id"
			:title="result.name">

			<iframe
				v-if="result.spotifyItem"
				:src="getSpotifyPlayerSrc(result.id)"
				width="220"
				height="80"
				frameborder="0"
				allowtransparency="true"
				allow="encrypted-media"/>

			<iframe
				v-if="result.youtubeItem"
				:src="getYoutubePlayerSrc(result)"
				width="220"
				height="80"/>

		</b-card>

	</section>
</template>

<script>
export default {
	props: {
		results: {
			type: Array,
			required: true
		}
	},
	methods: {
		getSpotifyPlayerSrc(id) {
			// #Todo: write out correct string to generate link for youtube iframe
			return `https://open.spotify.com/embed/track/${id}`;
		},
		getYoutubePlayerSrc(result) {
			const id = result.id.videoId;
			return `https://www.youtube.com/embed/${id}`;
		}
	}
};
</script>

<style lang="scss">
@import '../../../settings';

$frameWidth: $Frame-Width;

.Results {
	width: 100%;
	display: block;
	float: left;

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
