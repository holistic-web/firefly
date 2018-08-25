<template>
	<section
		class="Player"
		v-if="track">

		<b-button
			class="Player_play"
			variant="outline-danger"
			@click="play"
			v-text="'Play'"/>

		<b-button
			class="Player_play"
			variant="outline-danger"
			@click="pause"
			v-text="'Pause'"/>

		<youtube-media
			ref="youtubePlayer"
			:video-id="src"/>

		<b-embed
			class="Player__frame"
			v-if="track.platform !== 'youtube'"
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
import VueYouTubeEmbed from 'vue-youtube-embed';

export default {
	components: {
		VueYouTubeEmbed
	},
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
