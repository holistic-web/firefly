<template>
	<section
		class="Player"
		v-if="track">

		<section class="App__inner Player__inner">
			<b-button
				class="Player__play"
				variant="outline-danger"
				v-text="'Play'"
				@click="play"/>

			<b-progress
				class="Player__progress"
				:value="80"/>

			<b-button
				class="Player__pause"
				variant="outline-danger"
				v-text="'Pause'"
				@click="pause"/>

			<!-- <b-button
				class="Player__createPlayer"
				variant="outline-success"
				v-text="'Create Player'"
				@click="create"/> -->
		</section>

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
import Spotify from '../../../lib/Spotify';

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
			if (this.isSpotify) Spotify.play();
		},
		pause() {
			if (this.isYoutube) this.$refs.youtubePlayer.player.pauseVideo();
			if (this.isSpotify) Spotify.pause();
		}
		// create() {
		// 	// attempt to create a spotify player stream, doesnt seem to work.
		// 	Spotify.createPlayer(this.spotifyToken);
		// }
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

	&__inner {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 2;
	}

	&__play {
		float: left;
		width: 10%;
	}

	&__pause {
		float: right;
		width: 10%;
	}

	&__progress {
		float: left;
		width: 80%;
	}

}

</style>
