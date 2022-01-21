# SpriteAtlas
简易合图脚本工具

安装依赖
npm i

如果images依赖包在Apple M1上编译时报错：
error: Not found /Users/xxx/.../node_modules/images/vendor/darwin-arm64-binding.node , You can rebuild it, to directory /Users/xxx/.../node_modules/images, Run node-gyp rebuild Command.
则需要手动去下载
https://github.com/zhangyuanwei/node-images/blob/master/vendor/darwin-arm64-binding.node


# API
Text2Png.createPng(ss: string[], css: string, output: string)
ss：需要生成图片的字符串数组
css：css样式表
output：图片保存目录

# CSS样式表内容如下
font-family: tf.TTF;
color: #FF00FF;
opacity: 0.3;
text-stroke: 2px #464A57;

