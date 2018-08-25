<template>
	<div class="Search">

		<section class="Search__input">

			<b-link
				class="Search__title"
				href="https://github.com/holistic-web/firefly"
				target="_blank">
				<p>A <code>Holistics</code> project</p>
			</b-link>

			<b-dropdown
				class="Search__user"
				:text="user.displayName"
				href="/#/account"
				split>
				<b-dropdown-item @click="signOut">Log out</b-dropdown-item>
			</b-dropdown>

			<search-input
				class="Search__textBox"
				label="Search for a song"
				@submit="onSearch"/>

		</section>

		<section class="Search__results">

			<search-results
				v-if="user"
				:class="{ 'Search--withPlayer': playing }"
				:results="results"
				@play="onPlay"/>

			<b-button
				v-else
				class="Search__login"
				variant="primary"
				v-text="'Sign In'"
				size="lg"
				@click="signIn"/>

		</section>

		<player :track="playing"/>

	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SearchInput from './components/SearchInput';
import SearchResults from './components/SearchResults';
import Player from './components/Player';

export default {
	components: {
		SearchInput,
		SearchResults,
		Player
	},
	data() {
		return {
			searchTerm: null,
			playing: null
		};
	},
	computed: {
		...mapGetters({
			user: 'auth/user',
			results: 'search/results'
		})
	},
	methods: {
		...mapActions({
			fetchSearchResults: 'search/fetchResults',
			signIn: 'auth/signIn',
			signOut: 'auth/signOut'
		}),
		async fetch() {
			await this.fetchSearchResults({
				queryTerm: this.searchTerm
			});

		},
		onSearch(searchTerm) {
			this.searchTerm = searchTerm;
			this.fetch();
		},
		onPlay(track) {
			this.playing = track;
		}
	}
};
</script>

<style lang="scss">
@import '../../settings';

$textColour: $Text-Colour;

.Search {
	height: 100vh;
	width: 100vw;
	overflow: hidden;

	&__title {
		margin: 2rem;
		color: $textColour !important;
		float: left;

		&:hover {
			text-decoration: none !important;
		}
	}

	&__input {
		width: 35%;
		height: 100%;
		border-right: 1px dashed $textColour;
		position: relative;
		display: inline-block;
	}

	&__textBox {
		width: 80%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	&__results {
		width: 64%;
		height: 100%;
		overflow: scroll;
		position: relative;
		float: right;
	}

	&__login {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	&__user {
		float: right;
		margin: 1.5rem;
	}

	&--withPlayer {
		padding-bottom: 250px;
	}

}

</style>

