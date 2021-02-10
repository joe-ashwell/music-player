import React from "react";
import styled from "styled-components";

const LibrarySong = ({
  id,
  song,
  songs,
  setSongs,
  currentSong,
  setCurrentSong,
  audioRef,
  isPlaying,
}) => {
  const songSelectHandler = async () => {
    await setCurrentSong(song);
    // Check if the current song state is playing or if it's paused.
    // Add active state
    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    // Apply the active songs through setSongs
    setSongs(newSongs);
    if (isPlaying) audioRef.current.play();
  };

  return (
    <LibrarySongDiv
      onClick={songSelectHandler}
      currentSong={currentSong}
      song={song}
    >
      <img alt={song.name} src={song.cover}></img>
      <SongDescriptionDiv>
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </SongDescriptionDiv>
    </LibrarySongDiv>
  );
};

const LibrarySongDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  cursor: pointer;
  transition: background 0.5s ease;
  &:hover {
    background-color: #f2e6ff;
  }

  > img {
    width: 30%;
  }

  > h3 {
    padding: 1rem;
  }

  ${(props) =>
    props.song.active &&
    `
    background-color: #e8d4fe;
`}
`;

const SongDescriptionDiv = styled.div`
  padding-left: 1rem;

  > h3 {
    font-size: 1.1rem;
    color: #121212;
    margin-bottom: 0.25rem;
  }

  > h4 {
    font-size: 1rem;
    margin-top: 0.25rem;
  }
`;

export default LibrarySong;
