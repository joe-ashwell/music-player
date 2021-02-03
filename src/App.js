import React, { useState } from "react";
import Song from "./Components/Song";
import Player from "./Components/Player";
import SongData from "./util";
import "./Styles/App.css";

function App() {
  // State -> this basically loads all of the songs as data in the state.
  const [songs, setSongs] = useState(SongData());
  // -> this basically grabs the first song in the list and sets it as current song so there's one ready to go on load
  const [currentSong, setCurrentSong] = useState(songs[0]);

  return (
    <div>
      <Song currentSong={currentSong} />
      <Player />
    </div>
  );
}

export default App;
