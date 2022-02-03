<template>
	<view class="content">
		<div class="row">
			内容：<textarea v-model="text" @input="onInput" />
		</div>
		<div style="width: 300px;height: 50px;" class="row">
			<div class="float" style="width: 150px;">大小：<uni-number-box v-model="size" :min="1" :step="1"
					@change="onInput" background="#007AFF" color="#ffffff"></uni-number-box>
			</div>
			<div class="float" style="width: 150px;">
				颜色：{{color}}<input class="input1" type="color" v-model="color" @input="onInput" />
			</div>
		</div>
		<div class="row">
			字体：{{font}}
			<button type="primary" @click="choose">选择字体</button>
		</div>
		<div class="row" style="width: 300px;">
			<div class="float" style="width: 150px;">
				粗体：<uni-combox placeholder="请选择粗体样式" v-model="weight" :candidates="weights" @input="onInput"
					style="width: 100px;">
				</uni-combox>
			</div>
			<div class="float" style="width: 150px;">
				斜体：
				<checkbox-group style="height: 50px;" @change="onCheckBoxChange">
					<checkbox value="italic"></checkbox>
				</checkbox-group>
			</div>
		</div>
		<div class="row" style="width: 300px;height:  60px;">
			<div style="width: 300px;">
				<div class="float" style="width: 150px;">
					描边宽：
					<uni-number-box v-model="stroke_width" :min="1" :step="1" @change="onInput" @input="onInput"
						background="#007AFF" color="#ffffff"></uni-number-box>
				</div>
				<div class="float" style="width: 150px;">
					描边颜色：
					<input class="input1" type="color" v-model="stroke_color" @input="onInput" />
				</div>
			</div>
		</div>
		<div class="row" style="width: 300px;height: 60px;">
			<div style="width: 300px;">
				<div class="float" style="width: 150px;">
					偏移x
					<uni-number-box v-model="x" :min="0" :step="1" @change="onInput" background="#007AFF"
						color="#ffffff">
					</uni-number-box>
				</div>
				<div class="float" style="width: 150px;">
					偏移y
					<uni-number-box v-model="y" :min="0" :step="1" @change="onInput" background="#007AFF"
						color="#ffffff">
					</uni-number-box>
				</div>
			</div>
		</div>
		<div class="row" style="width: 300px;height: 60px;">
			<div style="width: 300px;">
				<div class="float" style="width: 150px;">
					宽
					<uni-number-box v-model="width" :min="0" :step="1" :max="2048" @change="onInput"
						background="#007AFF" color="#ffffff">
					</uni-number-box>
				</div>
				<div class="float" style="width: 150px;">
					高
					<uni-number-box v-model="height" :min="0" :step="1" :max="2048" @change="onInput"
						background="#007AFF" color="#ffffff">
					</uni-number-box>
				</div>
			</div>
		</div>
		<div class="row">
			输出名称：<input class="input" v-model='name' />
		</div>
		<div>
			<button type="primary" @click="output">输出</button>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				options: [],
				text: '',
				name: '',
				size: 18,
				color: '#000000',
				font: '',
				weights: ['normal', 'bold', 'bolder', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800',
					'900'
				],
				weight: 'normal',
				italic: '',
				stroke_width: 0,
				stroke_color: '#000000',
				x: 0,
				y: 0,
				width: 100,
				height: 100
			}
		},
		methods: {
			onCheckBoxChange: function(e) {
				this.italic = e.detail.value.indexOf('italic') > -1 ? 'italic' : '';
				this.onInput();
			},
			onInput: function() {
				let me = this;
				getApp().$nextTick().then(function() {
					uni.$emit('text_change', {
						text: me.text,
						size: me.size,
						color: me.color,
						weight: me.weight,
						italic: me.italic,
						stroke_width: me.stroke_width,
						stroke_color: me.stroke_color,
						x: me.x,
						y: me.y,
						width: me.width,
						height: me.height
					});
				});
			},
			output: function() {
				if (this.name == '') {
					window.alert('输出名称不能为空！');
					return;
				}
				uni.$emit('output_text', this.name);
			},
			choose: function() {
				let me = this;
				uni.chooseFile({
					count: 1,
					extension: ['.ttf'],
					success: function(res) {
						let file = res.tempFiles[0];
						if (me.font != file.name) {
							me.font = file.name;
							uni.$emit('choose_font', file.name, file.path);
						}
					},
					fail: function(e) {
						this.font = '';
						console.log(e);
					}
				});
			}
		}
	}
</script>

<style>
	.content {
		color: #007AFF;
		padding: 10px;
		overflow-y: auto;
	}

	.row {
		margin-bottom: 10px;
	}

	.input {
		background-color: #007AFF;
		color: #FFFFFF;
		min-height: 30px;
		max-height: 200px;
	}

	.input1 {
		min-height: 30px;
		max-height: 200px;
		width: 60px;
	}

	textarea {
		border: 1px solid #DDDDDD;
		width: 278px;
	}

	.float {
		float: left;
	}
</style>
