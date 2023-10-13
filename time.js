const timecut = require('timecut');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// create a temp directory for the vid-output
const tempDir = path.join(process.cwd(), 'vid-output');

if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
    }

// create a unique filename for the video
const filename = crypto.randomBytes(4).toString('hex') + '.mp4';
const filepath = path.join(tempDir, filename);

timecut({
    url: 'https://tungs.github.io/amuse/truchet-tiles/#autoplay=true&switchStyle=random',
    viewport: {
      width: 800,               // sets the viewport (window size) to 800x600
      height: 600
    },
    pipeMode: true,             // pipes the output to stdout
    launchArguments: ['--single-process'],
    selector: '#container',     // crops each frame to the bounding box of '#container'
    left: 20, top: 40,          // further crops the left by 20px, and the top by 40px
    right: 6, bottom: 30,       // and the right by 6px, and the bottom by 30px
    fps: (10),                    // saves 30 frames for each virtual second
    duration: 2,               // for 20 virtual seconds 
    output: filepath         // to video.mp4 of the current working directory
  }).then(function () {
  console.log('Done!');
});