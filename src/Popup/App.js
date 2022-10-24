import React from 'react';

import logo from './logo.svg';
import './App.css';

const App = () => {
  const goToOptions = () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/Popup/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
        <button id='go-to-options' onClick={goToOptions}>
          Go to options
        </button>
      </header>
    </div>
  );
};

App.propTypes = {};

export default App;
