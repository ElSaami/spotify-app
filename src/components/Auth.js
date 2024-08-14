import React, { useEffect } from 'react';

const Auth = () => {
  const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const redirect_uri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
  const scopes = 'user-read-private user-read-email';

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find(elem => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    // Aquí podrías agregar más lógica, como guardar el refresh token
  }, []);

  const handleLogin = () => {
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes}&response_type=token&show_dialog=true`;
  };

  return (
    <div>
      <h1>Spotify Auth</h1>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
};

export default Auth;
