import OverviewFlow from '../containers/AICanvas/Canvas/Flow';
import '@/containers/AICanvas/Canvas/Canvas.scss';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthProvider';
import { useContext, useEffect, useState } from 'react';

const AICanvas = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const { AuthenticatedFetch } = useAuth();

  const user = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    AuthenticatedFetch('POST', `/v1/workspace/${user.id}`, {user_id: user.id})
      .then((res) => {
        if (res.status == 200) {
          setWorkspaces(res.data);
        } else {
          console.log('Error: ', res.data.error);
        }
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  }, []);

  const handleCreateWorkspace = async () => {
    const postData = {
      name: 'untitled',
      user_id: user.id,
      nodes: [],
      viewport: [],
    };

    AuthenticatedFetch('POST', '/v1/workspace', postData)
      .then((res) => {
        if (res.status == 201) {
          window.location.href = `/aicanvas/${res.data._id}`;
        } else {
          alert(res.data.error);
        }
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  };

  const deleteWorkspace = (event) => {

    const id = event.currentTarget.id;

    AuthenticatedFetch('DELETE', `/v1/workspace/${id}`, undefined)
      .then((res) => {
        if (res.status == 200) {
          const space = document.getElementById(id);
          space.remove();
        } else {
          alert(res.data.error);
        }
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  };

  return (
    <main className="bg-primary text-[#f7f8f8] font-inter">
      <div className="m-10">My Projecs:</div>
      <div className="workspaces ml-10">
        <div className="create-workspace" onClick={handleCreateWorkspace}>
          <svg viewBox="0 0 32 32" fill="#6872ff" stroke="#6872ff" width={70} style={{ margin: 'auto', marginTop: '20%' }}>
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" sketch:type="MSPage">
              <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-464.000000, -1087.000000)" fill="#6872ff">
                <path
                  d="M480,1117 C472.268,1117 466,1110.73 466,1103 C466,1095.27 472.268,1089 480,1089 C487.732,1089 494,1095.27 494,1103 C494,1110.73 487.732,1117 480,1117 L480,1117 Z M480,1087 C471.163,1087 464,1094.16 464,1103 C464,1111.84 471.163,1119 480,1119 C488.837,1119 496,1111.84 496,1103 C496,1094.16 488.837,1087 480,1087 L480,1087 Z M486,1102 L481,1102 L481,1097 C481,1096.45 480.553,1096 480,1096 C479.447,1096 479,1096.45 479,1097 L479,1102 L474,1102 C473.447,1102 473,1102.45 473,1103 C473,1103.55 473.447,1104 474,1104 L479,1104 L479,1109 C479,1109.55 479.447,1110 480,1110 C480.553,1110 481,1109.55 481,1109 L481,1104 L486,1104 C486.553,1104 487,1103.55 487,1103 C487,1102.45 486.553,1102 486,1102 L486,1102 Z"
                  id="plus-circle"
                  sketch:type="MSShapeGroup"
                ></path>
              </g>
            </g>
          </svg>
        </div>
        { workspaces.map((workspace) => (
          <div key={workspace._id} id={workspace._id} className="each-workspace">
            <div className="control-bar">
              <p>
                {workspace.name}
                <button id={workspace._id} onClick={deleteWorkspace}>
                  <svg viewBox="1 1 22 22" fill="currentColor" height="1em" width="1em">
                    <path d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12M8 9h8v10H8V9m7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
                  </svg>
                </button>
              </p>
            </div>
            <Link to={`/aicanvas/${workspace._id}`}>
              <div className="event-handler"></div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
};

export default AICanvas;
