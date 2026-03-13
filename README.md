# FCFsimples

A simple website for designing customizable plushies.

## Features

- Choose from different plushie types (bear, rabbit, cat, dog)
- Select colors (pink, blue, green, yellow)
- Add accessories (hat, scarf, bow)
- Preview your custom plushie with a generated image that displays the chosen options

## Image generation

The **Preview** button will create an image showing the selections you made (type, color, accessory). If you provide an OpenAI API key it will attempt to fetch a realistic plushie image; otherwise a simple local placeholder image is drawn using SVG assets from the `images/` folder.

## Usage

Open `index.html` in a web browser to start customizing your plushie.

## Files

- `index.html`: Main HTML file
- `styles.css`: CSS styles
- `script.js`: JavaScript for interactivity
- `images/`: Folder containing SVG placeholder images for plushie types and accessories