import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import DraggableColorBox from './DraggableColorBox';

// props coming from NewPaletteForm
const DraggableColorList = SortableContainer(({ colors, removeColor }) => {
  return (
    <div style={{ height: '100%' }}>
      {colors.map((color, i) => (
        <DraggableColorBox
          index={i}
          key={color.name}
          color={color.color}
          name={color.name}
          handleClick={() => removeColor(color.name)}
        />
      ))}
    </div>
  );
});

export default DraggableColorList;
// export default SortableContainer(DraggableColorList);
