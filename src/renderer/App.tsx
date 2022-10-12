import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';

import { Amplify, Auth, Storage } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure({ ...awsconfig, aws_mandatory_sign_in: false });

const Hello = () => {
  const onChangeInputFileHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files![0];
    try {
      await Storage.put(file.name, file, {
        contentType: 'image/png',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <button
          type="button"
          onClick={() => Auth.signIn('bannonta@amazon.com', 'testtest2')}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={async () =>
            console.log(await Auth.currentAuthenticatedUser())
          }
        >
          Check status
        </button>
        <input type="file" onChange={onChangeInputFileHandler} />;
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
