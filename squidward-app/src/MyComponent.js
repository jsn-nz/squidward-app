// src/MyComponent.js
import React from 'react';

const MyComponent = () => {
  return (
    <div>
      <img src={`${process.env.PUBLIC_URL}/angry.png`} alt="Description" />
    </div>
  );
};

export default MyComponent;
