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
  overflow: hidden;
  flex-direction: column;
  margin-right: 0.25rem;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  align-items: center;
  justify-content: center;
`;

const AchievementContainer = styled.div`
  display: flex;
  flex: 1;
  min-height: 95vh;
  max-height: 95vh;
  overflow: scroll;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem;
  flex-direction: column;
`;

export default function Kanban({ title, achievements, phase }) {
  const router = useRouter();
  const gameId = router.query.gameId;

  const [filteredAchievements, setFilteredAchievements] = useState(
    achievements || []
  );
  const [searchFilteredAchievements, setSearchFilteredAchievements] = useState(
    achievements || []
  );
  const [searchTerm, setSearchTerm] = useState("");

  const searchHandler = (searchTerm) => {
    setSearchTerm((old) => searchTerm);
  };

  useEffect(() => {
    const newAchievements = filteredAchievements.filter((achievement) => {
      return achievement.displayName
        .toLowerCase()
        .trim()
        .includes(searchTerm.toLowerCase().trim());
    });
    setSearchFilteredAchievements((old) => newAchievements);
    console.log("SEARCH FILTERED", newAchievements);
  }, [searchTerm]);

  const filterOptionChanged = (filterOption) => {
    console.log("FILTER", filterOption);
  };

  return (
    <Container>
      <TopContainer>
        {/* <Search searchHandler={searchHandler} /> */}
        <PhaseTitle phase={phase} />
      </TopContainer>
      <AchievementContainer>
        {searchFilteredAchievements &&
          searchFilteredAchievements.length &&
          searchFilteredAchievements.map((achievement) => {
            return <Achievement achievement={achievement} />;
          })}
      </AchievementContainer>
    </Container>
  );
}
