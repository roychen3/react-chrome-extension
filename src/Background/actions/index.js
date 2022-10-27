export const setCommentsToStorage = (payload) => {
  if (process.env.NODE_ENV === 'development') {
    return new Promise((resolve) => resolve(null));
  }

  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      {
        message: 'SET_COMMENTS',
        payload,
      },
      (response) => {
        if (response.message === 'success') {
          resolve('success');
        } else {
          reject(response);
        }
      }
    );
  });
};
export const getCommentsFromStorage = () => {
  if (process.env.NODE_ENV === 'development') {
    return new Promise((resolve) => resolve([]));
  }

  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      {
        message: 'GET_COMMENTS',
      },
      (response) => {
        if (response.message === 'success') {
          resolve(response.payload);
        } else {
          reject(response);
        }
      }
    );
  });
};
