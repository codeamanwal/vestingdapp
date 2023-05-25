import React from 'react';

const ReleaseTokens = ({ releaseTokens }) => {
  const handleReleaseTokens = () => {
    releaseTokens();
  };

  return (
    <div>
      <h2>Release Tokens</h2>
      <button onClick={handleReleaseTokens}>Release</button>
    </div>
  );
};

export default ReleaseTokens;
