import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ libraryStatus, setLibraryStatus }) => {
  return (
    <StyledNav>
      <button onClick={() => setLibraryStatus(!libraryStatus)}>
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  min-height: 10vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  > button {
    font-size: 1.1rem;
    display: flex;
    width: 6rem;
    font-weight: 400;
    justify-content: space-between;
    align-items: center;
    background: white;
    cursor: pointer;
    border: 2px solid #343434;
    padding: 0.5rem;
    margin-right: 10vw;
    transition: all 0.3s ease;
    z-index: 10;
    &:hover {
      background-color: #343434;
      color: white;
    }
  }
`;

export default Nav;
