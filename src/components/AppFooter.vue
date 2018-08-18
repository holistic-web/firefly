<template>
	<div class="Footer">

		<div class="App__inner Footer__inner">
			<p class="mb-0">
				Holistics
			</p>
		</div>

	</div>
</template>

<style lang="scss">
@import '../settings';

$footerHeight: $Footer-Height;
$backgroundColour: $Theme-Colour;
$textColour: $White;

.Footer{
	height: $footerHeight;
	background: $backgroundColour;
	color: $textColour;

	&__inner {
		padding-top: 0.8em;
	}

}

</style>
