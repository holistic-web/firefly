<template>
	<section class="Results">

		<b-table
			:items="results"
			:fields="fields"
			striped>

			<template slot="title" slot-scope="data">
				<p
					class="Results__title"
					v-text="getTitle(data.item)"/>
			</template>
		</b-table>

		<section
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
	}

	&__thumb {
		float: right;
		height: 80px;;
	}
}

</style>
