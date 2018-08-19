<template>
	<div class="App">

		<app-header/>

		<router-view class="App__wrapper"/>

		<app-footer/>

	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';

export default {
	name: 'App',
	components: {
		AppHeader,
		AppFooter
	},
	computed: {
		...mapGetters({
			token: 'spotify/token'
		})
	},
	methods: {
		...mapActions({
			initSpotifyApi: 'spotify/authorize',
			setSpotifyToken: 'spotify/setToken'
		})
	},
	created() {
		if (this.$route.path.includes('access_token')) {
			// remove query string
			let index = this.$route.path.indexOf('access_token');
			let token = this.$route.path.substring(index + 13);
			// remove extra params
			index = token.indexOf('&token');
			token = token.substring(0, index);
			this.setSpotifyToken(token);
			this.$router.push({ path: '/' });
		} else if (!this.token) {
			this.initSpotifyApi();
		}
	}
};
</script>

<style lang="scss">
@import './settings';

$textColour: $Text-Colour;
$backgroundColour: $Background-Colour;
$dangerColour: $Danger-Colour;
$fontFamily: $Font-Family;
$frameWidth: $Frame-Width;
$headerHeight: $Header-Height;
$footerHeight: $Footer-Height;


.App {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	background: $backgroundColour;
	font-family: $fontFamily;
	color: $textColour;

	&__inner {
		width: $frameWidth;
		margin: auto;
		position: relative;

		&--fullHeight {
			height: 100%;
		}

		@media all and (max-width: $frameWidth) {
			width: 90%;
			margin-left: 5%;
			margin-right: 5%;
		}

	}

	&__wrapper {
		padding-top: $headerHeight;
		min-height: calc(100vh - #{$footerHeight});
		background: $backgroundColour;
	}

	&--center {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}

	&--invalid {
		color: $dangerColour;
	}

}

</style>
