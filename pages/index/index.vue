<template>
	<view class="content">
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="button"
			activeColor="#007AFF"></uni-segmented-control>
		<view class="content1">
			<view v-show="current === 0">
				<atlas-main></atlas-main>
			</view>
			<view v-show="current === 1">
				<text-main></text-main>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				items: ['图集', '文字']
			}
		},
		onLoad() {

		},
		methods: {
			onClickItem: function() {
				if (this.current == 0) this.current = 1;
				else this.current = 0;
			}
		}
	}
</script>

<style>
	.content {
		padding: 10px;
		width: 960px;
		height: 640px;
	}
	.content1 {
		padding-top: 4px;
	}

	uni-segmented-control {
		/* padding: 10px; */
	}
</style>
