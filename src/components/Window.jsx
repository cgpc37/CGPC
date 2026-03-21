import React, { useRef } from 'react';
import Draggable from 'react-draggable';

const Window = ({ title, onClose, children, style }) => {
  const nodeRef = useRef(null);

  return (
    <Draggable handle=".title-bar" nodeRef={nodeRef} bounds="parent">
      <div ref={nodeRef} className="window" style={{ position: 'absolute', zIndex: 100, resize: 'both', overflow: 'hidden', minWidth: '300px', minHeight: '200px', display: 'flex', flexDirection: 'column', ...style }}>
        <div className="title-bar" style={{ flexShrink: 0, cursor: 'move' }}>
          <div className="title-bar-text">{title}</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" />
            <button aria-label="Maximize" />
            <button aria-label="Close" onMouseDown={(e) => e.stopPropagation()} onClick={onClose} />
          </div>
        </div>
        <div className="window-body" style={{ flexGrow: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }} onMouseDown={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </Draggable>
  );
};

export default Window;
