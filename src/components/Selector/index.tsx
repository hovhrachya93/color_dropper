import { FC } from 'react';
import Table from '@/components/Table/index';
import { SelectorPropsInterface } from './selector.types';
import './styles.css';

const Selector: FC<SelectorPropsInterface> = ({
  data,
  count,
  color,
  position,
}: SelectorPropsInterface) => {
  return (
    <span
      style={{
        ...position,
        outline: `4px solid ${color}`,
      }}
      className="selector"
    >
      <span className="hash">{color}</span>
      <Table row={count} col={count} data={data} />
    </span>
  );
};

export default Selector;
