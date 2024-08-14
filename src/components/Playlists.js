import React, { useEffect, useState } from 'react';

const Playlists = ({ onSelectPlaylist }) => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const token = window.localStorage.getItem("token");

      if (!token) {
        console.error("Token no disponible. Redirigiendo a la página de login.");
        setPlaylists([]);
        return;
      }

      try {
        const response = await fetch('https://api.spotify.com/v1/me/playlists', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 401) {
          console.error("Token inválido o expirado. Redirigiendo a la página de login.");
          window.localStorage.removeItem("token");
          setPlaylists([]);
          // Aquí puedes redirigir al usuario a la página de login si es necesario
        } else if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        } else {
          const data = await response.json();
          if (data && data.items) {
            setPlaylists(data.items);
          } else {
            setPlaylists([]); // Si no se obtienen playlists
          }
        }
      } catch (error) {
        console.error("Error al obtener las playlists:", error);
        setPlaylists([]);
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <div className="playlists">
      <h2>Playlists del Usuario</h2>
      <ul>
        {playlists.map(playlist => (
          <li key={playlist.id} onClick={() => onSelectPlaylist(playlist)}>
            <img src={playlist.images[0]?.url} alt={playlist.name} style={{ width: 50, height: 50 }} />
            <span title={playlist.name}>{playlist.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlists;
