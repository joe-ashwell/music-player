import React, { useState } from "react";
import Song from "./Components/Song";
import Player from "./Components/Player";
import SongData from "./util";
import Library from "./Components/Library";
import "./Styles/App.css";

function App() {
  // State -> this basically loads all of the songs as data in the state.
  const [songs, setSongs] = useState(SongData());
  // -> this basically grabs the first song in the list and sets it as current song so there's one ready to go on load
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div>
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <Library songs={songs} setCurrentSong={setCurrentSong} />
    </div>
  );
}

export default App;
