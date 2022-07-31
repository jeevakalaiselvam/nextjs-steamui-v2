import React from "react";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  z-index: 100;
  justify-content: space-evenly;
`;

const Button = styled.div`
  display: flex;
  background-color: #3049d1;
  color: #fefefe;
  cursor: pointer;
  width: 20px;
  z-index: 100;
  height: 20px;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.active ? "1" : "0.25")};

  &:hover {
    background: #1e33a6;
    z-index: 100;
  }
`;

export default function PhaseIcons({
  active,
  apiname,
  gameId,
  refreshAchievementList,
}) {
  const changePhase = (phase) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`${gameId}_${apiname}_PHASE`, JSON.stringify(phase));
      refreshAchievementList();
    }
  };

  return (
    <Container>
      <Button
        active={active === 1}
        onClick={() => {
          changePhase(1);
        }}
      >
        1
      </Button>
      <Button
        active={active === 2}
        onClick={() => {
          changePhase(2);
        }}
      >
        2
      </Button>
      <Button
        active={active === 3}
        onClick={() => {
          changePhase(3);
        }}
      >
        3
      </Button>
      <Button
        active={active === 4}
        onClick={() => {
          changePhase(4);
        }}
      >
        4
      </Button>
      <Button
        active={active === 5}
        onClick={() => {
          changePhase(5);
        }}
      >
        5
      </Button>
    </Container>
  );
}
