import fs from 'fs';
import images from 'images';
import { MaxRects } from './MaxRects';

export namespace Atlas {
    const space = 2;

    export function createAtlas(srcPath: string, output: string, name = 'spriteAtlas') {
        if (!fs.existsSync(srcPath)) {
            console.error('目录不存在：', srcPath);
            return;
        }
        let types = ['png', 'PNG', 'jpg', 'jpeg', 'JPG', 'JPEG'];
        // let files: string[] = [];
        let imgs: images.Image[] = [];
        fs.readdirSync(srcPath).forEach(file => {
            let p = `${srcPath}/${file}`;
            let s = fs.statSync(p);
            if (s.isFile() && types.includes(file.split('.')[1])) {
                // files[files.length] = p;
                imgs[imgs.length] = getImage(p);
            }
        });

        drawImagsToAtlasAndSave(imgs, `${output}/${name}.png`);
    }

    function getImage(file: string): images.Image {
        return images(file);
    }

    function createImage(w: number, h: number): images.Image {
        return images(w, h);
    }

    function getMaxSize(imgs: images.Image[]): { width: number, height: number } {
        let all = 0, min = 128, max = 2048, maxH = 0;
        imgs.forEach(img => {
            let { width, height } = img.size();
            all += (width + space) * (height + space);
            if (height > maxH) maxH = height + space;
        });
        let a = Math.sqrt(all);
        while (a > min) {
            min *= 2;
        }
        let w = Math.min(min, max);
        let h = Math.max(maxH, Math.ceil(all / w));
        return { width: w, height: h };
    }

    function sortByHeightWidth(imgs: images.Image[]) {
        imgs.sort((a, b) => {
            return (b.height() - a.height()) || (b.width() - a.width());
        });
    }

    function drawImagsToAtlasAndSave(imgs: images.Image[], savePath: string) {
        sortByHeightWidth(imgs);
        let { width, height } = getMaxSize(imgs);
        let atlas = createImage(width, height);
        let maxRect = new MaxRects(width, height, space);
        imgs.forEach(img => {
            let p = maxRect.find(img.width(), img.height());
            if (p)
                atlas.draw(img, p.x, p.y);
        });
        atlas.save(savePath);
        // console.log(maxRect.lastRects);
    }
}

Atlas.createAtlas('1', '2', 'a');