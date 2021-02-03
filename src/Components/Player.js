import React, { useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleRight,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
  // Ref
  const audioRef = useRef(null);
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

  return (
    <PlayerDiv>
      <TimeControlDiv>
        <p>Start time</p>
        <input type="range" />
        <p>End time</p>
      </TimeControlDiv>
      <PlayControlDiv>
        <FontAwesomeIcon className="left" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon
          className="play"
          onClick={playSongHandler}
          size="2x"
          icon={faPlay}
        />
        <FontAwesomeIcon className="right" size="2x" icon={faAngleRight} />
      </PlayControlDiv>
      <audio ref={audioRef} src={currentSong.audio}></audio>
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
    padding: 1rem 2rem;
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
