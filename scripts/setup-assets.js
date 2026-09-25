const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\ayath\\Downloads';
const targetDir = path.resolve(__dirname, '..', 'public', 'images', 'products');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const mapping = {
  'WhatsApp Image 2026-09-07 at 14.06.51.jpeg': 'vienna.jpg',
  'WhatsApp Image 2026-09-07 at 14.06.51 (1).jpeg': 'sultan.jpg',
  'WhatsApp Image 2026-09-07 at 14.06.52.jpeg': 'nevine.jpg',
  'WhatsApp Image 2026-09-07 at 14.06.52 (1).jpeg': 'piano-pro.jpg',
  'WhatsApp Image 2026-09-07 at 14.06.53.jpeg': 'piano.jpg',
  'WhatsApp Image 2026-09-07 at 14.06.53 (1).jpeg': 'oslo.jpg',
  'WhatsApp Image 2026-09-07 at 14.06.53 (2).jpeg': 'bubble.jpg',
  'WhatsApp Image 2026-09-07 at 14.06.53 (3).jpeg': 'glaxsy.jpg',
  'WhatsApp Image 2026-09-07 at 14.06.53 (4).jpeg': 'oreiller-visco-gel.jpg',
  'WhatsApp Image 2026-09-07 at 14.06.53 (5).jpeg': 'oreiller-plume.jpg',
  'WhatsApp Image 2026-09-07 at 14.06.53 (6).jpeg': 'oreiller-orthopedique.jpg',
  'WhatsApp Image 2026-09-07 at 14.06.54.jpeg': 'protege-matelas.jpg',
  'WhatsApp Image 2026-09-07 at 14.06.54 (1).jpeg': 'oreiller-visco.jpg',
  'WhatsApp Image 2026-09-07 at 14.06.54 (2).jpeg': 'bulk.jpg',
};

for (const [srcFile, destFile] of Object.entries(mapping)) {
  const srcPath = path.join(srcDir, srcFile);
  const destPath = path.join(targetDir, destFile);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${srcFile} -> ${destFile}`);
  } else {
    console.warn(`File not found: ${srcFile}`);
  }
}

console.log('All 14 product images mapped and copied successfully!');
