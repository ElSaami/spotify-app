import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Playlists from './components/Playlists';
import MainView from './components/MainView';
import SearchView from './components/SearchView';
import SongInfo from './components/SongInfo';
import Player from './components/Player';
import Login from './components/Login';
import './App.css';

function App() {
  const [token, setToken] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null); // Nuevo estado para la canción seleccionada
  const [view, setView] = useState("home");

  useEffect(() => {
    const hash = window.location.hash;
    let _token = window.localStorage.getItem("token");

    if (!_token && hash) {
      _token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", _token);
    }

    setToken(_token);
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setToken(null);
  };

  const handlePlaylistSelect = (playlist) => {
    setSelectedPlaylist(playlist);
    setView("home");
  };

  const handleSongSelect = (song) => {
    setSelectedSong(song); // Actualiza la canción seleccionada
  };

  const renderView = () => {
    switch (view) {
      case "home":
        return <MainView playlist={selectedPlaylist} onSelectSong={handleSongSelect} />;
      case "search":
        return <SearchView />;
      default:
        return <MainView playlist={selectedPlaylist} />;
    }
  };

  return (
    <div className="App">
      {!token ? (
        <Login />
      ) : (
        <>
          <Sidebar onLogout={handleLogout} setView={setView} />
          <Playlists onSelectPlaylist={handlePlaylistSelect} />
          {renderView()}
          <SongInfo song={selectedSong} /> {/* Pasamos la canción seleccionada a SongInfo */}
          <Player />
        </>
      )}
    </div>
  );
}

export default App;
