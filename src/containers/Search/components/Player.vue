<template>
	<section
		class="Player"
		v-if="track">

		<b-button
			class="Player__play"
			variant="outline-danger"
			v-text="'Play'"
			@click="play"/>

		<b-button
			class="Player__play"
			variant="outline-danger"
			v-text="'Pause'"
			@click="pause"/>

		<youtube-media
			v-if="isYoutube"
			ref="youtubePlayer"
			:video-id="src"/>

		<b-embed
			class="Player__frame"
			v-if="isSpotify"
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
 *
 * Uses:
 * 	-https://github.com/kaorun343/vue-youtube-embed to control youtube videos
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
		isYoutube() {
			return this.track.platform === 'youtube';
		},
		isSpotify() {
			return this.track.platform === 'spotify';
		},
		src() {
			if (!this.track) return false;
			if (this.isSpotify) return `https://open.spotify.com/embed/track/${this.track.id}`;
			if (this.isYoutube) return this.track.id.videoId;
			return false;
		}
	},
	methods: {
		play() {
			if (this.isYoutube) this.$refs.youtubePlayer.player.playVideo();
		},
		pause() {
			if (this.isYoutube) this.$refs.youtubePlayer.player.pauseVideo();
		}
	}
};
</script>

<style lang="scss">

.Player {
	width: 100%;
	height: 250px;
	position: fixed;
	background: #fff;
	bottom: 0;

	&__frame {
		position: absolute !important;
		top: 250px !important;
	}
}

</style>
