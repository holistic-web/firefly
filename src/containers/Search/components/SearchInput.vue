<template>
	<section class="Search">

		<div class="Search__inputs">
			<b-form-group
				class="Search__term"
				description="Enter a searchphrase"
				:label="label"
				label-for="searchTerm">
				<b-form-input
					id="searchTerm"
					v-model.trim="searchTerm"
					@keydown.enter.native="submit"/>
			</b-form-group>
			<b-button
				class="Search__button"
				variant="outline-primary"
				@click="submit"
				v-text="'Search'"/>
		</div>

		<div class="Search__badges">
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

$highlightColour: $Highlight-Colour;

$searchTermWidth: 400px;

.Search {
	float: left;
	width: 100%;

	&__inputs {
		float: left;
		min-width: $searchTermWidth + 64px;
	}

	&__term {
		float: left;
		width: 80%;
		max-width: $searchTermWidth;
	}

	&__button {
		float: right;
		margin-left: 1rem;
		margin-top: 2rem;
	}

	&__badges {
		color: $highlightColour;
		position: absolute;
		left: 250px;
		top: -20px;
		transform: rotate(5deg);
	}

}

</style>
