// WebGL Pixel Mirror
// Uses brightness values from webcam to rotate 3D disks
// Demonstrates: WebGL, 3D transformations, lighting, pixel sampling

let capture;
let gridSize = 20; // Distance between disks
let diskRadius = 15; // Size of each disk
let scaleValue = 10; // Video downscale factor

function setup() {
  createCanvas(1280, 720, WEBGL);

  // Setup video capture
  capture = createCapture(VIDEO);
  capture.size(1920 / scaleValue, 1080 / scaleValue);
  capture.hide();

  // Optimize performance
  pixelDensity(1);
}

function draw() {
  background(20);

  // Setup lighting
  // Ambient light provides base illumination
  ambientLight(60);

  // Directional light from front-top-left
  directionalLight(255, 255, 255, 0.25, 0.25, 1);

  // Point light that follows mouse for interactive lighting
  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;
  pointLight(200, 200, 255, locX, locY, 200);

  // Load pixel data from video
  capture.loadPixels();

  // Center coordinate system
  // Move origin to top-left instead of center for easier positioning
  translate(-width / 2, -height / 2, 0);

  // Calculate grid dimensions
  let cols = floor(width / gridSize);
  let rows = floor(height / gridSize);

  // Nested loop to create grid of rotating disks
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      // Calculate position in video capture
      let captureX = floor((x / cols) * capture.width);
      let captureY = floor((y / rows) * capture.height);

      // Get pixel offset
      let offset = (captureY * capture.width + captureX) * 4;

      // Get RGB values
      let r = capture.pixels[offset];
      let g = capture.pixels[offset + 1];
      let b = capture.pixels[offset + 2];

      // Calculate brightness (0-255)
      let brightness = (r + g + b) / 3;

      // Map brightness to rotation angle (0 to PI)
      // Darker = edge-on, Brighter = face-on
      let rotationX = map(brightness, 0, 255, 0, PI);

      // Map brightness to Z-depth for extra dimensionality
      let zDepth = map(brightness, 0, 255, -100, 100);

      // Calculate screen position
      let xPos = x * gridSize + gridSize / 2;
      let yPos = y * gridSize + gridSize / 2;

      // Save transformation state
      push();

      // Move to grid position
      translate(xPos, yPos, zDepth);

      // Rotate disk based on brightness
      rotateX(rotationX);

      // Optional: add subtle rotation over time
      // rotateY(frameCount * 0.01);

      // Set material color based on original pixel color
      // Use specular material for shiny disks
      specularMaterial(r, g, b);
      shininess(20);

      // Draw disk as a thin cylinder
      cylinder(diskRadius, 2);

      // Restore transformation state
      pop();
    }
  }
}

// Add interactivity with keyboard
function keyPressed() {
  if (key === " ") {
    // Space to toggle between rotation modes
    // You could add different visual modes here
  }

  // Arrow keys to adjust grid density
  if (keyCode === UP_ARROW) {
    gridSize = max(10, gridSize - 2);
  } else if (keyCode === DOWN_ARROW) {
    gridSize = min(40, gridSize + 2);
  }

  // Brackets to adjust disk size
  if (key === "[") {
    diskRadius = max(5, diskRadius - 2);
  } else if (key === "]") {
    diskRadius = min(30, diskRadius + 2);
  }
}
