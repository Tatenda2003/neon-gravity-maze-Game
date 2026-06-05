const fs = require('fs');
const imgPath = 'c:\\Users\\User\\.gemini\\antigravity\\scratch\\avatar_game\\built_sprite.png';
const htmlPath = 'c:\\Users\\User\\.gemini\\antigravity\\scratch\\avatar_game\\index.html';

const imgBase64 = fs.readFileSync(imgPath).toString('base64');
const dataUrl = `data:image/png;base64,${imgBase64}`;

let html = fs.readFileSync(htmlPath, 'utf-8');

// The code to replace:
const startString = "        draw() {";
const endString = "        update() {";

const startIndex = html.indexOf(startString);
const endIndex = html.indexOf(endString);

if (startIndex !== -1 && endIndex !== -1) {
    const replaceWith = `        img: null,
        draw() {
            if (!this.img) {
                this.img = new Image();
                this.img.src = "${dataUrl}";
            }
            if (this.img.complete && this.img.naturalWidth > 0) {
                ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            } else {
                ctx.fillStyle = '#e94560';
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        },
`;
    html = html.substring(0, startIndex) + replaceWith + html.substring(endIndex);
    fs.writeFileSync(htmlPath, html);
    console.log("Successfully replaced image!");
} else {
    console.log("Could not find bounds.");
}
