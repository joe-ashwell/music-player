import React from "react";
import LibrarySong from "./LibrarySong";
import styled from "styled-components";

const Library = ({ songs }) => {
  return (
    <LibraryDiv>
      <h2>Library</h2>
      {songs.map((song) => (
        <LibrarySong song={song} />
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
`;

export default Library;
