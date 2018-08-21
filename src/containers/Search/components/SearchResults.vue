<template>
	<section class="Results">

		<b-table
			:items="results"
			:fields="fields"
			striped>

			<template slot="platform" slot-scope="data">
				<b-img
					class="Results__icon"
					:src="getPlatformIconSrc(data.item.platform)"/>
			</template>

			<template slot="actions" slot-scope="data">
				<b-button
					variant="primary"
					v-text="'View Player'"
					size="sm"/>
			</template>

		</b-table>

		<!-- <section
			v-for="result in results"
			class="Results__result"
			:key="result._id"
			no-body>


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

		</section> -->

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
	data() {
		return {
			fields: [
				{ key: 'title', label: 'Title', sortable: true },
				{ key: 'album', label: 'Album', sortable: true },
				{ key: 'artist', label: 'Artist', sortable: true },
				{ key: 'platform', label: 'Platform', sortable: true },
				{ key: 'actions', label: '' }
			]
		};
	},
	methods: {
		getPlatformIconSrc(platform) {
			if (platform === 'spotify') return '/static/icons/spotify.svg';
			if (platform === 'youtube') return '/static/icons/youtube.svg';
			return false;
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
	}

	&__icon {
		width: 30px;
	}

	&__thumb {
		float: right;
		height: 80px;;
	}
}

</style>
