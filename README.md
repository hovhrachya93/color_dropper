# Color Dropper

### Installation and Running

1. **Install Packages:**
   ```bash
   npm install
2. **Run the Project:**
   ```bash
   npm run start
## About the Project
You can select the dropper icon or use the shortcut with the "d" key. After that, you can move the mouse and see the color of the pixel in the image. On the right side, there is a history section that will show the last 100 colors you can scroll through. If you don't want to select a color, you can use the "c" shortcut key or click on the cursor in the tools section.

## Project Structure
#### Helpers Folder
###### rgbToHex: 
Converts RGB values to a hexadecimal color string.

###### calculateAllPositions:
Calculates the starting position for pixel analysis based on the current mouse position and the pixel count.

#### Hooks Folder
###### useColorDropper:
Manages the state and behavior of the color dropper tool, including mouse movement handling, key event listeners, loading and drawing the image on the canvas, and managing the color history.

#### Constants Folder
Constants:
###### Image: 
Path to the beach image used for the canvas.

###### CANVAS_WIDTH:
Width of the canvas.

###### CANVAS_HEIGHT:
Height of the canvas.

###### POSITION_OFFSET:
Offset for the position of the selector.

###### COLOR_HISTORY_LIMIT:
Maximum number of colors to keep in the history.

###### INITIAL_SELECT_POSITION: 
Initial position for the color selector.

#### Components Folder
###### ToolButton Component:
Shows cursor and dropper icons for tool selection.

###### ColorHistory Component:
Displays the history of the selected colors.

###### Selector Component:
A circular selector for picking colors and includes a table for showing pixel data.

###### ColorDropper Component:
Combines all components and manages the canvas image.
