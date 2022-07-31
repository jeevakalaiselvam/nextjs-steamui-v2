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
  gameName,
}) {
  console.log("KANBAN ACHIEVEMENTS ", phase, achievements);
  const router = useRouter();
  const gameId = router.query.gameId;

  const [newAchievements, setNewAchievements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchAchievements, setSearchAchievements] = useState([]);
  const resetIconTitles = () => {
    setNewAchievements((old) => [...old]);
  };

  const searchHandler = (searchData) => {
    setSearchTerm((old) => searchData);
  };

  useEffect(() => {
    setNewAchievements((old) => achievements);
    setSearchAchievements((old) => achievements);
    setSearchTerm((old) => "");
  }, [achievements]);

  useEffect(() => {
    setNewAchievements((old) => achievements);
    setSearchAchievements((old) => achievements);
  }, []);

  useEffect(() => {
    const newInnerAchievements = newAchievements.filter((achievement) =>
      achievement.displayName
        .toLowerCase()
        .trim()
        .includes(searchTerm.toLowerCase().trim())
    );
    setSearchAchievements((old) => newInnerAchievements);
  }, [searchTerm]);

  return (
    <Container>
      <TopContainer>
        <PhaseTitle phase={phase} resetIconTitles={resetIconTitles} />
        <Search searchHandler={searchHandler} opacity="0.75" />
      </TopContainer>
      <AchievementContainer>
        {searchAchievements &&
          searchAchievements.map((achievement) => {
            return (
              <Achievement
                refreshAchievementList={refreshAchievementList}
                achievement={achievement}
                phase={phase}
                gameId={gameId}
                gameName={gameName}
              />
            );
          })}
        {searchAchievements && searchAchievements.length == 0 && (
          <h5 style={{ color: "#fefefe" }}>None</h5>
        )}
      </AchievementContainer>
    </Container>
  );
}
