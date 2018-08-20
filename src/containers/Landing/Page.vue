<template>
	<div class="Landing">

		<spotify-search class="mt-3"/>


	</div>
</template>

<script>
import AppLoader from '../../components/AppLoader';
import SpotifySearch from '../../components/SpotifySearch';

export default {
	components: {
		AppLoader,
		SpotifySearch
	}

};
</script>

<style lang="scss">
@import '../../settings';

.Landing {
	position: relative;
	background-size: cover;
	background-position: center;
	min-height: calc(100vh);

	&__loader {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

}

</style>

