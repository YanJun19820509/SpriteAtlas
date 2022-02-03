<template>
	<view class="ground">
		<div class="ground">
			<canvas id="plane1" :style="canvasSize"></canvas>
		</div>
	</view>
</template>

<script>
	export default {
		created() {
			uni.$on('text_change', this.onTextChanged);
			uni.$on('output_text', this.outputText);
			uni.$on('choose_font', this.onFontChange);
		},
		data() {
			return {
				lastWidth: 100,
				lastHeight: 100,
				font: '',
				fontSize: 18,
				text: '',
				color: '#000000',
				canvasSize: '',
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
			onTextChanged: function(v) {
				this.fontSize = v.size;
				this.text = v.text;
				this.color = v.color;
				this.weight = v.weight;
				this.italic = v.italic;
				this.stroke_color = v.stroke_color;
				this.stroke_width = v.stroke_width;
				this.x = v.x;
				this.y = v.y;
				this.width = v.width;
				this.height = v.height;
				this.drawText();
			},
			onFontChange: function(name, path) {
				if (path != '') {
					let me = this;
					this.font = name;
					let ff = new FontFace(name, `url(${path})`);
					ff.load().then(f => {
						document.fonts.add(f);
					}).then(function() {
						me.drawText();
					});
					// uni.loadFontFace({
					// 	family: name,
					// 	source: `url(${path})`,
					// 	success: function() {
					// 		me.drawText();
					// 	},
					// 	fail: function(e) {
					// 		console.log(e);
					// 	}
					// });
				} else {
					this.font = '';
					this.drawText();
				}
			},
			drawText: function() {
				this.clearCanvas();
				this.canvasSize = `width:${this.width}px;height:${this.height}px;`;
				this.lastWidth = this.width;
				this.lastHeight = this.height;
				if (this.text == '') return;
				let ctx = this.getCanvasContext();
				ctx.fillStyle = this.color; //设置填充颜色为紫色
				ctx.font = `${this.italic} ${this.weight} ${this.fontSize}px "${this.font}"`; //设置字体
				ctx.textBaseline = "top"; //设置字体底线对齐绘制基线
				ctx.textAlign = "left"; //设置字体对齐的方式
				ctx.fillText(this.text, this.x, this.y);
				if (this.stroke_width > 0) {
					ctx.strokeStyle = this.stroke_color;
					ctx.lineWidth = this.stroke_width;
					ctx.strokeText(this.text, this.x, this.y);
				}
			},
			getCanvasContext: function() {
				let canvas = document.getElementById('plane1');
				let ctx = canvas.getElementsByTagName('canvas')[0].getContext('2d');
				return ctx;
			},
			clearCanvas: function() {
				this.getCanvasContext().clearRect(0, 0, this.lastWidth, this.lastHeight);
			},
			outputText: function(name) {
				let canvas = document.getElementById('plane1').getElementsByTagName('canvas')[0];
				let tp = canvas.toDataURL('image/octet-stream');
				this.download(name, tp, 'png');
			},
			download: function(name, data, type) {
				let a = document.createElement('a');
				let body = document.body;
				body.appendChild(a);
				a.download = `${name}.${type}`;
				a.href = data;
				a.click();
				body.removeChild(a);
			}
		}
	}
</script>

<style>
	.ground {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		margin: 10px 10px 10px 10px;
	}

	#plane1 {
		/* border: 1px dashed #007AFF; */
		background-color: #999999;
		width: 100px;
		height: 100px;
	}
</style>
