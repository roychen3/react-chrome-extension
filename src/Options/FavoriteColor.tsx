import React from 'react';

import './App.css';

type FavoriteColorProps = {
  color: string;
  like: boolean;
  status: string;
  handleColorChange: (event: any) => void;
  handleLikeChange: (event: any) => void;
  saveOptions: () => void;
};
const FavoriteColor = ({
  color,
  like,
  status,
  handleColorChange,
  handleLikeChange,
  saveOptions,
}: FavoriteColorProps) => {
  return (
    <div>
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
      <button id='save' onClick={() => saveOptions()}>
        Save
      </button>
    </div>
  );
};

export default FavoriteColor;
