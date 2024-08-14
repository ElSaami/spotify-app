import React, { useState, useEffect } from 'react';

const SearchView = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({});
  const [filter, setFilter] = useState("tracks");

  useEffect(() => {
    if (!query) {
      setResults({});
      return;
    }

    const token = window.localStorage.getItem("token");

    const fetchResults = async () => {
      try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track,artist,album`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setResults(data);
        } else {
          console.error("Error al realizar la búsqueda:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error al realizar la búsqueda:", error);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchResults();
    }, 500); // Retardo de 500ms

    return () => clearTimeout(delayDebounceFn); // Limpia el timeout si el usuario sigue escribiendo
  }, [query]);

  return (
    <div className="search-view">
      <input
        type="text"
        placeholder="Buscar canciones, artistas, álbumes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <div className="search-filters">
        <button onClick={() => setFilter("tracks")} className={`filter-button ${filter === "tracks" ? "active" : ""}`}>Canciones</button>
        <button onClick={() => setFilter("artists")} className={`filter-button ${filter === "artists" ? "active" : ""}`}>Artistas</button>
        <button onClick={() => setFilter("albums")} className={`filter-button ${filter === "albums" ? "active" : ""}`}>Álbumes</button>
      </div>
      <div className="search-results">
        {filter === "tracks" && results.tracks && (
          <>
            <h3>Canciones</h3>
            <ul>
              {results.tracks.items.map(track => (
                <li key={track.id}>
                  <img src={track.album.images[0]?.url} alt={track.name} style={{ width: 50, height: 50 }} />
                  <span>{track.name} - {track.artists.map(artist => artist.name).join(", ")}</span>
                </li>
              ))}
            </ul>
          </>
        )}
        {filter === "artists" && results.artists && (
          <>
            <h3>Artistas</h3>
            <ul>
              {results.artists.items.map(artist => (
                <li key={artist.id}>
                  <img src={artist.images[0]?.url} alt={artist.name} style={{ width: 50, height: 50 }} />
                  <span>{artist.name}</span>
                </li>
              ))}
            </ul>
          </>
        )}
        {filter === "albums" && results.albums && (
          <>
            <h3>Álbumes</h3>
            <ul>
              {results.albums.items.map(album => (
                <li key={album.id}>
                  <img src={album.images[0]?.url} alt={album.name} style={{ width: 50, height: 50 }} />
                  <span>{album.name} - {album.artists.map(artist => artist.name).join(", ")}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchView;
