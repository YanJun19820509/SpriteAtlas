<template>
	<view class="main_view">
		<div class="left">
			<text-controller></text-controller>
		</div>
		<div class="center">
			<text-plane></text-plane>
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
			
		},
		methods: {
			
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

	.left {
		width: 300px;
		height: 100%;
		border-top: 1px solid #007AFF;
		border-bottom: 1px solid #007AFF;
		border-left: 1px solid #007AFF;
	}

	.center {
		border: 1px solid #007AFF;
		width: 660px;
		height: 100%;
		overflow: auto;
	}
</style>
