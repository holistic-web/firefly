<template>
	<app-loader/>
</template>


<script>
import { mapActions } from 'vuex';

export default {
	methods: {
		...mapActions({
			setSpotifyToken: 'auth/setSpotifyToken'
		})
	},
	mounted() {
		// remove query string
		let index = this.$route.hash.indexOf('#access_token');
		let token = this.$route.hash.substring(index + 14);
		// remove extra params
		index = token.indexOf('&token');
		token = token.substring(0, index);
		this.setSpotifyToken(token);
		this.$router.push({ path: '/' });
	}
};
</script>

<style lang="scss">
@import '../../settings';


</style>

