import React, { useEffect } from "react";
import styled from "styled-components";
import { playAudio } from "../util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleRight,
  faAngleLeft,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  audioRef,
  setCurrentSong,
  currentSong,
  isPlaying,
  setIsPlaying,
  setSongInfo,
  songInfo,
  songs,
  setSongs,
}) => {
  // To initiate change when the user skips song
  useEffect(() => {
    const newSongs = songs.map((song) => {
      if (song.id === currentSong.id) {
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
    // This is invoked whenever the current song is updated.
  }, [currentSong]);
  // Event Handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    setSongInfo({ ...songInfo, currentTime: e.target.value });
    audioRef.current.currentTime = e.target.value;
  };

  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      setCurrentSong(songs[(currentIndex += 1)] || songs[0]);
    } else if (direction === "skip-back") {
      if (currentIndex - 1 === -1) {
        setCurrentSong(songs[songs.length - 1]);
        playAudio(isPlaying, audioRef);
        return;
      }
      setCurrentSong(songs[(currentIndex -= 1)] || songs[songs.length - 1]);
    }
    playAudio(isPlaying, audioRef);
  };

  return (
    <PlayerDiv>
      <TimeControlDiv>
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          type="range"
          min="0"
          // Because the song info doesn't load instantly, the duration can be undefined/null. So default 0.
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragHandler}
        />
        <p>{songInfo.duration ? getTime(songInfo.duration) : `0:00`}</p>
      </TimeControlDiv>
      <PlayControlDiv>
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          className="play"
          onClick={playSongHandler}
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          size="2x"
          icon={faAngleRight}
        />
      </PlayControlDiv>
    </PlayerDiv>
  );
};

const PlayerDiv = styled.div`
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const TimeControlDiv = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > input {
    width: 100%;
    padding: 1rem 0;
  }

  > p {
    padding: 1rem;
  }
`;

const PlayControlDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  width: 30%;

  > svg {
    cursor: pointer;
  }
`;

export default Player;
