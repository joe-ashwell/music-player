import React from "react";
import styled from "styled-components";

const LibrarySong = ({ song }) => {
  console.log(song);
  return (
    <LibrarySongDiv>
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
