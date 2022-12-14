import React, { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';

import FavoriteColor from './FavoriteColor';

const App = () => {
  const [color, setColor] = useState<string>('');
  const [like, setLike] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('');

  const handleColorChange = (event: any) => {
    setColor(event.target.value);
  };

  const handleLikeChange = (event: any) => {
    setLike(event.target.checked);
  };

  const saveOptions = () => {
    chrome.storage.sync.set(
      {
        favoriteColor: color,
        likesColor: like,
      },
      () => {
        // Update status to let user know options were saved.
        setStatus('Options saved.');
        setTimeout(function () {
          setStatus('');
        }, 750);
      }
    );
  };

  const restoreOptions = () => {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get(
      {
        favoriteColor: '#ffffff',
        likesColor: true,
      },
      (items) => {
        setColor(items.favoriteColor);
        setLike(items.likesColor);
      }
    );
  };

  useEffect(() => {
    restoreOptions();
  }, []);

  return (
    <div className='App'>
      <header className='App-header' style={{ backgroundColor: color }}>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/Options/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
      <FavoriteColor
        color={color}
        like={like}
        status={status}
        handleColorChange={handleColorChange}
        handleLikeChange={handleLikeChange}
        saveOptions={saveOptions}
      />
    </div>
  );
};

App.propTypes = {};

export default App;
