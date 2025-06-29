const video = document.getElementById('video');

const canvases = [
    document.getElementById('canvas-1'),
    document.getElementById('canvas-2'),
    document.getElementById('canvas-3'),
];

const contexts = canvases.map(canvas => canvas.getContext('2d'));

const captureBtn = document.getElementById('captureBtn');
const downloadLink = document.getElementById('downloadLink');
const topTextInput = document.getElementById('topText');
const bottomTextInput = document.getElementById('bottomText');

// Start webcam
async function startVideo() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        video.srcObject = stream;
    } catch (err) {
        alert('Please allow camera access to create your meme!');
        console.error(err);
    }
}

// Draw meme on canvas
function drawMeme(index) {

    const canvas = canvases[index];
    const ctx = contexts[index];

    if (!canvas || !ctx) return;

    // Clear previous drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw current video frame on the selected canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const topText = topTextInput.value.toUpperCase();
    const bottomText = bottomTextInput.value.toUpperCase();

    // Meme style
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 6;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.font = 'bold 28px Impact, Arial, sans-serif';

    // Draw top text
    ctx.textBaseline = 'top';
    ctx.strokeText(topText, canvas.width / 2, 10);
    ctx.fillText(topText, canvas.width / 2, 10);

    // Draw bottom text
    ctx.textBaseline = 'bottom';
    ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 10);
    ctx.fillText(bottomText, canvas.width / 2, canvas.height - 10);

    // Show the selected canvas
    canvas.style.display = 'inline-block';
}

let currentIndex = 0;

captureBtn.addEventListener('click', () => {
    drawMeme(currentIndex);
    currentIndex = (currentIndex + 1) % canvases.length; // cycle through 0,1,2
});

function downloadAllCanvases() {
    canvases.forEach((canvas, i) => {
        const url = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url;
        a.download = `meme-${i + 1}.png`;
        a.click();
    });
}

document.getElementById('downloadAllBtn').addEventListener('click', downloadAllCanvases);

startVideo();