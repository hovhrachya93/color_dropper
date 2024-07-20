import { FC } from 'react';
import { ToolButtonPropsInterface } from './toolButton.types';

const ToolButton: FC<ToolButtonPropsInterface> = ({
  tool,
  selectedTool,
  handleToolClick,
}) => {
  const src =
    tool === 'cursor'
      ? selectedTool === 'cursor'
        ? require('@/assets/cursorSelected.svg').default
        : require('@/assets/cursor.svg').default
      : selectedTool === 'picker'
      ? require('@/assets/IconColorPickerSelected.svg').default
      : require('@/assets/IconColorPicker.svg').default;

  return (
    <img
      onClick={() => handleToolClick(tool)}
      alt={tool}
      src={src}
    />
  );
};

export default ToolButton;
