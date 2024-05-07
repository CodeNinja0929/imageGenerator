import React, { useCallback, useState } from 'react';
import { useReactFlow } from 'reactflow';
import './Canvas.scss';

export default function PaneContextMenu({top, left, getid, ...props }) {
    const { addNodes, getViewport, getNodes, getNode } = useReactFlow();

    const pasteNode = useCallback((event) => {

        const newNode = JSON.parse(window.localStorage.getItem('copiedNode'));
        if (newNode) {
            const viewPort = getViewport();
            const position = {
                x: 85 - ( viewPort.x - left ) / viewPort.zoom,
                y: 85 - ( viewPort.y - top ) / viewPort.zoom
            };

            addNodes({ ...newNode, id: getid, position });
        }

    });

    return ( 
        <div style={{ top, left }} className="context-menu" {...props}>
            <button onClick={pasteNode}>Paste</button>
            {/* <div className='separtor'></div> */}
        </div>
    );
}
