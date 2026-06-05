const fs = require('fs');
const path = require('path');

const brainsDir = 'C:/Users/User/.gemini/antigravity/brain/70c5cfd9-c9ce-4027-9ff5-65e2cd61ce22/';

const avatarPath = path.join(brainsDir, 'uploaded_image_1778095840415.png');
const enemyPath = path.join(brainsDir, 'cartoon_slime_enemy_1778094707515.png');

console.log("Reading templates...");
let html = fs.readFileSync('maze_template.html', 'utf8');

console.log("Reading base64 images...");
const avatarB64 = fs.readFileSync(avatarPath).toString('base64');
const enemyB64 = fs.readFileSync(enemyPath).toString('base64');

console.log("Injecting...");
html = html.replace('AVATAR_B64_PLACEHOLDER', avatarB64);
html = html.replace('ENEMY_B64_PLACEHOLDER', enemyB64);

console.log("Writing to index.html...");
fs.writeFileSync('index.html', html);
console.log("Build Completed Successfully!");
