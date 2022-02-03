<template>
	<view class="main_view">
		<div class="center grid-item">
			<atlas-plane :files="files"></atlas-plane>
		</div>
		<div>
			<div class="right grid-item">
				<controller></controller>
			</div>
			<div class="left grid-item">
				<img-list v-for="(name, index) in list" :index="index" :name="name"></img-list>
			</div>
			<div class="bottom grid-item">
				<button type="primary" @click="removeAll">全部清除</button>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				files: []
			}
		},
		created() {
			uni.$on('choose_images', this.onChooseImages);
			uni.$on('remove_image', this.remove);
		},
		methods: {
			remove: function(idx) {
				this.list.splice(idx, 1);
				this.files.splice(idx, 1);
				uni.$emit('files_changed');
			},
			removeAll: function() {
				this.list = [];
				this.files = [];
				uni.$emit('files_changed');
			},
			onChooseImages: function() {
				let me = this;
				uni.chooseImage({
					count: 100,
					extension: ['.png', '.jpg'],
					success: function(res) {
						let files = res.tempFiles,
							changed = false;
						for (let i = 0, n = files.length; i < n; i++) {
							let file = files[i];
							if (me.list.indexOf(file.name) == -1) {
								me.list.push(file.name);
								me.files.push(file);
								changed = true;
							}
						}
						changed && uni.$emit('files_changed');
					},
					fail: function(e) {
						console.log(e);
					}
				})
			}
		}
	}
</script>

<style>
	.main_view {
		width: 960px;
		height: 640px;
		display: grid;
		grid-template-columns: auto auto;
	}

	.grid-item {
		background-color: #FFFFFF;
	}

	.left {
		width: 220px;
		height: 390px;
		padding: 10px;
		overflow-y: auto;
		/* border-bottom: 1px solid #007AFF; */
		border-right: 1px solid #007AFF;
	}

	.right {
		width: 240px;
		height: 268px;
		border-bottom: 1px solid #007AFF;
		border-right: 1px solid #007AFF;
		border-top: 1px solid #007AFF;
	}

	.center {
		border: 1px solid #007AFF;
		width: 718px;
		height: 745px;
		overflow: auto;
	}

	.uni-list-item__container {
		padding: 10px;
		height: 20px;
	}

	/* .item_name {
		width: 180px;
		height: 20px;
		padding: 10px;
		color: #007AFF;
	} */

	.bottom {
		padding: 10px;
		border-bottom: 1px solid #007AFF;
		border-right: 1px solid #007AFF;
	}

	.grid {
		display: grid;
		grid-template-columns: auto auto;
	}

	/* .remove {
		width: 20px;
		height: 20px;
		float: right;
		padding: 0px 0px 0px 0px;
		text-align: center;
		color: red;
	} */
</style>
