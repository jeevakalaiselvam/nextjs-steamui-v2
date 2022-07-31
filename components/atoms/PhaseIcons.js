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
  z-index: 100;
  height: 20px;
  padding: 0.25rem;
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

  let phase1Title = "";
  let phase2Title = "";
  let phase3Title = "";
  let phase4Title = "";
  let phase5Title = "";

  if (typeof window !== "undefined") {
    phase1Title =
      localStorage.getItem(`PHASE_1_TITLE`).toUpperCase() ||
      `PHASE 1`.toUpperCase();
    phase2Title =
      localStorage.getItem(`PHASE_2_TITLE`).toUpperCase() ||
      `PHASE 2`.toUpperCase();
    phase3Title =
      localStorage.getItem(`PHASE_3_TITLE`).toUpperCase() ||
      `PHASE 3`.toUpperCase();
    phase4Title =
      localStorage.getItem(`PHASE_4_TITLE`).toUpperCase() ||
      `PHASE 4`.toUpperCase();
    phase5Title =
      localStorage.getItem(`PHASE_5_TITLE`).toUpperCase() ||
      `PHASE 5`.toUpperCase();
  }

  return (
    <Container>
      <Button
        active={active === 1}
        onClick={() => {
          changePhase(1);
        }}
      >
        {phase1Title}
      </Button>
      <Button
        active={active === 2}
        onClick={() => {
          changePhase(2);
        }}
      >
        {phase2Title}
      </Button>
      <Button
        active={active === 3}
        onClick={() => {
          changePhase(3);
        }}
      >
        {phase3Title}
      </Button>
      <Button
        active={active === 4}
        onClick={() => {
          changePhase(4);
        }}
      >
        {phase4Title}
      </Button>
      <Button
        active={active === 5}
        onClick={() => {
          changePhase(5);
        }}
      >
        {phase5Title}
      </Button>
    </Container>
  );
}
