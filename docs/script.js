const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");

// Preload the image
const image = new Image();
image.src = "docs/photo.jpg"; // Replace with the correct image path
image.onload = () => {
  // Draw the image on the canvas
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  // Add the overlay (scratching layer)
  applyScratchOverlay();
};

function applyScratchOverlay() {
  ctx.globalCompositeOperation = "source-over"; // Default mode
  ctx.fillStyle = "#006400"; // Dark green overlay
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "destination-out"; // Scratch effect mode
}

// Variables to track the scratching state
let isDrawing = false;
let lastX = 0;
let lastY = 0;

function draw(x, y) {
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.lineWidth = 40; // Adjust the line width for smoother effect
  ctx.lineCap = "round";
  ctx.stroke();
  lastX = x;
  lastY = y;
}

function handleMouseMove(e) {
  if (!isDrawing) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  draw(x, y);
}

function handleTouchMove(e) {
  e.preventDefault();
  if (!isDrawing) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.touches[0].clientX - rect.left;
  const y = e.touches[0].clientY - rect.top;
  draw(x, y);
}

// Mouse Event Listeners
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  const rect = canvas.getBoundingClientRect();
  lastX = e.clientX - rect.left;
  lastY = e.clientY - rect.top;
});

canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mousemove", handleMouseMove);

// Touch Event Listeners
canvas.addEventListener("touchstart", (e) => {
  isDrawing = true;
  const rect = canvas.getBoundingClientRect();
  lastX = e.touches[0].clientX - rect.left;
  lastY = e.touches[0].clientY - rect.top;
});

canvas.addEventListener("touchend", () => (isDrawing = false));
canvas.addEventListener("touchmove", handleTouchMove);
