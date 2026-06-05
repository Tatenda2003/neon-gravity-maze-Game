const fs = require('fs');
const htmlPath = 'c:\\Users\\User\\.gemini\\antigravity\\scratch\\avatar_game\\index.html';
const imgPath = 'C:/Users/User/.gemini/antigravity/brain/70c5cfd9-c9ce-4027-9ff5-65e2cd61ce22/realistic_avatar_1778092889048.png';

const imgBase64 = fs.readFileSync(imgPath).toString('base64');
const dataUrl = `data:image/png;base64,${imgBase64}`;

let html = fs.readFileSync(htmlPath, 'utf8');

// Replace base64
const re = /this\.img\.src = "data:image\/png;base64,[^"]+";/;
if (re.test(html)) {
    html = html.replace(re, `this.img.src = "${dataUrl}";`);
}

const targetStr = \`            if (this.img.complete) {
                ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            } else {\`;

const replaceStr = \`            if (this.img && !this.img.hasProcessedBackground) {
                this.img.hasProcessedBackground = true;
                const processImage = () => {
                    const tempCanvas = document.createElement('canvas');
                    tempCanvas.width = this.img.width;
                    tempCanvas.height = this.img.height;
                    const tCtx = tempCanvas.getContext('2d');
                    tCtx.drawImage(this.img, 0, 0);
                    const imgData = tCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
                    const data = imgData.data;
                    for (let i = 0; i < data.length; i += 4) {
                        const r = data[i], g = data[i+1], b = data[i+2];
                        if (r > 230 && g > 230 && b > 230) {
                            data[i+3] = 0; // Transparent
                        }
                    }
                    tCtx.putImageData(imgData, 0, 0);
                    this.processedImg = new Image();
                    this.processedImg.src = tempCanvas.toDataURL();
                };
                if (this.img.complete && this.img.width > 0) {
                    processImage();
                } else {
                    this.img.onload = processImage;
                }
            }
            if (this.processedImg && this.processedImg.complete) {
                ctx.drawImage(this.processedImg, this.x, this.y, this.width, this.height);
            } else if (this.img.complete) {
                ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            } else {\`;

if (html.includes(targetStr)) {
    html = html.replace(targetStr, replaceStr);
    if (!html.includes('processedImg: null')) {
        html = html.replace('img: null,', 'img: null,\n        processedImg: null,');
    }
    fs.writeFileSync(htmlPath, html);
    console.log("Success string replace!");
} else {
    console.log("Failed string replace!");
}
