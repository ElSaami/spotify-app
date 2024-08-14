import React, { useEffect, useState } from 'react';

const MainView = ({ playlist, onSelectSong }) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (playlist) {
      const fetchTracks = async () => {
        const token = window.localStorage.getItem("token");
        let allTracks = [];
        let url = playlist.tracks.href;

        while (url) {
          const response = await fetch(url, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          const data = await response.json();
          allTracks = [...allTracks, ...data.items];
          url = data.next; // Actualiza la URL para obtener la siguiente página de resultados
        }

        setTracks(allTracks);
      };

      fetchTracks();
    }
  }, [playlist]);

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="main-view">
      {playlist ? (
        <>
          <div className="playlist-header">
            <img 
              src={playlist.images[0]?.url} 
              alt={playlist.name} 
              className="playlist-image"
            />
            <div>
              <h2>{playlist.name}</h2>
              {playlist.description && <p className="playlist-description">{playlist.description}</p>}
            </div>
          </div>
          <table className="track-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Título</th>
                <th>Álbum</th>
                <th>Duración</th>
              </tr>
            </thead>
            <tbody>
              {tracks.map((trackItem, index) => (
                <tr key={index} className="track-item" onClick={() => onSelectSong(trackItem.track)}>
                  <td>{index + 1}</td>
                  <td className="track-info">
                    <img 
                      src={trackItem.track.album.images[0]?.url} 
                      alt={trackItem.track.name} 
                      className="track-image"
                    />
                    <div>
                      <a href={trackItem.track.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="track-name">
                        {trackItem.track.name}
                      </a><br />
                      <span className="track-artists">
                        {trackItem.track.artists.map((artist, i) => (
                          <React.Fragment key={artist.id}>
                            <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                              {artist.name}
                            </a>
                            {i < trackItem.track.artists.length - 1 && ', '}
                          </React.Fragment>
                        ))}
                      </span>
                    </div>
                  </td>
                  <td>
                    <a href={trackItem.track.album.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                      {trackItem.track.album.name}
                    </a>
                  </td>
                  <td>{formatDuration(trackItem.track.duration_ms)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <h2>Selecciona una playlist para ver su contenido</h2>
      )}
    </div>
  );
};

export default MainView;
