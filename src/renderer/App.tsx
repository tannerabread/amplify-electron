import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import { shell } from 'electron';

import { Amplify, Auth, Storage } from 'aws-amplify';
import awsconfig from '../aws-exports';
awsconfig.oauth.redirectSignIn = 'electronApp://';
awsconfig.oauth.redirectSignOut = 'electronApp://';
Amplify.Logger.LOG_LEVEL = 'DEBUG';
Amplify.configure(awsconfig);

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

  // function openExternalTab(url: string) {
  //   shell.openExternal(url);
  // }
  function checkUser() {
    Auth.currentAuthenticatedUser()
      .then((user) => console.log(user))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      {/* window.location works for localhost but not after building */}
      <p>Window.location.host = {window.location.host}</p>
      <div className="Hello">
        <button type="button" onClick={() => Auth.federatedSignIn()}>
          Sign In with Hosted UI
        </button>
        <button
          type="button"
          onClick={() => Auth.federatedSignIn({ provider: 'Google' })}
        >
          Sign In with Google
        </button>
        <button type="button" onClick={checkUser}>
          Check status
        </button>
        <button type="button" onClick={() => Auth.signOut()}>
          Sign Out
        </button>
        {/* <input type="file" onChange={onChangeInputFileHandler} />; */}
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
