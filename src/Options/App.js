import React, { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';

const App = () => {
  const [color, setColor] = useState('');
  const [like, setLike] = useState(false);
  const [status, setStatus] = useState('');

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleLikeChange = (event) => {
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
      Favorite color:
      <select id='color' value={color} onChange={handleColorChange}>
        <option value='#ffffff'>ffffff</option>
        <option value='#5f6a82'>5f6a82</option>
        <option value='#2c313c'>2c313c</option>
        <option value='#282c34'>282c34</option>
        <option value='#1c1d20'>1c1d20</option>
        <option value='#00a1f1'>00a1f1</option>
        <option value='#00527a'>00527a</option>
        <option value='#23282e'>23282e</option>
      </select>
      <label>
        <input
          type='checkbox'
          id='like'
          checked={like}
          onChange={handleLikeChange}
        />
        I like colors.
      </label>
      <div id='status'>{status}</div>
      <button id='save' onClick={saveOptions}>
        Save
      </button>
    </div>
  );
};

App.propTypes = {};

export default App;
