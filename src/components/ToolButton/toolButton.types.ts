export interface ToolButtonPropsInterface {
  tool: 'cursor' | 'picker';
  selectedTool: 'cursor' | 'picker';
  handleToolClick: (tool: 'cursor' | 'picker') => void;
}
