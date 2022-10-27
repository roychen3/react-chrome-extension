import React, { useState, useEffect } from 'react';

import { getCommentsApi } from './apis/index.js';
import {
  getCommentsFromStorage,
  setCommentsToStorage,
} from '../Background/actions/index.js';

import jsonPlaceholderImg from './images/jsonPlaceholder.png';

const App = () => {
  const [commentsSource, setCommentsSource] = useState('');
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsError, setCommentsError] = useState('');

  useEffect(() => {
    if (comments.length === 0) {
      setCommentsSource('api');
      setCommentsLoading(true);
      getCommentsApi()
        .then((res) => {
          setComments(res);
          setCommentsToStorage(res);
        })
        .catch((error) => {
          setCommentsError(error.message);
        })
        .finally(() => {
          setCommentsLoading(false);
        });
    }
  }, [comments]);

  useEffect(() => {
    setCommentsLoading(true);
    getCommentsFromStorage()
      .then((data) => {
        setComments(data);
        setCommentsSource('local storage');
      })
      .finally(() => {
        setCommentsLoading(false);
      });
  }, []);

  return (
    <div>
      <h1 className="logo">
        <div className='icon-box'>
          <img src={jsonPlaceholderImg} />
        </div>
        <span>JSONPlaceholder</span>
      </h1>

      {commentsLoading ? (
        'loading..'
      ) : commentsError ? (
        commentsError
      ) : (
        <>
          <p>data source: {commentsSource}</p>

          <div className="card-container">
            {comments.map((item) => (
              <div key={item.id} className="card">
                <div className="name">{item.name}</div>
                <div className="body">{item.body}</div>
                <div className="email">{item.email}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

App.propTypes = {};

export default App;
