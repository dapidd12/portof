const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'sequence');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

for (let i = 1; i <= 100; i++) {
    const progress = i / 100;
    
    // Abstract "nano banana" / fluid shape animation
    const cx1 = 1920 * 0.5 + Math.sin(progress * Math.PI * 2) * 300;
    const cy1 = 1080 * 0.5 + Math.cos(progress * Math.PI * 2) * 200;
    
    const cx2 = 1920 * 0.5 + Math.sin(progress * Math.PI * 2 + Math.PI) * 300;
    const cy2 = 1080 * 0.5 + Math.cos(progress * Math.PI * 2 + Math.PI) * 200;

    const r1 = 300 + Math.sin(progress * Math.PI * 4) * 100;
    const r2 = 400 + Math.cos(progress * Math.PI * 4) * 100;

    const svg = `<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#000000" />
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
                <stop offset="100%" style="stop-color:rgb(255,100,0);stop-opacity:1" />
            </linearGradient>
            <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:rgb(0,255,255);stop-opacity:1" />
                <stop offset="100%" style="stop-color:rgb(0,100,255);stop-opacity:1" />
            </linearGradient>
            <filter id="blur">
                <feGaussianBlur stdDeviation="100" />
            </filter>
        </defs>
        <g filter="url(#blur)">
            <circle cx="${cx1}" cy="${cy1}" r="${r1}" fill="url(#grad1)" opacity="0.8" />
            <circle cx="${cx2}" cy="${cy2}" r="${r2}" fill="url(#grad2)" opacity="0.6" />
            <ellipse cx="960" cy="540" rx="${800 * progress}" ry="${400 * progress}" fill="rgb(255,255,255)" opacity="${0.1 + progress * 0.2}" />
        </g>
    </svg>`;
    const fileName = i.toString().padStart(4, '0') + '.svg';
    fs.writeFileSync(path.join(dir, fileName), svg);
}
console.log('Generated 100 SVG frames in public/sequence/');
