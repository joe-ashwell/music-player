import React, { useState, useRef } from "react";
import Nav from "./Components/Nav";
import Song from "./Components/Song";
import Player from "./Components/Player";
import SongData from "./data";
import Library from "./Components/Library";
import "./Styles/App.css";

function App() {
  // Ref
  const audioRef = useRef(null);
  // State -> this basically loads all of the songs as data in the state.
  const [songs, setSongs] = useState(SongData());
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  // -> this basically grabs the first song in the list and sets it as current song so there's one ready to go on load
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);

  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: currentTime, duration: duration });
  };

  return (
    <div>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        songs={songs}
        setSongs={setSongs}
      />
      <Library
        songs={songs}
        setSongs={setSongs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        libraryStatus={libraryStatus}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
      {/* onTimeUpdate is a special attribute for the audio tag 
          onLoadedMetaData is also a special attribute for the audio tag
      */}
    </div>
  );
}

export default App;
