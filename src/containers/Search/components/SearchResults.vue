<template>
	<section class="Results">

		<section
			v-for="result in results"
			class="Results__result"
			:class="{
				'Results__result--spotify': result.spotifyItem,
				'Results__result--youtube': result.youtubeItem,
			}"
			:key="result._id"
			no-body>

			<h3
				class="Results__title"
				v-text="getTitle(result)"/>

			<b-button
				v-b-toggle="getCollapseId(result)"
				variant="primary"
				v-text="'Play Now'"/>

			<b-collapse :id="getCollapseId(result)">
				<b-card>
					<b-embed
						type="iframe"
						:src="getPlayerSrc(result)"
						width="220"
						height="80"
						frameborder="0"
						allow="encrypted-media"
						allowtransparency
						allowfullscreen/>
				</b-card>
			</b-collapse>

			<b-img
				class="Results__thumb"
				:src="getThumbnail(result)"
				thumbnail/>

		</section>

	</section>
</template>

<script>
export default {
	props: {
		results: {
			type: Array,
			required: true
		}
	},
	methods: {
		getTitle(item) {
			if (item.spotifyItem) return item.name;
			if (item.youtubeItem) return item.snippet.title;
			return false;
		},
		getCollapseId(item) {
			const id = item._id;
			return `collapse_${id}`;
		},
		getPlayerSrc(item) {
			if (item.spotifyItem) {
				const id = item.id;
				return `https://open.spotify.com/embed/track/${id}`;
			}
			if (item.youtubeItem) {
				const id = item.id.videoId;
				return `https://www.youtube.com/embed/${id}`;
			}
			return false;
		},
		getThumbnail(item) {
			if (item.spotifyItem) {
				return item.album.images[0].url;
			}
			if (item.youtubeItem) {
				return item.snippet.thumbnails.high.url;
			}
			return false;
		}
	}
};
</script>

<style lang="scss">
@import '../../../settings';

$frameWidth: $Frame-Width;

.Results {
	width: 100%;
	display: block;
	float: left;

	&__result {
		width: 100%;
		display: block;
		float: left;
		padding: 1rem;

		&--spotify {
		}

		&--youtube {
		}
	}

	&__thumb {
		float: right;
		height: 80px;;
	}
}

</style>
