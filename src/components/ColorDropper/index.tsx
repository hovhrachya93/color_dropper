import { FC } from 'react';
import Selector from '@/components/Selector';
import ToolButton from '@/components/ToolButton';
import ColorHistory from '@/components/ColorHistory';
import { useColorDropper } from '@/hooks/useColorDropper';
import { ColorDropperPropsInterface } from './colorDropper.types';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '@/constants/canvasConstants';
import './styles.css';

const ColorDropper: FC<ColorDropperPropsInterface> = ({ img, pixelsCount }) => {
  const {
    data,
    color,
    canvasRef,
    isSelector,
    selectedTool,
    colorHistory,
    selectPosition,
    handleMousemove,
    handleToolClick,
  } = useColorDropper(img, pixelsCount);

  return (
    <div className="container">
      <div>
        <span className="picker-text picker-text-gradinted">Color</span>
        <span className="picker-text">Picker</span>
      </div>
      <div className="main">
        <div className="tools">
          <h3>Tools</h3>
          <ToolButton
            tool="cursor"
            selectedTool={selectedTool}
            handleToolClick={handleToolClick}
          />
          <ToolButton
            tool="picker"
            selectedTool={selectedTool}
            handleToolClick={handleToolClick}
          />
        </div>
        <div className="image-section">
          {isSelector && (
            <Selector
              count={pixelsCount}
              color={color}
              position={selectPosition}
              data={data}
            />
          )}
          <canvas
            onMouseMove={handleMousemove}
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
          />
          <span className="shortcut-info">
            <strong>*</strong>For shortcuts: Select Dropper with{' '}
            <strong>"d"</strong> key and Cursor with <strong>"c"</strong> key
          </span>
        </div>
        <ColorHistory colorHistory={colorHistory} />
      </div>
    </div>
  );
};

export default ColorDropper;
