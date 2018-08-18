<template>
	<b-modal
		title="Create Account"
		:visible="visible"
		class="App">

		<b-form-group
			id="fieldsetHorizontal"
			horizontal
			label="Email"
			label-for="createAccountUsername">
			<b-form-input
				id="createAccountUsername"
				type="email"
				v-model="email"
				:state="isEmailValid"/>
		</b-form-group>
		<b-form-group
			id="fieldsetHorizontal"
			horizontal
			label="Password"
			label-for="createAccountPassword">
			<b-form-input
				id="createAccountPassword"
				v-model="password"
				type="password"
				:state="isPasswordValid"/>
		</b-form-group>
		<b-form-group
			id="fieldsetHorizontal"
			horizontal
			label="Confirm Password"
			label-for="createAccountConfirmPassword">
			<b-form-input
				id="createAccountConfirmPassword"
				v-model="passwordConfirm"
				type="password"
				:state="isPasswordConfirmValid"/>
		</b-form-group>

		<p
			class="App--invalid"
			v-text="invalidText"/>

		<template slot="modal-footer">
			<b-button
				v-text="'Cancel'"
				@click="onCancelButtonClick"/>
			<b-button
				variant="primary"
				v-text="'Create Account'"
				:disabled="!isFormValid"
				@click="onCreateAccountButtonClick"/>
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
			passwordConfirm: null,
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
		isPasswordConfirmValid() {
			if (!this.isPasswordValid) return false;
			return this.password === this.passwordConfirm;
		},
		isFormValid() {
			return this.isEmailValid && this.isPasswordValid && this.isPasswordConfirmValid;
		}
	},
	methods: {
		...mapActions({
			createAccount: 'auth/createUser',
			signIn: 'auth/signIn'
		}),
		async onCreateAccountButtonClick() {
			try {
				await this.createAccount({
					email: this.email,
					password: this.password
				});
				this.signIn({
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
