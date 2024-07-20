import { FC } from 'react';
import { ColorHistoryPropsInterface } from './colorHistory.types';
import './styles.css';

const ColorHistory: FC<ColorHistoryPropsInterface> = ({ colorHistory }) => {
  return (
    <div className="history-section">
      <h3>Color History</h3>
      <div className="color-history">
        {colorHistory.map((colorItem) => (
          <div
            className="color-swatch"
            style={{ backgroundColor: colorItem.hex }}
            key={colorItem.id}
          >
            {colorItem.hex}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorHistory;
