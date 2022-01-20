// import fs from 'fs';
// import images from 'images';
import TextToSVG from 'text-to-svg';
import svg2png from "svg2png";

export namespace Text2Png {

    export function createPng(s: string, css: string) {
        let svg = createSvg(s, css);
        let buffer = svg2png(svg)
    }

    function createSvg(s: string, css: string): string {
        let a = parse(css);
        let font = a.fontFamily;
        let attributes = {
            fill: a.color,
            stroke: a.stroke.color
        };
        let options: TextToSVG.GenerationOptions = {
            x: 0,
            y: 0,
            fontSize: a.fontSize,
            anchor: 'top',
            attributes: attributes
        };
        let t2s = TextToSVG.loadSync(font);
        return t2s.getSVG(s, options);
    }

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
                    r.enableBold = c[1] == 'bold';
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