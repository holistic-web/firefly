<template>
	<b-card class="ObjectCard"
		no-body
		:header="object.symbol"
		@click.prevent="goToCompany">

		<b-list-group flush>

			<b-list-group-item
				v-for="fact in facts"
				:key="fact.property">

				<b class="ObjectCard__item"
					v-text="fact.property"/>

				<span
					class="ObjectCard__item"
					v-text="fact.value"/>

			</b-list-group-item>

		</b-list-group>

	</b-card>
</template>

<script>
export default {
	props: {
		object: {
			type: Object,
			required: true
		}
	},
	computed: {
		facts() {
			const properties = Object.keys(this.object);
			const facts = properties.map(property => ({
				property,
				value: this.object[property]
			}));
			return facts;
		},
		linkToCompanyWebsite() {
			return this.object.website;
		}
	},
	methods: {
		goToCompany() {
			const companyPage = window.open(this.linkToCompanyWebsite, '_blank');
			companyPage.focus();
		}
	}
};
</script>

<style lang="scss">
$animationTime: 0.25s;
// #Todo: fix animation on hover, currently broken

.ObjectCard {
	transition: box-shadow $animationTime, margin-top $animationTime;
	cursor: pointer;
	position: relative;

	&:hover {
		margin-top: -5px;
		box-shadow: 0 1px #dfdfdf;
	}


	&__item {
		clear: both;
		display: block;
	}


}
</style>
