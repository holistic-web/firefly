<template>
	<b-modal
		title="Sign In"
		:visible="visible"
		class="App">

		<b-form-group
			id="fieldsetHorizontal"
			horizontal
			label="Email"
			label-for="signInEmail">
			<b-form-input
				id="signInEmail"
				v-model="email"
				:state="isEmailValid"/>
		</b-form-group>
		<b-form-group
			id="fieldsetHorizontal"
			horizontal
			label="Password"
			label-for="signInPassword">
			<b-form-input
				id="signInPassword"
				v-model="password"
				type="password"
				:state="isPasswordValid"/>
		</b-form-group>

		<!-- #Todo: add a checkbox with a remember me option here to toggle persisted sign in (default false) -->

		<p
			class="App--invalid"
			v-text="invalidText"/>

		<template slot="modal-footer">
			<b-button
				v-text="'Cancel'"
				@click="onCancelButtonClick"/>
			<b-button
				variant="primary"
				v-text="'Sign In'"
				:disabled="!isFormValid"
				@click="onSignInButtonClick"/>
		</template>
	</b-modal>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	props: {
		visible: {
			type: Boolean
		}
	},
	watch: {
		visible() {
			this.clearFields();
		},
		// #Todo: add methods here that watch the computed properties
		// and set invalid text appropriately. E.g:
		isEmailValid() {
			if (this.isEmailValid) {
				this.invalidText = null;
				return;
			}
			this.invalidText = 'Please enter a valid email address.';
		}
	},
	data() {
		return {
			email: null,
			password: null,
			invalidText: null,
			validEmailReg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/	// eslint-disable-line max-len
		};
	},
	computed: {
		isEmailValid() {
			return (this.email === '') ? '' : !!(this.validEmailReg.test(this.email));
		},
		isPasswordValid() {
			// #Todo: check password matches firebase minimum requirements
			return !!this.password;
		},
		isFormValid() {
			return this.isEmailValid && this.isPasswordValid;
		}
	},
	methods: {
		...mapActions({
			signIn: 'auth/signIn'
		}),
		async onSignInButtonClick() {
			try {
				await this.signIn({
					email: this.email,
					password: this.password
				});
				this.invalidText = null;
				this.$emit('hidden');
			} catch (err) {
				this.invalidText = err.message;
			}
		},
		onCancelButtonClick() {
			this.$emit('hidden');
		},
		clearFields() {
			this.email = null;
			this.password = null;
		}
	}
};
</script>
