import { FC } from 'react';
import { rgbToHex } from '@/helpers/index';
import { TablePropsInterface } from './selector.types';
import './styles.css';

const Table: FC<TablePropsInterface> = ({ row, col, data }: TablePropsInterface) => {
  return (
    <table className="table">
      <tbody>
        {[...Array(row)].map((_, y) => {
          return (
            <tr key={`key-${y}`} className="tr">
              {[...Array(col)].map((_, x) => {
                const hex =
                  '#' +
                  (
                    '000000' +
                    rgbToHex(
                      data[(y * col + x) * 4],
                      data[(y * col + x) * 4 + 1],
                      data[(y * col + x) * 4 + 2]
                    )
                  ).slice(-6);
                return (
                  <td
                    key={`key-${y}-${x}`}
                    className={`${
                      y === Math.trunc(row / 2) && x === Math.trunc(col / 2)
                        ? 'primary'
                        : ''
                    } td`}
                    style={{
                      background: hex,
                    }}
                  />
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
