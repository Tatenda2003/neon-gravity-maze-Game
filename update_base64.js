const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const imgBase64 = fs.readFileSync('C:/Users/User/.gemini/antigravity/brain/70c5cfd9-c9ce-4027-9ff5-65e2cd61ce22/realistic_avatar_1778092889048.png').toString('base64');
const out = html.replace(/this\.img\.src = "data:image\/png;base64,[^"]+";/, 'this.img.src = "data:image/png;base64,' + imgBase64 + '";');
fs.writeFileSync('index.html', out);
console.log("Updated base64 successfully");
