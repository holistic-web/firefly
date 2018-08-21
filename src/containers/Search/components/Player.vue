<template>
	<section class="Player">

		<b-embed
			class="Player__frame"
			v-if="track"
			type="iframe"
			:src="src"
			frameborder="0"
			allow="encrypted-media"
			allowtransparency
			allowfullscreen/>

	</section>
</template>

<script>
/**
 * Vue component to play songs within an Iframe. This can probably be drastically improved with a little research.

 */
import { mapGetters } from 'vuex';

export default {
	props: {
		track: {
			type: Object
		}
	},
	computed: {
		...mapGetters({
			spotifyToken: 'auth/spotifyToken'
		}),
		src() {
			if (!this.track) return false;
			if (this.track.platform === 'spotify') return `https://open.spotify.com/embed/track/${this.track.id}`;
			if (this.track.platform === 'youtube') return `https://www.youtube.com/embed/${this.track.id.videoId}`;
			return false;
		}
	}
};
</script>

<style lang="scss">

.Player {
	width: 100%;
	max-height: 250px;
	position: fixed;
	bottom: 0;
}

</style>