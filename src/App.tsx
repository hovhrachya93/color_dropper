import { Image } from '@/constants/imagePaths';
import ColorDropper from '@/components/ColorDropper';

const App = (): JSX.Element => {
  return (
    <div className="main">
      <ColorDropper pixelsCount={12} img={Image} />
    </div>
  );
};

export default App;
