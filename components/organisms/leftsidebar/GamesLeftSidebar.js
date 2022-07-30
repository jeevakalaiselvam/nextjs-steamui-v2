import React from "react";
import styled from "styled-components";
import Profile from "../../atoms/Profile";
import GamesMenu from "../menu/GamesMenu";

const Container = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const GamesLeftSidebar = (props) => {
  return (
    <Container>
      <Profile />
      <GamesMenu />
    </Container>
  );
};

export default GamesLeftSidebar;
