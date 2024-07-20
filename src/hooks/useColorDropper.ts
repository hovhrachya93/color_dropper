import { useCallback, useEffect, useRef, useState } from 'react';
import { calculateAllPositions, rgbToHex } from '@/helpers/index';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  POSITION_OFFSET,
  COLOR_HISTORY_LIMIT,
  INITIAL_SELECT_POSITION,
} from '@/constants/canvasConstants';
import { SelectPositionInterface } from '@/components/ColorDropper/colorDropper.types';

export const useColorDropper = (img: string, pixelsCount: number) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [data, setData] = useState<number[]>([]);
  const [color, setColor] = useState<string>('#000000');
  const [selectPosition, setSelectPosition] = useState<SelectPositionInterface>(
    INITIAL_SELECT_POSITION
  );
  const [isSelector, setIsSelector] = useState<boolean>(false);
  const [selectedTool, setSelectedTool] = useState<'cursor' | 'picker'>(
    'cursor'
  );
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);
  const [colorHistory, setColorHistory] = useState<
    { id: string; hex: string; name: string }[]
  >([]);

  const coordinatesRef = useRef<{
    x: number;
    y: number;
    SX: number;
    SY: number;
  }>({
    x: 0,
    y: 0,
    SX: 0,
    SY: 0,
  });

  const handleMousemove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!loadedImage || !isSelector) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const context = e.currentTarget.getContext('2d');
      if (!context) return;

      const pixelData = context.getImageData(x, y, 1, 1).data;
      const hex = `#${rgbToHex(
        pixelData[0],
        pixelData[1],
        pixelData[2]
      ).padStart(6, '0')}`;
      setColor(hex);

      const colorName = `Color ${colorHistory.length + 1}`;

      setColorHistory((prevHistory) => [
        { id: `${hex}-${Date.now()}`, hex, name: colorName },
        ...prevHistory.slice(0, COLOR_HISTORY_LIMIT - 1),
      ]);

      const { startPosition } = calculateAllPositions(x, y, pixelsCount);
      const { x: SX, y: SY } = startPosition;
      const imageData = context.getImageData(
        SX,
        SY,
        pixelsCount,
        pixelsCount
      ).data;
      setData(Array.from(imageData));
      setSelectPosition({
        top: y - POSITION_OFFSET,
        left: x - POSITION_OFFSET,
      });

      coordinatesRef.current = { x, y, SX, SY };
    },
    [loadedImage, pixelsCount, colorHistory.length, isSelector]
  );

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'c') {
      setIsSelector(false);
      setSelectedTool('cursor');
    } else if (e.key === 'd') {
      setIsSelector(true);
      setSelectedTool('picker');
    }
  }, []);

  useEffect(() => {
    const loadImg = new Image();
    loadImg.src = img;
    loadImg.onload = () => setLoadedImage(loadImg);
  }, [img]);

  useEffect(() => {
    if (loadedImage && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      context?.drawImage(loadedImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
  }, [loadedImage]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleToolClick = useCallback((tool: 'cursor' | 'picker') => {
    setIsSelector(tool === 'picker');
    setSelectedTool(tool);
  }, []);

  return {
    data,
    color,
    canvasRef,
    isSelector,
    selectedTool,
    colorHistory,
    selectPosition,
    handleMousemove,
    handleToolClick,
  };
};
