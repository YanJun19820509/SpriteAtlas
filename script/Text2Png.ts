import fs from 'fs';
import images from 'images';
import TextToSVG from 'text-to-svg';
import svg2png from "svg2png";

export namespace Text2Png {

    /**
     *
     * @param ss
     * @param css
     * @param output 输出目录
     */
    export function createPng(ss: string[], css: string, output: string) {
        if (!fs.existsSync(output)) {
            console.error('输出目录不存在：', output);
            return;
        }
        ss.forEach(s => {
            let svg: any = createSvg(s, css);
            // console.log(svg);
            svg2png(svg).then(buffer => {
                images(buffer).save(`${output}/${s}.png`);
            });
        });
    }

    function createSvg(s: string, css: string): string {
        let a = parse(css);
        let font = a.fontFamily;
        let attributes: any = {
            fill: a.color
        };
        if (a.stroke) {
            attributes['stroke'] = a.stroke.color;
            attributes['stroke-width'] = a.stroke.width;
        }
        if (a.opacity) attributes['fill-opacity'] = a.opacity;
        let options: TextToSVG.GenerationOptions = {
            x: 0,
            y: 0,
            fontSize: a.fontSize,
            anchor: 'top',
            kerning: false,
            attributes: attributes
        };
        let t2s = TextToSVG.loadSync(font);
        return t2s.getSVG(s, options);
    }

    // width: 22px;
    // height: 14px;
    // font-size: 18px;
    // font-family: Source Han Serif CN;
    // font-weight: 800;
    // color: #FFFFFF;
    // line-height: 32px;
    // -webkit-text-stroke: 2px #464A57;
    // text-stroke: 2px #464A57;
    function parse(s: string): any {
        s = s.replace(new RegExp('\n|\r|px|', 'g'), '');
        let a = s.split(';');
        let r: any = {};
        a.forEach(b => {
            let c = b.split(': ');
            switch (c[0].trim()) {
                case 'font-size':
                    r.fontSize = Number(c[1]);
                    r.lineHeight = Number(c[1]);
                    break;
                case 'font-family':
                    r.fontFamily = c[1];
                    break;
                case 'font-weight':
                    r.fontWeight = c[1];
                    break;
                case 'color':
                    r.color = c[1];
                    break;
                case 'text-shadow':
                    r.shadow = parseShadow(c[1]);
                    break;
                case 'text-stroke':
                    r.stroke = parseStroke(c[1]);
                    break;
                case 'opacity':
                    r.opacity = Number(c[1]);
                    break;
            }
        });
        return r;
    }

    function parseStroke(s: string): any {
        s = s.replace(new RegExp(', ', 'g'), ',');
        let a = s.split(' ');
        return {
            width: Number(a[0]),
            color: a[1]
        };
    }

    function parseShadow(s: string): any {
        s = s.replace(new RegExp(', ', 'g'), ',');
        let b = s.split(' ');
        return {
            x: Number(b[0]),
            y: -Number(b[2]),
            blur: Number(b[1]),
            color: b[3]
        };
    }
}

Text2Png.createPng(['确定','取消','领取','前往'], `
font-size: 20px;
font-family: tf.TTF;
color: #FFFFFF;
opacity: 1;
text-stroke: 2px #000000;
`, '1');