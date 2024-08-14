import React from 'react';

const Login = () => {
  const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const redirect_uri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
  const scopes = [
    'user-read-private',
    'user-read-email',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-library-read',
  ];

  const handleLogin = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${encodeURIComponent(scopes.join(' '))}&response_type=token&show_dialog=true`;
    window.location.href = authUrl;
  };

  return (
    <div>
      <h1>Spotify Login</h1>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
};

export default Login;
