<template>
	<section class="Search">

		<b-form-group
			class="Search__term"
			description="Enter a searchphrase"
			:label="label"
			label-for="searchTerm">
			<b-form-input
				id="searchTerm"
				v-model.trim="searchTerm"/>
		</b-form-group>

		<b-button
			class="Search__button"
			variant="outline-primary"
			@click="submit"
			v-text="'Search'"/>

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

.Search {
	float: left;
	width: 100%;

	&__term {
		display: inline-block;
		width: 80%;
	}

	&__button {
		float: right;
		margin-top: 2rem;
	}

}

</style>
