<template>
	<view class="ground">
		<div class="ground">
			<canvas id="plane" :style="canvasSize"></canvas>
		</div>
		<div id="aabb" style="display: none;">
			<image class="img" v-for="(img,index) in imgs" :src="img.src" @load="onImageLoad" :key="index"></image>
		</div>
	</view>
</template>

<script>
	import {
		MaxRects
	} from '../../script/MaxRects.js';
	import {
		PList,
		Frame
	} from '../../script/PList.js';
	const space = 0;
	const plist = new PList();
	export default {
		props: ['files'],
		created() {
			uni.$on('files_changed', this.onFilesChanged);
			uni.$on('output_options_changed', this.onOutputOptionsChanged);
			uni.$on('output_atlas', this.outputAtlas);
			uni.$on('select_image', this.onSelectImage);
		},
		data() {
			return {
				imgs: [],
				canvasSize: '',
				lastWidth: 512,
				lastHeight: 512,
				drawImagesToCanvasTimeoutHandler: -1,
				isSquare: false,
				isPower: false
			}
		},
		methods: {
			onFilesChanged: function() {
				this.clearCanvas();
				let me = this;
				getApp().$nextTick().then(function() {
					me.makeAltas();
				});
			},
			makeAltas: function() {
				let files = this.files;
				let n = files.length;
				this.imgs = [];
				for (let i = 0; i < n; i++) {
					this.imgs.push({
						src: files[i].path
					});
				}
			},
			onImageLoad: function(e) {
				if (this.drawImagesToCanvasTimeoutHandler != -1)
					clearTimeout(this.drawImagesToCanvasTimeoutHandler);
				let me = this;
				this.drawImagesToCanvasTimeoutHandler = setTimeout(function() {
					me.drawImagesToCanvasTimeoutHandler = -1;
					me.drawImagesToCanvas();
				}, 500);
			},
			drawImagesToCanvas: function() {
				plist.removeAllFrames();
				let ctx = this.getCanvasContext();
				let a = document.getElementById('aabb').getElementsByTagName('img');
				let imgs = [];
				for (let i = 0, n = a.length; i < n; i++) {
					a[i].name = this.files[i].name;
					imgs[imgs.length] = a[i];
				}
				let {
					width,
					height
				} = this.getMaxSize(imgs);
				ctx.canvas.width = width * 2;
				ctx.canvas.height = height * 2;
				let me = this;
				getApp().$nextTick().then(function() {
					// ctx.strokeStyle = '#18BC37';
					let maxRect = new MaxRects(width, height, space);
					for (let i = 0, n = imgs.length; i < n; i++) {
						let img = imgs[i];
						let p = maxRect.find(img.width, img.height);
						if (p) {
							ctx.drawImage(img, p.x, p.y);
							// ctx.strokeRect(p.x, p.y, img.width, img.height);
							let frame = new Frame(img.name);
							frame.setOffset(p.x, p.y);
							frame.setSize(img.width, img.height);
							plist.addFrame(frame);
						}
					}
					if (!me.isSquare) {
						let lastRects = maxRect.lastRects;
						for (let i = 0, n = lastRects.length; i < n; i++) {
							let r = lastRects[i];
							if (r.origin.x == space && r.origin.x + r.size.width == width) {
								height = r.origin.y - space;
							}
						}
					}
					let s = 718 / width;
					if (s > 1) s = 1;
					me.canvasSize = `width:${width}px;height:${height}px;transform:scale(${s});`;
					me.lastWidth = width;
					me.lastHeight = height;
				});
			},
			getMaxSize: function(imgs) {
				let all = 0,
					min = 128,
					max = 2048,
					maxW = 0,
					maxH = 0;
				imgs.forEach(a => {
					let width = a.width;
					let height = a.height;
					all += (width + space) * (height + space);
					if (width > maxW) maxW = width + space;
					if (height > maxH) maxH = height + space;
				});
				let a = Math.max(Math.sqrt(all), maxW);
				if (this.isPower) {
					while (a > min) {
						min *= 2;
					}
					a = min;
				}
				a *= 1.2;

				this.sortByHeightWidth(imgs, maxW > maxH);
				return {
					width: a,
					height: a
				};
			},
			sortByHeightWidth: function(imgs, firstW) {
				imgs.sort((a, b) => {
					if (firstW)
						return (b.width - a.width) || (b.height - a.height);
					else
						return (b.height - a.height) || (b.width - a.width);
				});
			},
			getCanvasContext: function() {
				let canvas = document.getElementById('plane');
				let ctx = canvas.getElementsByTagName('canvas')[0].getContext('2d');
				return ctx;
			},
			clearCanvas: function() {
				this.getCanvasContext().clearRect(0, 0, this.lastWidth, this.lastHeight);
			},
			onOutputOptionsChanged: function(options) {
				this.isSquare = options.indexOf('square') != -1;
				this.isPower = options.indexOf('power') != -1;
				this.clearCanvas();
				let me = this;
				getApp().$nextTick().then(function() {
					me.drawImagesToCanvas();
				});
			},
			outputAtlas: function(name) {
				let canvas = document.getElementById('plane').getElementsByTagName('canvas')[0];
				let tp = canvas.toDataURL('image/octet-stream');
				this.download(name, tp, 'png');
				plist.name = name;
				let blob = new Blob([plist.getContent()]);
				this.download(name, window.URL.createObjectURL(blob), 'plist');
			},
			download: function(name, data, type) {
				let a = document.createElement('a');
				let body = document.body;
				body.appendChild(a);
				a.download = `${name}.${type}`;
				a.href = data;
				a.click();
				body.removeChild(a);
			},
			onSelectImage: function(idx) {
				let name = this.files[idx].name;
				console.log(name)
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

	#plane {
		/* border: 1px dashed #007AFF; */
		background-color: #999999;
		width: 512px;
		height: 512px;
	}
</style>
