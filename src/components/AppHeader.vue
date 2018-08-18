<template>
<div class="Header">
	<div class="App__inner App__inner--fullHeight">

		<b-link to="/">
			<h1 class="Header__title App--center">test</h1>
		</b-link>

		<section class="Header__auth App--center">
			<b-button
				v-if="!user"
				v-text="'Create Account'"
				@click="onCreateAccountButtonClick"
				variant="primary--outline"/>

			<span
				v-if="user"
				v-text="user.email"/>

			<b-button
				v-text="authButtonText"
				@click="onAuthButtonClick"
				variant="primary--outline"/>
		</section>

		<sign-in-modal
			:visible="isSignInModalVisible"
			@hidden="onSignUpModalClose"/>

		<create-account-modal
			:visible="isCreateAccountModalVisible"
			@hidden="onCreateAccountModalClose"/>

	</div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SignInModal from './SignIn.modal';
import CreateAccountModal from './CreateAccount.modal';

export default {
	components: {
		SignInModal,
		CreateAccountModal
	},
	data() {
		return {
			isSignInModalVisible: false,
			isCreateAccountModalVisible: false
		};
	},
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
			signOut: 'auth/signOut'
		}),
		onSignUpModalClose() {
			this.isSignInModalVisible = false;
		},
		onCreateAccountModalClose() {
			this.isCreateAccountModalVisible = false;
		},
		onAuthButtonClick() {
			if (this.user) {
				this.signOut();
			} else {
				this.isSignInModalVisible = true;
			}
		},
		onCreateAccountButtonClick() {
			this.isCreateAccountModalVisible = true;
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
	color: $textColour;
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

}

</style>
