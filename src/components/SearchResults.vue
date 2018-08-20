<template>
	<section class="Results">

		<b-card
			class="Result__result"
			v-for="result in results"
			:key="result._id"
			:title="result.name">

			<iframe
				:src="getSpotifyPlayerSrc(result.id)"
				width="220"
				height="80"
				frameborder="0"
				allowtransparency="true"
				allow="encrypted-media"/>

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
		}
	}
};
</script>

<style lang="scss">
@import '../settings';

$frameWidth: $Frame-Width;

.Results {
	display: block;

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
