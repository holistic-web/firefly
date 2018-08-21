<template>
	<section class="SearchInput">

		<div class="SearchInput__inputs">
			<b-form-group
				class="SearchInput__term"
				:label="label"
				label-for="searchTerm">
				<b-form-input
					id="searchTerm"
					v-model.trim="searchTerm"
					@keydown.enter.native="submit"/>
			</b-form-group>
			<b-button
				class="SearchInput__button"
				variant="outline-primary"
				@click="submit"
				v-text="'Search'"/>
		</div>

		<div class="SearchInput__badges">
			<span>Currently Supports:</span>
			<b-badge
				variant="danger"
				href="https://www.youtube.com/"
				target="_blank">
				Youtube
			</b-badge>
			<b-badge
				variant="success"
				href="https://www.spotify.com/"
				target="_blank">
				Spotify
			</b-badge>
		</div>


	</section>
</template>

<script>

export default {
	props: {
		label: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			searchTerm: null
		};
	},
	methods: {
		submit() {
			this.$emit('submit', this.searchTerm);
		}
	}
};
</script>

<style lang="scss">
@import '../../../settings';

$searchTermWidth: 200px;

.SearchInput {

	&__inputs {
		float: left;
		min-width: $searchTermWidth + 64px;
		width: 100%;
	}

	&__term {
		float: left;
		width: 100%;
		min-width: $searchTermWidth;
	}

	&__button {
		float: left;
		clear: both;
	}

	&__badges {
		position: absolute;
		left: 10px;
		top: -100%;
		-webkit-transform: rotate(5deg);
		transform: rotate(11deg);
	}

}

</style>
