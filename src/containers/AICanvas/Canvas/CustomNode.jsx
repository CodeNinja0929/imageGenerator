import { memo, useState, useEffect, useContext } from 'react';
import { Handle, Position, NodeResizer, NodeResizeControl, NodeToolbar, useNodeId } from 'reactflow';
import { ParameterContext } from '@/contexts/ParameterContext.jsx';
import { BeatLoader } from 'react-spinners';

const MyRegion = ({ data, selected }) => {
  const [aiString, setAIString] = useState('');
  const genFlag = useContext(ParameterContext);

  const generateImage = () => {
    data.onChange(aiString);
  };

  const clearPrompt = (event) => {
    if (event.code === 'Delete') {
      setAIString('');
    }
  }

  const onWheel = (event) => {
    event.currentTarget.blur();
    event.stopPropagation();
  }

  useEffect(() => {
    console.log('Selected Node...');

  }, [selected]);

  return (
    <>
      <NodeResizer
        color="#ff5071"
        handleStyle={{ width: '15px', height: '15px' }}
        lineStyle={{ display: 'none' }}
        isVisible={selected}
        minWidth={256}
        minHeight={256}
        maxWidth={1024}
        maxHeight={1024}
      />

      {selected && (
        <div
          style={{ width: '100%', height: '100%', position: 'absolute', backgroundColor: 'rgba(255,255,255,0.05)' }}
        ></div>
      )}

      <BeatLoader
        className="px-4 py-4"
        color="pink"
        loading={genFlag}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />

      <div
        className="custom-drag-handle"
        style={{ width: '100%', height: '100%', position: 'absolute', backgroundColor: 'rgba(255,255,255,0.00)' }}
      ></div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          fontSize: '24px',
          position: 'absolute',
          bottom: '100%',
        }}
      >
        <div style={{ padding: 10, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{data.label}</div>
        <div style={{ padding: 10 }}>{data.width + 'x' + data.height}</div>
      </div>

      {selected && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 20px)',
            width: '800px',
            borderRadius: '15px',
            border: '2px solid rgb(50, 50, 70)',
            backgroundColor: 'rgb(30, 25, 40)',
          }}
        >
          <textarea
            className={'focus-visible:outline-[0px]'}
            style={{
              background: 'none',
              color: '#ebebeb',
              fontSize: '28px',
              width: '100%',
              height: '200px',
              borderBottom: '2px solid rgb(50, 50, 70)',
              resize: 'none',
              padding: '0px 25px 0px 25px',
              marginTop: '25px',
            }}
            onWheelCapture={onWheel}
            onMouseDown={onWheel}
            value={aiString}
            onChange={(e) => {
              setAIString(e.target.value);
            }}
            onKeyDown={clearPrompt}
          />
          <div className="flex flex-col p-3 items-end">
            <button
              className="font-semibold bg-blue-500 text-white px-8 py-4 rounded-md text-[24px] hover:opacity-70 [transition:.24s_ease-in-out]"
              onClick={generateImage}
              disabled={genFlag}
            >
              {data.label.includes('Outpaint') ? 'Outpaint' : 'Generate'}
            </button>
          </div>
        </div>
      )}

      {/* <NodeToolbar isVisible={selected} position={Position.Top}>
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 20px)',
            width: '800px',
            borderRadius: '15px',
            border: '2px solid rgb(50, 50, 70)',
            backgroundColor: 'rgb(30, 25, 40)',
          }}
        >
          <textarea
            className={'focus-visible:outline-[0px]'}
            style={{
              background: 'none',
              color: '#ebebeb',
              fontSize: '28px',
              width: '100%',
              height: '200px',
              borderBottom: '2px solid rgb(50, 50, 70)',
              resize: 'none',
              padding: '0px 25px 0px 25px',
              marginTop: '25px',
            }}
            value={aiString}
            onChange={(e) => {
              setAIString(e.target.value);
            }}
            onKeyDown={clearPrompt}
          />
          <div className="flex flex-col p-3 items-end">
            <button
              className="font-semibold bg-blue-500 text-white px-8 py-4 rounded-md text-[24px] hover:opacity-70 [transition:.24s_ease-in-out]"
              onClick={generateImage}
              disabled={genFlag}
            >
              {data.label.includes('Outpaint') ? 'Outpaint' : 'Generate'}
            </button>
          </div>
        </div>
      </NodeToolbar>\
       */}
      {new Array(data.numberOfImages - 1).fill(0).map((_, i) => (
        <div
          className={`bg-[#ffffff2b] absolute w-full h-full`}
          style={{ left: `${(data.width + 10) * (i + 1)}px` }}
          key={i}
        />
      ))}
    </>
  );
};

export default memo(MyRegion);
