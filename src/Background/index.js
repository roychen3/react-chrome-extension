chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    comments: [],
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.message) {
    case 'SET_COMMENTS': {
      chrome.storage.local.set(
        {
          comments: request.payload,
        },
        () => {
          if (chrome.runtime.lastError) {
            sendResponse({
              message: 'fail',
            });
            return;
          }
          sendResponse({
            message: 'success',
          });
        }
      );
      return true;
    }
    case 'GET_COMMENTS': {
      chrome.storage.local.get('comments', (data) => {
        if (chrome.runtime.lastError) {
          sendResponse({
            message: 'fail',
          });
          return;
        }
        sendResponse({
          message: 'success',
          payload: data.comments,
        });
      });
      return true;
    }

    default: {
      return false;
    }
  }
});
