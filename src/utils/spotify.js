export const refreshToken = async () => {
  const refreshToken = window.localStorage.getItem("refresh_token");

  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', refreshToken);
  params.append('client_id', process.env.REACT_APP_SPOTIFY_CLIENT_ID);
  params.append('client_secret', process.env.REACT_APP_SPOTIFY_CLIENT_SECRET);

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  });

  const data = await response.json();
  window.localStorage.setItem("token", data.access_token);
  return data.access_token;
};
