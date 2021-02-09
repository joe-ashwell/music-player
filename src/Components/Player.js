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
  // Add styles
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  return (
    <PlayerDiv>
      <TimeControlDiv>
        <p>{getTime(songInfo.currentTime)}</p>
        <TrackDiv
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
        >
          <input
            type="range"
            min="0"
            // Because the song info doesn't load instantly, the duration can be undefined/null. So default 0.
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
          />
          <AnimateTrackDiv style={trackAnim}></AnimateTrackDiv>
        </TrackDiv>
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

  > p {
    padding: 1rem;
  }
`;

const TrackDiv = styled.div`
  width: 100%;
  height: 0.5rem;
  position: relative;
  border-radius: 1rem;
  overflow: hidden;

  > input {
    width: 100%;
    -webkit-appearance: none;
    background-color: transparent;
    cursor: pointer;
    &:focus {
      outline: none;
    }
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 16px;
      width: 16px;
    }
  }
`;

const AnimateTrackDiv = styled.div`
  background-color: #e3e3e3;
  width: 100%;
  height: 0.5rem;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
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
