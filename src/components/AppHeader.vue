<template>
<div class="Header">
	<div class="App__inner App__inner--fullHeight">

		<b-link to="/">
			<h1 class="Header__title App--center">Firefly Music Player</h1>
		</b-link>

		<section class="Header__auth App--center">
			<b-link
				to="account"
				class="Header__link"
				v-if="user"
				v-text="user.email"/>

			<b-button
				v-text="authButtonText"
				@click="onAuthButtonClick"
				variant="primary--outline"/>
		</section>

	</div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	computed: {
		...mapGetters({
			user: 'auth/user'
		}),
		authButtonText() {
			if (!this.user) return 'Sign In';
			return 'Sign Out';
		}
	},
	methods: {
		...mapActions({
			signIn: 'auth/signIn',
			signOut: 'auth/signOut'
		}),

		onAuthButtonClick() {
			if (this.user) {
				this.signOut();
			} else {
				this.signIn();
			}
		}
	}

};
</script>


<style lang="scss">
@import '../settings';

$headerHeight: $Header-Height;
$backgroundColour: $Theme-Colour;
$textColour: $White;

.Header{
	background: $backgroundColour;
	height: $headerHeight;
	position: fixed;
	color: $textColour !important;
	width: 100%;
	z-index: 10;

	&__title{
		height: $headerHeight / 2;
		color: $textColour;
		margin: auto;
		display: inline-block;
		left: 0;
	}

	&__auth {
		right: 0;
	}

	&__link {
		color: $textColour !important;
	}

}

</style>
