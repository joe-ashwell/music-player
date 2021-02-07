import React from "react";
import LibrarySong from "./LibrarySong";
import styled from "styled-components";

const Library = ({
  songs,
  setSongs,
  currentSong,
  setCurrentSong,
  audioRef,
  isPlaying,
  libraryStatus,
}) => {
  return (
    <LibraryDiv libraryStatus={libraryStatus}>
      <h2>Library</h2>
      {songs.map((song) => (
        <LibrarySong
          songs={songs}
          setSongs={setSongs}
          song={song}
          setCurrentSong={setCurrentSong}
          id={song.id}
          key={song.id}
          audioRef={audioRef}
          isPlaying={isPlaying}
          currentSong={currentSong}
        />
      ))}
    </LibraryDiv>
  );
};

const LibraryDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 20rem;
  height: 100%;
  box-shadow: 2px 2px 50px rgb(200, 200, 200);
  overflow: auto;
  transform: translateX(-100%);
  transition: all 0.5s ease;
  opacity: 0;

  ${(props) =>
    props.libraryStatus &&
    `
    transform: translateX(0);
    opacity: 1;
  `}
`;

export default Library;
