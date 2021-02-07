import React from "react";
import styled from "styled-components";
import { playAudio } from "../util";

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
  const songSelectHandler = () => {
    setCurrentSong(song);
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
    playAudio(isPlaying, audioRef);
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
  &:hover {
    background-color: #e8d4fe;
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
    font-size: 1rem;
  }

  > h4 {
    font-size: 0.7rem;
  }
`;

export default LibrarySong;
