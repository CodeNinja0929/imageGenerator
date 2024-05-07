import React, { useCallback, useState } from 'react';
import { useReactFlow } from 'reactflow';
import './Canvas.scss';

export default function ContextMenu({ id, top, left, onImageFlip, ...props }) {
  const { getNode, getNodes, setNodes, addNodes } = useReactFlow();

  const duplicateNode = useCallback(() => {
    const node = getNode(id);
    const position = {
      x: node.position.x,
      y: node.position.y,
    };

    addNodes({ ...node, id: `${node.id}-copy`, position });
  }, [id, getNode, addNodes]);

  const lockNode = useCallback(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id == id) {
          node.draggable = !node.draggable;
        }
        return node;
      })
    );
  }, [setNodes]);

  const toBackNode = useCallback(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id == id) {
          node.zIndex = 100;
        }
        return node;
      })
    );
  }, [id, setNodes]);

  const toFrontNode = useCallback(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id == id) {
          node.zIndex = 0;
        }
        return node;
      })
    );
  }, [id, setNodes]);

  const copyNode = useCallback(async () => {
    const node = getNode(id);

    window.localStorage.setItem('copiedNode', JSON.stringify(node));

    const url = 'data:image/png;base64,' + node.data.base64;
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

  const downloadNode = useCallback(async () => {
    const node = getNode(id);

    const url = 'data:image/png;base64,' + node.data.base64;
    const response = await fetch(url);
    const blobImage = await response.blob();
    const href = URL.createObjectURL(blobImage);

    const a = document.createElement('a');
    a.download = 'canvas.png';
    a.href = href;
    a.click();
  });

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
  }, [id, setNodes]);

  const flipHorizontal = useCallback(async () => {
    const node = getNode(id);
    const url = 'data:image/png;base64,' + node.data.base64;
    const response = await fetch(url);
    const blobImage = await response.blob();
    const href = URL.createObjectURL(blobImage);

    const img = new Image();
    img.src = href;
    img.crossOrigin = 'anonymous';
    img.onload = function () {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.height = this.naturalHeight;
      canvas.width = this.naturalWidth;

      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(img, 0, 0);

      const dataUrl = canvas.toDataURL();
      const newBase64 = dataUrl.split(',')[1];

      canvas.toBlob((blob) => {
        const newUrl = URL.createObjectURL(blob);
        onImageFlip(id, newUrl, newBase64);
      });
    };
  }, [id, setNodes]);

  const flipVertical = useCallback(async () => {
    const node = getNode(id);
    const url = 'data:image/png;base64,' + node.data.base64;
    const response = await fetch(url);
    const blobImage = await response.blob();
    const href = URL.createObjectURL(blobImage);

    const img = new Image();
    img.src = href;
    img.crossOrigin = 'anonymous';
    img.onload = function () {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.height = this.naturalHeight;
      canvas.width = this.naturalWidth;

      ctx.translate(0, canvas.height);
      ctx.scale(1, -1);
      ctx.drawImage(img, 0, 0);

      const dataUrl = canvas.toDataURL();
      const newBase64 = dataUrl.split(',')[1];

      canvas.toBlob((blob) => {
        const newUrl = URL.createObjectURL(blob);
        onImageFlip(id, newUrl, newBase64);
      });
    };
  }, [id, setNodes]);

  return (
    <div style={{ top, left }} className="context-menu" {...props}>
      <button onClick={toFrontNode}>Bring to front</button>
      <button onClick={toBackNode}>Send to back</button>
      <button onClick={lockNode}>{getNode(id).draggable ? 'Lock Image' : 'Unlock Image'}</button>
      <div className="separtor"></div>
      <button onClick={flipHorizontal}>Flip Horizontally</button>
      <button onClick={flipVertical}>Flip Vertically</button>
      <div className="separtor"></div>
      <button onClick={copyNode}>Copy</button>
      <button onClick={downloadNode}>Download</button>
      <button onClick={deleteNode}>Delete</button>
    </div>
  );
}
