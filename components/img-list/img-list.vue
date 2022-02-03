<template>
	<view class="listItem">
		<div class="itemContent" :title="name" @click="onClick(index)">
			<div class="item_name">{{index+1}}.{{name}}</div>
			<div class="remove" @click="remove(index)">x</div>
		</div>
	</view>
</template>

<script>
	export default {
		props: ['index', 'name'],
		methods: {
			remove: function(i) {
				uni.$emit('remove_image', i);
			},
			onClick: function(idx) {
				uni.$emit('select_image', idx);
			}
		}
	}
</script>

<style>
	.listItem {
		padding-bottom: 10px;
	}

	.itemContent {
		width: 220px;
		height: 30px;
		display: grid;
		grid-template-columns: auto auto;
		border-bottom: 1px solid #dddddd;
		cursor: pointer;
	}

	.item_name {
		width: 180px;
		height: 20px;
		/* padding: 10px; */
		color: #007AFF;
	}

	.remove {
		width: 20px;
		height: 20px;
		float: right;
		padding: 0px 0px 0px 0px;
		text-align: center;
		color: red;
	}
</style>
