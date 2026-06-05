const fs = require('fs');
const path = require('path');

const brainsDir = 'C:/Users/User/.gemini/antigravity/brain/70c5cfd9-c9ce-4027-9ff5-65e2cd61ce22/';

const avatarPath = path.join(brainsDir, 'realistic_avatar_1778092889048.png');
const virusPath = path.join(brainsDir, 'virus_enemy_1778094135346.png');
const bgPath = path.join(brainsDir, 'microscopic_background_1778094117128.png');

console.log("Reading templates...");
let html = fs.readFileSync('new_index.html', 'utf8');

console.log("Reading avatar base64...");
const avatarB64 = fs.readFileSync(avatarPath).toString('base64');
console.log("Reading virus base64...");
const virusB64 = fs.readFileSync(virusPath).toString('base64');
console.log("Reading background base64...");
const bgB64 = fs.readFileSync(bgPath).toString('base64');

console.log("Injecting...");
html = html.replace('AVATAR_B64_PLACEHOLDER', avatarB64);
html = html.replace('VIRUS_B64_PLACEHOLDER', virusB64);
html = html.replace('BG_B64_PLACEHOLDER', bgB64);

console.log("Writing to index.html...");
fs.writeFileSync('index.html', html);
console.log("Build Completed Successfully!");
