<template>
	<div class="Landing">

		<section class="Landing__half">
			<spotify-search/>
		</section>
		<section class="Landing__half Landing__half--grey">
			<youtube-search/>
		</section>


	</div>
</template>

<script>
import AppLoader from '../../components/AppLoader';
import SpotifySearch from '../../components/SpotifySearch';
import YoutubeSearch from '../../components/YoutubeSearch';

export default {
	components: {
		AppLoader,
		SpotifySearch,
		YoutubeSearch
	}

};
</script>

<style lang="scss">
@import '../../settings';

$youtubeRed: $Danger-Colour;

.Landing {
	position: relative;
	background-size: cover;
	background-position: center;
	min-height: calc(100vh);

	&__half {
		float: left;
		width: 48%;
		margin: 60px 1%;

		&--grey {
			background: $youtubeRed;
		}
	}

}

</style>

