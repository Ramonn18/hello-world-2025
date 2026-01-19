# Week 6 Examples: Custom Pixel Displays & Classes

A collection of P5.js examples demonstrating nested loops, pixel manipulation, and object-oriented programming with classes.

## Overview

These examples teach fundamental programming concepts through creative coding:

- **Nested Loops** - Creating grids and iterating over 2D data
- **Pixel Manipulation** - Analyzing and transforming video/image data
- **Classes** - Organizing code with object-oriented programming
- **Color Theory** - Working with RGB and HSB color spaces

## Examples

### 1. p5-custom-pixel
**Basic webcam pixel display**

A straightforward introduction to pixel manipulation that samples colors from a webcam feed and displays them as a grid of colored rectangles.

**Key Concepts:**
- Nested loops for grid creation
- Accessing the pixel array: `(y * width + x) * 4`
- Sampling RGBA color values
- Scaling from video to canvas coordinates

**Run:** Open `p5-custom-pixel/index.html` in a browser

---

### 2. p5-custom-pixel-2
**Advanced pixel effects with image replacement**

Takes pixel manipulation further by converting colors to greyscale and HSB (Hue, Saturation, Brightness), then replacing each pixel with custom colored images based on hue value.

**Key Concepts:**
- Converting RGB to greyscale: `(r + g + b) / 3`
- Converting brightness to HSB values
- Mapping hue (0-360) to the color wheel
- Image loading and dynamic replacement
- Switch/case statements for color mapping

**Includes:** 8 colored PNG images (red, orange, yellow, green, cyan, blue, pink, purple)

**Run:** Open `p5-custom-pixel-2/index.html` in a browser

---

### 3. p5-custom-pixel-class
**Object-oriented pixel display**

Refactors the advanced pixel display using a `ColorPixel` class, demonstrating how classes can organize complex code into reusable components.

**Key Concepts:**
- Creating and using classes in JavaScript
- Constructor methods and instance properties
- Class methods for update and display logic
- 2D arrays of objects
- Multiple display modes (greyscale, rainbow, image)

**Features:**
- Switch between display modes by uncommenting different display methods
- Clean separation of concerns with class-based architecture

**Run:** Open `p5-custom-pixel-class/index.html` in a browser

---

### 4. p5-simple-clock
**Digital clock with visual indicators**

A complete clock application built with classes, featuring time displays with circular dot indicators that use modulo math to create cycling visual patterns.

**Key Concepts:**
- Building reusable UI components with classes
- Getting time with `hour()`, `minute()`, `second()`
- Using modulo (`%`) for cycling patterns
- Trigonometry for circular layouts (`cos`, `sin`)
- Color cycling and animation

**Features:**
- Hours, minutes, and seconds displays
- Circular dot indicators (max 12 dots per display)
- Color bar that cycles every 10 seconds
- Leading zero formatting with `nf()`

**Run:** Open `p5-simple-clock/index.html` in a browser

---

## Getting Started

### Requirements
- Modern web browser with webcam access (for pixel display examples)
- No build process or dependencies required
- P5.js is loaded from CDN

### Running Examples

1. Clone or download this repository
2. Open any example's `index.html` file in a web browser
3. Grant webcam permissions when prompted (for pixel examples)

### Project Structure

Each example follows this structure:
```
example-name/
├── index.html          # Main HTML file
├── sketch.js           # P5.js sketch code
├── libraries/          # P5.js libraries (included)
│   ├── p5.min.js
│   └── p5.sound.min.js
└── images/             # Assets (for pixel-2 and class examples)
    └── [color].png
```

---

## Core Concepts Explained

### Nested Loops for Grids

Nested loops are essential for working with 2D data:

```javascript
// Outer loop controls rows (y)
for (let y = 0; y < height; y += gridSize) {
  // Inner loop controls columns (x)
  for (let x = 0; x < width; x += gridSize) {
    // Process each grid position
    rect(x, y, gridSize, gridSize);
  }
}
```

### The Pixel Array Formula

Images and video are stored as 1D arrays, but represent 2D data:

```javascript
let offset = (y * capture.width + x) * 4;

let r = capture.pixels[offset];     // Red
let g = capture.pixels[offset + 1]; // Green
let b = capture.pixels[offset + 2]; // Blue
let a = capture.pixels[offset + 3]; // Alpha
```

**Why `(y * width + x) * 4`?**
1. `y * width` - Skip all complete rows
2. `+ x` - Add the column position
3. `* 4` - Each pixel has 4 values (RGBA)

### RGB to Greyscale

Average the RGB values to get brightness:

```javascript
let brightness = (r + g + b) / 3;
```

### RGB to HSB

Map brightness (0-255) to hue angle (0-360°):

```javascript
let brightness = (r + g + b) / 3;
let hsbValue = map(brightness, 0, 255, 0, 360);
```

### Classes in JavaScript

Classes organize related data and functions:

```javascript
class CustomPixel {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  display() {
    rect(this.x, this.y, this.size, this.size);
  }
}

// Create instance
let pixel = new CustomPixel(100, 100, 20);
pixel.display();
```

---

## Performance Tips

### For Pixel Displays

```javascript
// Use lower pixel density
pixelDensity(1);

// Reduce video resolution
let scaleValue = 20;
capture.size(1920 / scaleValue, 1080 / scaleValue);

// Increase grid size (sample fewer pixels)
let gridSize = 2;
```

### Video Mirroring

Flip video horizontally (like Zoom):

```javascript
translate(width, 0);
scale(-1, 1);
```

---

## Common Modifications

### Change Pixel Size

In `p5-custom-pixel/sketch.js`:
```javascript
let pixelSize = 40; // Try 20, 60, 80
```

### Change Color Mode

In `p5-custom-pixel-class/sketch.js`, line 162-164:
```javascript
// Switch between these:
pixelGrid[y][x].displayAsImage();      // Color images
pixelGrid[y][x].displayAsGreyscale();  // Black and white
pixelGrid[y][x].displayAsRainbow();    // HSB rainbow
```

### Adjust Clock Colors

In `p5-simple-clock/sketch.js`, modify the `getCurrentColor()` function's color array (lines 132-139).

---

## Learning Progression

**Start here:** `p5-custom-pixel` - Learn basic pixel sampling and nested loops

**Then try:** `p5-simple-clock` - Learn classes with a simpler example

**Advance to:** `p5-custom-pixel-2` - Add color conversion and image replacement

**Master with:** `p5-custom-pixel-class` - Refactor into object-oriented architecture

---

## P5.js Reference

- [loadPixels()](https://p5js.org/reference/#/p5.Image/loadPixels) - Load pixel data
- [pixels[]](https://p5js.org/reference/#/p5/pixels) - Access pixel array
- [createCapture()](https://p5js.org/reference/#/p5/createCapture) - Access webcam
- [hour(), minute(), second()](https://p5js.org/reference/#/p5/hour) - Get time
- [map()](https://p5js.org/reference/#/p5/map) - Re-map number ranges
- [colorMode()](https://p5js.org/reference/#/p5/colorMode) - Switch RGB/HSB

## Additional Resources

### Video Tutorials
- [Coding Train: Nested Loops](https://www.youtube.com/watch?v=H7frvcAHXps)
- [Coding Train: Pixels](https://www.youtube.com/watch?v=nMUMZ5YRxHI)
- [Coding Train: Classes](https://www.youtube.com/watch?v=T-HGdc8L-7w)

### JavaScript & P5.js
- [Classes (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [P5.js Objects Tutorial](https://p5js.org/examples/objects-objects.html)
- [HSB Color Wheel](http://www.rags-int-inc.com/phototechstuff/acrcalibration/RGB2HSB.html)

---

## Troubleshooting

**Webcam not working?**
- Check browser permissions
- Ensure you're accessing via `http://` or `https://` (not `file://`)
- Try opening DevTools Console (F12) to see errors

**Performance issues?**
- Increase `pixelSize` value
- Increase `gridSize` value
- Reduce video resolution with higher `scaleValue`
- Use `pixelDensity(1)`

**Images not loading?** (p5-custom-pixel-2 and -class)
- Ensure all 8 PNG images are in the `images/` folder
- Check browser console for loading errors
- Verify file paths are correct

---

## Assignment Ideas

### Custom Pixel Display
- Create your own visual style (shapes, patterns, effects)
- Add keyboard controls to switch modes
- Combine multiple visual techniques
- Add color-based interactions (track specific colors)

### Clock Extensions
- Add date display
- Create analog clock hands
- Animate transitions between time values
- Add timezone support
- Create visual countdown timer

### Combine Concepts
- Pixel clock: Time-based pixel effects
- Color-reactive clock: Change based on webcam colors



