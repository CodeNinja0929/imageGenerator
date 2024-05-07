import React, { useEffect, useState, useCallback, MouseEvent, useRef, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useReactFlow,
  ReactFlowProvider,
  Panel,
  useKeyPress,
} from 'reactflow';

import 'reactflow/dist/base.css';
import './Canvas.scss';
import NewControl from './NewControl';
import CustomNode from './CustomNode';
import ImageNode from './ImageNode';
import ContextMenu from './ContextMenu';
import PaneContextMenu from './PaneContextMenu';
import { useAuth } from '@/contexts/AuthProvider';
import { CanvasOption } from '@/containers/AICanvas';
import { ParameterContext } from '@/contexts/ParameterContext';

const nodeTypes = {
  CustomNode,
  ImageNode,
};

let id = 1;
const getid = () => `${id++}`;

let cropPos = { x: 0, y: 0, width: 0, height: 0 };
let nodePos = [],
  cropSrc = [];
let posX = 0,
  posY = 350;
let info = {
  modelId: '',
  model: '',
  model_name: '',
  modelType: '',
  prompt: '',
  negative_prompt: '',
  width: 0,
  height: 0,
  num_outputs: 0,
  steps: 0,
  guidance_scale: 0,
  seed: 0,
  sampler: '',
  vae: '',
};
let undoStack = [];

const FlowProvider = (props) => {
  info = {
    modelId: props.modelId,
    model: props.model,
    model_name: props.modelName,
    modelType: props.modelType,
    negative_prompt: props.negativePrompt,
    width: props.generateFrameWidth,
    height: props.generateFrameHeight,
    num_outputs: props.numberOfImages,
    steps: props.step,
    guidance_scale: props.scale,
    seed: props.seed,
    sampler: props.sampler,
    vae: props.vae,
  };

  const onChange = useCallback((prompt) => {
    info.prompt = prompt;

    GenerateImage(posX, posY, info.width, info.height, prompt);
  });

  const [label, setLabel] = useState('Generation frame');

  const myNode = {
    id: '0',
    position: { x: 0, y: 350 },
    dragHandle: '.custom-drag-handle',
    data: {
      onChange: onChange,
      label: label,
      width: info.width,
      height: info.height,
      numberOfImages: info.num_outputs,
      isGenerating: false,
      prompt: info.prompt,
    },
    deletable: false,
    zIndex: 0,
    style: { border: '2px solid #ff0071', width: '512px', height: '512px' },
    type: 'CustomNode',
  };

  const newNode = {
    id: '1',
    position: { x: 100, y: 350 },
    data: {
      width: 512,
      height: 512,
      url: 'https://storage.googleapis.com/imagineo-ai/generated/img-7c50cbab-2da5-4ba3-8c7e-c925cffc4163.jpg',
    },
    style: { width: '512px', height: '512px', visibility: 'visible' },
    type: 'ImageNode',
  };

  const [nodes, setNodes, onNodesChange] = useNodesState([myNode, newNode]);
  const [genflag, setGenflag] = useState(false);
  const [menu, setMenu] = useState(null);
  const [paneMenu, setPaneMenu] = useState(null);
  const [selectMode, setSelectMode] = useState(false);
  const [visibleNode0, setVisibleNode0] = useState(true);
  const ref = useRef(null);

  const [title, setTitle] = useState();

  // const copyKey = useKeyPress(['Meta+c', 'Control+c']);
  // const pasteKey = useKeyPress(['Meta+v', 'Control+v']);
  // const undoKey = useKeyPress(['Meta+z', 'Control+z']);

  const user = JSON.parse(sessionStorage.getItem('user'));
  const { AuthenticatedFetch } = useAuth();
  const requiredCredit = props.numberOfImages;
  const { getIntersectingNodes, getViewport, setViewport, getNodes, getNode } = useReactFlow();

  const onSave = useCallback(() => {
    try {
    window.localStorage.setItem('my_state', JSON.stringify(getNodes()));
    window.localStorage.setItem('my_viewport', JSON.stringify(getViewport()));
    } catch (err) {
      console.log('You cannot save to localstorage anymore because of limitation of storage!');
    }

    const iid = window.location.href.split('/')[4];

    const postData = {
      name: title,
      user_id: user.id,
      nodes: getNodes(),
      viewport: [getViewport()],
    };

    AuthenticatedFetch('PATCH', `/v1/workspace/${iid}`, postData)
      .then((res) => {
        if (res.status == 200) {
          console.log(res);
        } else {
          alert(res.data.error);
        }
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  });

  const onNodeDrag = useCallback((_, node) => {
    setMenu(null);
    setPaneMenu(null);

    const intersections = getIntersectingNodes(node).map((n) => n.id);

    if (intersections.length) {
      setLabel('Outpainting - Extend image');
    } else {
      setLabel('Generation frame');
    }

    const x = [],
      y = [];
    x.push(node.position.x, node.position.x + node.width);
    y.push(node.position.y, node.position.y + node.height);

    intersections.forEach((id) => {
      x.push(nodePos[id].x, nodePos[id].x + node.width);
      y.push(nodePos[id].y, nodePos[id].y + node.height);
      x.sort((a, b) => a - b);
      y.sort((a, b) => a - b);
      (cropPos.x = x[1]), (cropPos.y = y[1]);
      (cropPos.width = x[2] - x[1]), (cropPos.height = y[2] - y[1]);

      cropSrc[id] = nodePos[id].url;
    });
  }, []);

  const onNodeDragStop = useCallback(() => {
    onSave();
  });

  const onMoveEnd = useCallback(() => {
    onSave();
  });

  const onNodeContextMenu = useCallback(
    (event, node) => {
      event.preventDefault();

      setPaneMenu(null);

      if (node.id == 0) return;

      const pane = ref.current.getBoundingClientRect();

      setMenu({
        id: node.id,
        top: event.clientY - 80,
        left: event.clientX,
      });
    },
    [setMenu]
  );

  const nodeChange = (changes) => {
    onNodesChange(changes);
    setMenu(null);
    setPaneMenu(null);
    nodes.forEach((node) => {
      nodePos[node.id] = { x: node.position.x, y: node.position.y, url: node.data.url };

      if (node.id == '0') {
        props.setGenerateFrameWidth(
          typeof node.style.width === 'number' ? node.style.width : Number(node.style.width.replace(/\D/g, ''))
        );
        props.setGenerateFrameHeight(
          typeof node.style.height === 'number' ? node.style.height : Number(node.style.height.replace(/\D/g, ''))
        );
        props.setPrompt(node.data.prompt);

        node.data.label = label;
        posX = node.position.x;
        posY = node.position.y;
      }
    });
  };

  useEffect(() => {
    const copyNode = async (target) => {
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
    };

    const handleCopy = () => {
      const imgNodes = document.getElementsByClassName(
        'react-flow__node react-flow__node-ImageNode nopan selected selectable'
      );
      if (imgNodes.length > 0) {
        for (var i = 0; i < imgNodes.length; i++) {
          const selected_id = imgNodes[i].getAttribute('data-id');
          const target = getNode(selected_id);
          copyNode(target);
        }
      }
    };

    document.addEventListener('copy', handleCopy);

    return () => {
      document.removeEventListener('copy', handleCopy);
    };
  }, []);

  useEffect(() => {
    const KeyPress = (e) => {
      var evtobj = window.event ? event : e;
      if (evtobj.keyCode == 90 && evtobj.ctrlKey) {

        if (undoStack.length == 0) return;

        const prevState = undoStack.pop();

        setNodes(prevState);
      }
    };

    document.onkeydown = KeyPress;
  }, []);

  useEffect(() => {
    const convertBlobToDataURL = (blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(blob);
      });
    };

    const handlePaste = async (evt) => {
      const clipboardItems = evt.clipboardData.items;
      const items = [].slice.call(clipboardItems).filter(function (item) {
        return item.type.indexOf('image') !== -1;
      });
      if (items.length === 0) {
        return;
      }

      const item = items[0];
      const blob = item.getAsFile();
      const imgUrl = await convertBlobToDataURL(blob);

      const imgBase64 = imgUrl.split(',')[1];

      const img = new Image();
      img.src = imgUrl;
      img.onload = function () {
        const node = getNode('0');
        const newNode = {
          id: `${getNodes().length}`,
          position: node.position,
          data: {
            width: this.width,
            height: this.height,
            url: imgUrl,
            base64: imgBase64,
            prompt: 'This is pasted image, not have prompt...',
          },
          style: {
            visibility: 'visible',
            width: `${this.width}px`,
            height: `${this.height}px`,
          },
          draggable: true,
          type: 'ImageNode',
        };
        setNodes((nds) => nds.concat(newNode));
      };
    };

    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, []);

  useEffect(() => {
    AuthenticatedFetch('GET', `/v1/workspace/${window.location.href.split('/')[4]}`, undefined)
      .then((res) => {
        if (res.status == 200) {
          setTitle(res.data.name);
          setViewport(res.data.viewport ? res.data.viewport[0] : { x: 0, y: 0, zoom: 0.6 });

          const nodes = res.data.nodes;
          if (nodes) {
            nodes.forEach((node) => {
              if (node.id == '0') {
                node.data = { ...node.data, onChange: onChange };
              }
            });
            setNodes((nds) => nds.concat(nodes));
          }
        } else {
          console.log('Error: ', res.data.error);
        }
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  }, []);

  useEffect(() => {
  }, [selectMode, setSelectMode]);

  const onPaneClick = useCallback(
    (event) => {
      event.preventDefault();
      setMenu(null);
      setPaneMenu(null);
    },
    [setMenu]
  );

  const onPaneContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      setMenu(null);
      setPaneMenu({
        top: event.clientY - 80,
        left: event.clientX,
      });
    },
    [setPaneMenu]
  );

  const GenerateImage = async (x, y, width, height, prompt) => {
    if (prompt === '') {
      alert('Insert prompt...');
    } else if (requiredCredit > user.credit) {
      alert('You have to purchase more credit.');
    } else {
      setGenflag(true);
      const id = getid();

      const user = JSON.parse(sessionStorage.getItem('user'));
      const params = JSON.parse(JSON.stringify(info));

      const postData = {
        params: params,
        userId: user.id,
        from: 'canvas',
        credit: requiredCredit,
      };

      await AuthenticatedFetch('POST', '/v1/projects/txt2img', postData)
        .then((res) => {
          if (res.status == 200) {
            sessionStorage.setItem('user', JSON.stringify(res.data.user));
            const url = res.data.image.url;
            const imageData = res.data.imageData;

            const newNode = {
              id: `${getNodes().length}`,
              position: { x: x, y: y },
              data: {
                width: width,
                height: height,
                url: url,
                base64: imageData,
                prompt: prompt,
              },
              style: {
                width: `${width}px`,
                height: `${height}px`,
              },
              draggable: true,
              type: 'ImageNode',
            };
            setNodes((nds) => nds.concat(newNode));

            setNodes((nds) =>
              nds.map((node) => {
                if (node.id == '0') {
                  node.position.x += width + 100;
                }
                return node;
              })
            );
          } else {
            alert(res.data.error);
          }
        })
        .catch((err) => {
          console.error('Error: ', err);
        });
    }
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id == '0') {
          node.data = { ...node.data, isGenerating: false };
        }
        return node;
      })
    );

    setGenflag(false);
  };

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id == '0') {
          node.width = Number(info.width);
          node.style.width = Number(info.width);
          node.height = Number(info.height);
          node.style.height = Number(info.height);
          node.data = {
            ...node.data,
            width: Number(info.width),
            height: Number(info.height),
            numberOfImages: info.num_outputs,
            prompt: info.prompt,
          };
        } else {
          node.data = { ...node.data };
        }
        return node;
      })
    );
  }, [props, setNodes]);

  const onImageFlip = useCallback((id, url, base64) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id == id) {
          node.data.url = url;
          node.data.base64 = base64;
          props.setFlag(!props.flag);
        }
        return node;
      })
    );
  });

  useEffect(() => {
    if (visibleNode0 == false) {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id == '0') node.style.visibility = 'hidden';
          return node;
        })
      );
    } else {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id == '0') {
            node.style.visibility = 'visible';
          }
          return node;
        })
      );
    }

    props.setFlag(!props.flag);
  }, [setVisibleNode0, visibleNode0]);

  const onMouseDownCapture = useCallback((event) => {
    if (event.button == 1) {
      setSelectMode(true);
      setTimeout(() => setSelectMode(false), 100);
    }

    undoStack.push(getNodes());
  });

  const onMouseUpCapture = useCallback((event) => {
    if (event.button == 1) {
      setSelectMode(false);
    }
  });

  return (
    <div style={{ position: 'fixed', width: '100%', height: '90%', top: 0, left: 0, marginTop: '5rem' }}>
      <ParameterContext.Provider value={genflag}>
        <ReactFlow
          ref={ref}
          nodes={nodes}
          onNodesChange={nodeChange}
          defaultViewport={JSON.parse(window.localStorage.getItem('my_viewport')) || { x: 0, y: 0, zoom: 0.6 }}
          nodeTypes={nodeTypes}
          onNodeDrag={onNodeDrag}
          onNodeDragStop={onNodeDragStop}
          onNodeContextMenu={onNodeContextMenu}
          onPaneClick={onPaneClick}
          onPaneContextMenu={onPaneContextMenu}
          onMoveEnd={onMoveEnd}
          onMouseDownCapture={onMouseDownCapture}
          onMouseUpCapture={onMouseUpCapture}
          attributionPosition="bottom-right"
          minZoom={0.05}
          maxZoom={10}
          panOnDrag={selectMode}
          selectionOnDrag={!selectMode}
          panOnScroll
          panOnScrollMode="free"
          zoomOnDoubleClick={false}
          deleteKeyCode="Delete"
        >
          {menu && <ContextMenu onClick={onPaneClick} onImageFlip={onImageFlip} {...menu} />}
          {paneMenu && <PaneContextMenu onClick={onPaneClick} getid={getid()} {...paneMenu} />}
          <Background style={{ backgroundColor: 'rgb(6,0,15)' }} color={'rgb(25,20,35)'} variant="dots" gap={12} size={2} />
          <MiniMap position="bottom-left" zoomStep={1} zoomable pannable />
          <Panel position="top-left">
            <NewControl setSelectMode={setSelectMode} setVisibleNode0={setVisibleNode0} title={title} setTitle={setTitle} />
          </Panel>
        </ReactFlow>
      </ParameterContext.Provider>
    </div>
  );
};

function Flow(props) {
  return (
    <ReactFlowProvider>
      <FlowProvider {...props} />
      <CanvasOption {...props} />
    </ReactFlowProvider>
  );
}

export default Flow;
