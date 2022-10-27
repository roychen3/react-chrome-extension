// import mockComents from './mockComents.json';

export const getCommentsApi = () => {
  // if (process.env.NODE_ENV === 'development') {
  //   return new Promise((resolve) => resolve(mockComents));
  // }

  return fetch('https://jsonplaceholder.typicode.com/comments').then((res) =>
    res.json()
  );
};
