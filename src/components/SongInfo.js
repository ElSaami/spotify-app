import React from 'react';

const SongInfo = ({ song }) => {
  if (!song) return <div className="song-info">Selecciona una canción para ver los detalles</div>;

  return (
    <div className="song-info">
      <img src={song.album.images[0]?.url} alt={song.name} className="song-image" />
      <h2>{song.name}</h2>
      <h3>{song.artists.map(artist => artist.name).join(', ')}</h3>
    </div>
  );
};

export default SongInfo;
