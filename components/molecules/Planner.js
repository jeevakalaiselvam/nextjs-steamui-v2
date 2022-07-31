import React from "react";
import styled from "styled-components";
import { getPhaseFilteredAchievements } from "../../helper/achievementHelper";
import Kanban from "./Kanban";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 95vh;
  max-height: 95vh;
  overflow: hidden;
`;

const KanbanContainer = styled.div`
  display: flex;
  min-height: 95vh;
  max-height: 95vh;
  overflow: hidden;
  align-items: flex-start;
  justify-content: space-evenly;
`;

export default function Planner({ achievements }) {
  return (
    <Container>
      <KanbanContainer>
        <Kanban
          achievements={getPhaseFilteredAchievements(achievements, "PHASE1")}
          title={"PHASE1"}
          phase={1}
        />
      </KanbanContainer>
      <KanbanContainer>
        <Kanban
          achievements={getPhaseFilteredAchievements(achievements, "PHASE1")}
          title={"PHASE2"}
          phase={2}
        />
      </KanbanContainer>
      <KanbanContainer>
        <Kanban
          achievements={getPhaseFilteredAchievements(achievements, "PHASE1")}
          title={"PHASE3"}
          phase={3}
        />
      </KanbanContainer>
      <KanbanContainer>
        <Kanban
          achievements={getPhaseFilteredAchievements(achievements, "PHASE1")}
          title={"PHASE4"}
          phase={4}
        />
      </KanbanContainer>
      <KanbanContainer>
        <Kanban
          achievements={getPhaseFilteredAchievements(achievements, "PHASE1")}
          title={"PHASE5"}
          phase={5}
        />
      </KanbanContainer>
    </Container>
  );
}
