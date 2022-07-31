import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Achievement from "../atoms/Achievement";
import Search from "./Search";
import * as Loaders from "react-spinners";
import PhaseTitle from "../atoms/PhaseTitle";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-height: 95vh;
  max-height: 95vh;
  width: 100%;
  overflow: hidden;
  flex-direction: column;
  margin-right: 0.25rem;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0rem 1rem 1rem 1rem;
  align-items: center;
  justify-content: center;
`;

const AchievementContainer = styled.div`
  display: flex;
  flex: 1;
  min-height: 95vh;
  max-height: 95vh;
  width: 100%;
  overflow: scroll;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem;
  flex-direction: column;
`;

export default function Kanban({
  title,
  achievements,
  phase,
  refreshAchievementList,
}) {
  const router = useRouter();
  const gameId = router.query.gameId;

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAchievements, setFilteredAchievements] = useState(
    achievements || []
  );
  const [searchFilteredAchievement, setSearchFilteredAchievement] = useState(
    achievements || []
  );

  useEffect(() => {
    setFilteredAchievements((old) => achievements.map((ach) => ach));
  }, [achievements]);

  const searchHandler = (searchData) => {
    setSearchTerm((old) => searchData);
  };

  useEffect(() => {
    const newAchievements = filteredAchievements.filter((achievement) => {
      console.log(achievement);
      if (
        achievement.displayName
          .toLowerCase()
          .trim()
          .includes(searchTerm.toLowerCase().trim())
      ) {
        return true;
      }
    });
    setSearchFilteredAchievement((old) => newAchievements);
  }, [searchTerm]);

  return (
    <Container>
      <TopContainer>
        <PhaseTitle phase={phase} />
        <Search searchHandler={searchHandler} opacity="0.75" />
      </TopContainer>
      <AchievementContainer>
        {searchFilteredAchievement &&
          searchFilteredAchievement.map((achievement) => {
            return (
              <Achievement
                refreshAchievementList={refreshAchievementList}
                achievement={achievement}
                phase={phase}
                gameId={gameId}
              />
            );
          })}
        {searchFilteredAchievement && searchFilteredAchievement.length == 0 && (
          <h5 style={{ color: "#fefefe" }}>None</h5>
        )}
      </AchievementContainer>
    </Container>
  );
}
