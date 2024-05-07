import { useReactFlow } from 'reactflow';
import './Canvas.scss';
import { useRef } from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import { useState } from 'react';

const NewControl = ({ setSelectMode, setVisibleNode0, title, setTitle }) => {
  const inputRef = useRef(null);
  const { addNodes, getNode, getNodes, setNodes, project, getViewport } = useReactFlow();
  const { AuthenticatedFetch } = useAuth();

  const [isSelected, setIsSelected] = useState(3);

  const user = JSON.parse(sessionStorage.getItem('user'));

  const handleFileChange = async (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(fileObj);
    reader.onload = function () {
      const imgUrl = reader.result;
      const imgBase64 = imgUrl.split(',')[1];

      const image = new Image();
      image.src = imgUrl;
      image.onload = function () {
        const id = getNodes().length;

        const node = getNode('0');
        const newNode = {
          id: `${id}`,
          position: node.position,
          data: {
            width: this.width,
            height: this.height,
            url: imgUrl,
            base64: imgBase64,
            prompt: 'This is uploaded image, not have prompt...',
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
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

    event.target.value = null;
  };

  const importImage = () => {
    inputRef.current.click();
  };

  const selectionMode = () => {
    setSelectMode(false);
    setVisibleNode0(false);
    setIsSelected(1);
  };

  const dragMode = () => {
    setSelectMode(true);
    setVisibleNode0(false);
    setIsSelected(2);
  };

  const editMode = () => {
    setSelectMode(false);
    setVisibleNode0(true);
    setIsSelected(3);
  };

  const saveScreen = () => {
    const id = window.location.href.split('/')[4];

    window.localStorage.removeItem('my_state');
    window.localStorage.removeItem('my_viewport');

    const postData = {
      name: title,
      user_id: user.id,
      nodes: getNodes(),
      viewport: [getViewport()],
    };

    AuthenticatedFetch('PATCH', `/v1/workspace/${id}`, postData)
      .then((res) => {
        if (res.status == 200) {
          window.location.href = '/aicanvas';
        } else {
          alert(res.data.error);
        }
      })
      .catch((err) => {
        console.error('Error: ', err);
      });

    window.location.href = '/aicanvas';
  };

  const changeTitle = (event) => {
    const id = window.location.href.split('/')[4];

    setTitle(event.currentTarget.value);

    const postData = {
      name: event.currentTarget.value,
      user_id: user.id,
      nodes: getNodes(),
      viewport: [getViewport()],
    };

    AuthenticatedFetch('PATCH', `/v1/workspace/${id}`, postData)
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
  };

  return (
    <>
      <div style={{ textAlign: 'center', height: '50px', border: '1px solid #fff1', borderRadius: '5px' }}>
        <input
          type="text"
          placeholder="Title"
          defaultValue={title}
          style={{ background: 'none', textAlign: 'center', height: '90%' }}
          onBlur={changeTitle}
        />
      </div>

      <div className='control-menu'>
        <input type="file" style={{ display: 'none' }} accept="image/*" ref={inputRef} onChange={handleFileChange} />
        <span className="btn-left" onClick={importImage}>
          <svg fill="none" viewBox="0 0 24 24" height="1.3em" width="1.3em" strokeLinecap="round" strokeLinejoin="round">
            <path fill="currentColor" d="M5 9.982v10h14v-10h-4v-2h6v14H3v-14h6v2H5z" />
            <path
              fill="currentColor"
              d="M13 2h-2v12.053l-2.535-2.536-1.415 1.415 4.95 4.95 4.95-4.95-1.414-1.415L13 14.053V2z"
            />
          </svg>
          <span className="tooltiptext">Upload Image</span>
        </span>

        <span onClick={selectionMode} className={ `${isSelected === 1 ? 'active' : ''}` }>
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            height="1.3em"
            width="1.3em"
          >
            <path d="M4 4l7.07 17 2.51-7.39L21 11.07z" />
          </svg>
          <span className="tooltiptext">Select Mode</span>
        </span>

        <span onClick={dragMode} className={ `${isSelected === 2 ? 'active' : ''}` }>
          <svg viewBox="0 0 512 512" fill="currentColor" height="1.3em" width="1.3em">
            <path d="M408 80c-3.994 0-7.91.326-11.73.955-9.586-28.51-36.57-49.11-68.27-49.11a71.9 71.9 0 00-18.68 2.457C296.6 13.73 273.9 0 248 0s-48.7 13.79-61.4 34.44c-5.9-1.59-12.1-2.44-18.5-2.44-39.7 0-72.09 32.3-72.09 72v121.6c-5.24-1-10.6-1.6-16-1.6-.003 0 .003 0 0 0C36.43 224 0 259.2 0 304.1c0 20.29 7.558 39.52 21.46 54.45l81.25 87.24C141.9 487.9 197.4 512 254.9 512h33.08C393.9 512 480 425.9 480 320V152c0-39.7-32.3-72-72-72zm24 240c0 79.41-64.59 144-143.1 144h-34c-44.41 0-86.83-18.46-117.1-50.96l-79.76-85.63c-6.202-6.659-9.406-15.4-9.406-23.1 0-22.16 18.53-31.4 31.35-31.4 8.56 0 17.1 3.416 23.42 10.18l26.72 28.69c1.676.92 3.776 1.62 5.776 1.62 4.106 0 8.064-3.172 8.064-8.016V104c0-13.25 10.75-24 23.1-24 13.25 0 23.1 10.75 23.1 24v152C192 264.8 199.2 272 208 272s15.1-7.163 15.1-15.1L224 72c0-13.25 10.75-24 23.1-24 13.25 0 23.1 10.75 23.1 24v184c1.8 8.8 9 16 17.8 16s15.99-7.164 15.99-15.1l.008-152.2c0-13.25 10.75-24 23.1-24 13.25 0 23.1 10.75 23.1 24v152.2C352 264.8 359.2 272 368 272s15.1-7.163 15.1-15.1V152c0-13.25 10.75-24 23.1-24 13.25 0 23.1 10.75 23.1 24v168z" />
          </svg>
          <span className="tooltiptext">Drag Mode</span>
        </span>

        <span onClick={editMode} className={ `${isSelected === 3 ? 'active' : ''}` }>
          <svg viewBox="0 0 24 24" fill="currentColor" height="1.3em" width="1.3em">
            <path d="M21.04 12.13c.14 0 .27.06.38.17l1.28 1.28c.22.21.22.56 0 .77l-1 1-2.05-2.05 1-1c.11-.11.25-.17.39-.17m-1.97 1.75l2.05 2.05L15.06 22H13v-2.06l6.07-6.06M11 19l-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h4.18C9.6 1.84 10.7 1 12 1c1.3 0 2.4.84 2.82 2H19c1.1 0 2 .9 2 2v4l-2 2V5h-2v2H7V5H5v14h6m1-16c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" />
          </svg>
          <span className="tooltiptext">Edit Mode</span>
        </span>

        {/* <button className="control-menu">
        <svg viewBox="0 0 512 512" fill="currentColor" height="1.3em" width="1.3em">
          <path d="M256 32C114.6 32 .027 125.1.027 240c0 47.63 19.91 91.25 52.91 126.2-14.88 39.5-45.87 72.88-46.37 73.25-6.625 7-8.375 17.25-4.625 26C5.818 474.2 14.38 480 24 480c61.5 0 109.1-25.75 139.1-46.25 28 9.05 60.2 14.25 92.9 14.25 141.4 0 255.1-93.13 255.1-208S397.4 32 256 32zm.1 368c-26.75 0-53.12-4.125-78.38-12.12l-22.75-7.125-19.5 13.75c-14.25 10.12-33.88 21.38-57.5 29 7.375-12.12 14.37-25.75 19.88-40.25l10.62-28-20.62-21.87C69.82 314.1 48.07 282.2 48.07 240c0-88.25 93.25-160 208-160s208 71.75 208 160S370.8 400 256.1 400z" />
        </svg>
        <span className="tooltiptext">Comment</span>
      </button> */}

        <span className='btn-right' onClick={saveScreen}>
          <svg fill="#ffffff" height="1.3em" width="1.3em" viewBox="0 0 26.676 26.676" stroke="#ffffff">
            <path d="M26.105,21.891c-0.229,0-0.439-0.131-0.529-0.346l0,0c-0.066-0.156-1.716-3.857-7.885-4.59 c-1.285-0.156-2.824-0.236-4.693-0.25v4.613c0,0.213-0.115,0.406-0.304,0.508c-0.188,0.098-0.413,0.084-0.588-0.033L0.254,13.815 C0.094,13.708,0,13.528,0,13.339c0-0.191,0.094-0.365,0.254-0.477l11.857-7.979c0.175-0.121,0.398-0.129,0.588-0.029 c0.19,0.102,0.303,0.295,0.303,0.502v4.293c2.578,0.336,13.674,2.33,13.674,11.674c0,0.271-0.191,0.508-0.459,0.562 C26.18,21.891,26.141,21.891,26.105,21.891z"></path>{' '}
          </svg>
          <span className="tooltiptext">Go my project</span>
        </span>
      </div>
    </>
  );
};

export default NewControl;
