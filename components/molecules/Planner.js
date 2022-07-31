import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getPhaseFilteredAchievements } from "../../helper/achievementHelper";
import Kanban from "./Kanban";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 95vh;
  width: 100%;
  z-index: 100;
  max-height: 95vh;
  overflow: hidden;
`;

const KanbanContainer = styled.div`
  display: flex;
  min-height: 95vh;
  width: 100%;
  max-height: 95vh;
  z-index: 100;
  overflow: hidden;
  align-items: flex-start;
  justify-content: space-evenly;
`;

export default function Planner({ achievements, gameId }) {
  console.log("PLANNER ACHIEVEMENTS", achievements);
  const [allAchievements, setAllAchievements] = useState([]);
  const refreshAchievementList = () => {
    console.log("REFRESHING ACHIEVEMENTS");
    setAllAchievements((old) => achievements.map((ach) => ach));
  };

  useEffect(() => {
    setAllAchievements((old) => achievements);
  }, []);

  return (
    <Container>
      <KanbanContainer>
        <Kanban
          achievements={getPhaseFilteredAchievements(
            gameId,
            allAchievements,
            "1"
          )}
          refreshAchievementList={refreshAchievementList}
          title={"PHASE1"}
          phase={1}
          gameId={gameId}
        />
      </KanbanContainer>
      <KanbanContainer>
        <Kanban
          achievements={getPhaseFilteredAchievements(
            gameId,
            allAchievements,
            "2"
          )}
          refreshAchievementList={refreshAchievementList}
          title={"PHASE2"}
          phase={2}
          gameId={gameId}
        />
      </KanbanContainer>
      <KanbanContainer>
        <Kanban
          achievements={getPhaseFilteredAchievements(
            gameId,
            allAchievements,
            "3"
          )}
          refreshAchievementList={refreshAchievementList}
          title={"PHASE3"}
          phase={3}
          gameId={gameId}
        />
      </KanbanContainer>
      <KanbanContainer>
        <Kanban
          achievements={getPhaseFilteredAchievements(
            gameId,
            allAchievements,
            "4"
          )}
          refreshAchievementList={refreshAchievementList}
          title={"PHASE4"}
          phase={4}
          gameId={gameId}
        />
      </KanbanContainer>
      <KanbanContainer>
        <Kanban
          achievements={getPhaseFilteredAchievements(
            gameId,
            allAchievements,
            "5"
          )}
          refreshAchievementList={refreshAchievementList}
          title={"PHASE5"}
          phase={5}
          gameId={gameId}
        />
      </KanbanContainer>
    </Container>
  );
}
