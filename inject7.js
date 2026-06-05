const fs = require('fs');
const htmlPath = 'c:\\\\Users\\\\User\\\\.gemini\\\\antigravity\\\\scratch\\\\avatar_game\\\\index.html';
const imgPath = 'C:/Users/User/.gemini/antigravity/brain/70c5cfd9-c9ce-4027-9ff5-65e2cd61ce22/realistic_avatar_1778092889048.png';

const imgBase64 = fs.readFileSync(imgPath).toString('base64');
const dataUrl = "data:image/png;base64," + imgBase64;

let html = fs.readFileSync(htmlPath, 'utf8');

// Replace base64
const re = /this\\.img\\.src = "data:image\\/png; base64, [^ "]+";/;
if (re.test(html)) {
    html = html.replace(re, 'this.img.src = "' + dataUrl + '";');
}

const targetStr = "            if (this.img.complete) {\\n" +
    "                ctx.drawImage(this.img, this.x, this.y, this.width, this.height);\\n" +
    "            } else {";

const replaceStr = "            if (this.img && !this.img.hasProcessedBackground) {\\n" +
    "                this.img.hasProcessedBackground = true;\\n" +
    "                const processImage = () => {\\n" +
    "                    const tempCanvas = document.createElement('canvas');\\n" +
    "                    tempCanvas.width = this.img.width;\\n" +
    "                    tempCanvas.height = this.img.height;\\n" +
    "                    const tCtx = tempCanvas.getContext('2d');\\n" +
    "                    tCtx.drawImage(this.img, 0, 0);\\n" +
    "                    const imgData = tCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);\\n" +
    "                    const data = imgData.data;\\n" +
    "                    for (let i = 0; i < data.length; i += 4) {\\n" +
    "                        const r = data[i], g = data[i+1], b = data[i+2];\\n" +
    "                        if (r > 230 && g > 230 && b > 230) {\\n" +
    "                            data[i+3] = 0;\\n" +
    "                        }\\n" +
    "                    }\\n" +
    "                    tCtx.putImageData(imgData, 0, 0);\\n" +
    "                    this.processedImg = new Image();\\n" +
    "                    this.processedImg.src = tempCanvas.toDataURL();\\n" +
    "                };\\n" +
    "                if (this.img.complete && this.img.width > 0) {\\n" +
    "                    processImage();\\n" +
    "                } else {\\n" +
    "                    this.img.onload = processImage;\\n" +
    "                }\\n" +
    "            }\\n" +
    "            if (this.processedImg && this.processedImg.complete) {\\n" +
    "                ctx.drawImage(this.processedImg, this.x, this.y, this.width, this.height);\\n" +
    "            } else if (this.img.complete) {\\n" +
    "                ctx.drawImage(this.img, this.x, this.y, this.width, this.height);\\n" +
    "            } else {";

if (html.includes(targetStr)) {
    html = html.replace(targetStr, replaceStr);
    if (!html.includes('processedImg: null')) {
        html = html.replace('img: null,', 'img: null,\\n        processedImg: null,');
    }
    fs.writeFileSync(htmlPath, html);
    console.log("Success string replace!");
} else {
    console.log("Failed string replace!");
}
