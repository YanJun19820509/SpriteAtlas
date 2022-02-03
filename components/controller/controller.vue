<template>
	<view class="content">
		<button type="primary" @click="choose">选择</button>
		<checkbox-group @change="onCheckBoxChange">
			<checkbox value="square">输出正方形</checkbox>
			<checkbox value="power">2的幂</checkbox>
		</checkbox-group>
		输出名称：<input v-model='name' /><br />
		<button type="primary" @click="output">输出</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				options: [],
				name: ''
			}
		},
		methods: {
			output: function() {
				if (this.name == '') {
					window.alert('输出名称不能为空！');
					return;
				}
				uni.$emit('output_atlas', this.name);
			},
			onCheckBoxChange: function(e) {
				this.options = e.detail.value;
				uni.$emit('output_options_changed', this.options);
			},
			choose: function() {
				uni.$emit('choose_images');
			}
		}
	}
</script>

<style>
	.content {
		color: #007AFF;
		padding: 10px;
	}

	checkbox {
		display: block;
		padding-top: 10px;
		padding-bottom: 10px;
	}

	input {
		background-color: #007AFF;
		color: #FFFFFF;
	}

	.button-hover {
		background-color: rgba(0, 0, 0, 0.1);
		opacity: 0.7;
	}
</style>
