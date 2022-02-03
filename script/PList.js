export class Frame {
	_name = '';
	_offset = {
		x: 0,
		y: 0
	};
	_size = {
		w: 0,
		h: 0
	};
	//  _sourceSize: { w, h } = { w: 0, h: 0 };
	//  _rect: { x, y, w, h } = { x: 0, y: 0, w: 0, h: 0 };
	_rotated = false;

	constructor(name) {
		this.setName(name);
	}

	setName(name = '') {
		this._name = name;
	}

	setOffset(x, y) {
		this._offset.x = x;
		this._offset.y = y;
	}

	setSize(w, h) {
		this._size.w = w;
		this._size.h = h;
	}

	setRotated(v) {
		this._rotated = v;
	}

	getDictContent() {
		return `
        <key>${this._name}</key>
        <dict>
            <key>aliases</key>
            <array/>
            <key>spriteOffset</key>
            <string>{0,0}</string>
            <key>spriteSize</key>
            <string>{${this._size.w},${this._size.h}}</string>
            <key>spriteSourceSize</key>
            <string>{${this._size.w},${this._size.h}}</string>
            <key>textureRect</key>
            <string>{{${this._offset.x},${this._offset.y}},{${this._size.w},${this._size.h}}}</string>
            <key>textureRotated</key>
            <${this._rotated}/>
        </dict>
        `;
	}
}

export class PList {
	_frames = [];
	_name = '';
	_size = {
		w: 0,
		h: 0
	};

	constructor(name) {
		this._name = name;
	}

	set name(v) {
		this._name = v;
	}

	setSize(w, h) {
		this._size = {
			w: w,
			h: h
		};
	}

	addFrame(frame) {
		this._frames[this._frames.length] = frame;
	}

	removeFrame(name) {
		for (let i = 0, n = this._frames.length; i < n; i++) {
			let f = this._frames[i];
			if (f._name == name) {
				this._frames.splice(i, 1);
				break;
			}
		}
	}

	removeAllFrames() {
		this._frames = [];
	}

	getContent() {
		let framesContent = '';
		this._frames.forEach(frame => {
			framesContent += frame.getDictContent();
		});
		return `
        <?xml version="1.0" encoding="UTF-8"?>
        <!DOCTYPE plist PUBLIC "-//Apple Computer//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
        <plist version="1.0">
            <dict>
                <key>frames</key>
                <dict>
                    ${framesContent}
                </dict>
                <key>metadata</key>
                <dict>
                    <key>format</key>
                    <integer>3</integer>
                    <key>pixelFormat</key>
                    <string>RGBA8888</string>
                    <key>premultiplyAlpha</key>
                    <false/>
                    <key>realTextureFileName</key>
                    <string>${this._name}.png</string>
                    <key>size</key>
                    <string>{${this._size.w},${this._size.h}}</string>
                    <key>textureFileName</key>
                    <string>${this._name}.png</string>
                </dict>
            </dict>
        </plist>
        `;
	}
}
