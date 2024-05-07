import { memo, useState, useEffect, useCallback } from 'react';
import { Position, NodeToolbar, useNodeId, useReactFlow, NodeResizer } from 'reactflow';
import { BsDownload } from 'react-icons/bs';
import './Canvas.scss';

const MyRegion1 = ({ data, selected }) => {
  const { getNode, setNodes } = useReactFlow();

  const id = useNodeId();
  const target = getNode(id);

  const lockNode = useCallback(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id == id) {
          node.draggable = !node.draggable;
        }
        return node;
      })
    );
  });

  const downloadNode = useCallback(async () => {
    const url = 'data:image/png;base64,' + target.data.base64;
    const response = await fetch(url);
    const blobImage = await response.blob();
    const href = URL.createObjectURL(blobImage);

    const a = document.createElement('a');
    a.download = 'canvas.png';
    a.href = href;
    a.click();
  });

  const copyNode = useCallback(async () => {
    try {
      window.localStorage.setItem('copiedNode', JSON.stringify(target));
    } catch (err) {
      console.log('You cannot save to localstorage because of limiation of storage!');
    }
    const url = 'data:image/png;base64,' + target.data.base64;
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
    } catch (err) {
      console.error(err.name, err.message);
    }
  });

  const copyNodePrompt = useCallback(() => {
    window.localStorage.setItem('copyNodePrompt', target.data.prompt);

    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(target.data.prompt);
    }
  });

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
  });

  return (
    <>
      <NodeToolbar isVisible={selected} position={Position.Top} className="toolbar-menu">
        <span className="btn-left" onClick={lockNode}>
          <svg viewBox="0 0 22 22" fill="currentColor" height="1em" width="1em">
            <path d="M19 7h-2a4 4 0 00-8 0v3h9a3 3 0 013 3v6a3 3 0 01-3 3H6a3 3 0 01-3-3v-6a3 3 0 013-3h1V7a6 6 0 1112 0zm-1 5H6a1 1 0 00-1 1v6a1 1 0 001 1h12a1 1 0 001-1v-6a1 1 0 00-1-1z" />
          </svg>
          <span className="tooltiptext">Lock/Unlock</span>
        </span>

        <span onClick={downloadNode}>
          <svg viewBox="0 0 16 16" fill="currentColor" height="1em" width="1em">
            <path
              fill="currentColor"
              d="M8 9l4-4H9V1H7v4H4zm3.636-1.636l-1.121 1.121L14.579 10 8 12.453 1.421 10l4.064-1.515-1.121-1.121L0 9v4l8 3 8-3V9z"
            />
          </svg>
          <span className="tooltiptext">Download</span>
        </span>

        <span onClick={copyNode}>
          <svg viewBox="0 0 20 20 " fill="currentColor" height="1em" width="1em">
            <path d="M6 6V2c0-1.1.9-2 2-2h10a2 2 0 012 2v10a2 2 0 01-2 2h-4v4a2 2 0 01-2 2H2a2 2 0 01-2-2V8c0-1.1.9-2 2-2h4zm2 0h4a2 2 0 012 2v4h4V2H8v4zM2 8v10h10V8H2z" />
          </svg>
          <span className="tooltiptext">Copy</span>
        </span>

        <span onClick={copyNodePrompt}>
          <svg fill="currentColor" viewBox="0 0 1920 1920" width="1em" height="1em">
            <path d="M0 1919.887h1467.88V452.008H0v1467.88ZM1354.965 564.922v1242.051H112.914V564.922h1242.051ZM1920 0v1467.992h-338.741v-113.027h225.827V112.914H565.035V338.74H452.008V0H1920ZM338.741 1016.93h790.397V904.016H338.74v112.914Zm0 451.062h790.397v-113.027H338.74v113.027Zm0-225.588h564.57v-112.913H338.74v112.913Z"></path>
          </svg>
          <span className="tooltiptext">Copy Prompt</span>
        </span>

        <span className="btn-right" onClick={deleteNode}>
          <svg viewBox="1 1 20 20" fill="currentColor" height="1em" width="1em">
            <path d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12M8 9h8v10H8V9m7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
          </svg>
          <span className="tooltiptext">Delete</span>
        </span>
      </NodeToolbar>
      <img style={{ width: '100%', height: '100%' }} src={data.url} />
    </>
  );
};

export default memo(MyRegion1);
