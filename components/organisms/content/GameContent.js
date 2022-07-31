import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchAllGames, fetchGame } from "../../../helper/apiHelper";
import * as Loaders from "react-spinners";
import GameCard from "../../atoms/GameCard";
import Search from "../../molecules/Search";
import Filter from "../../molecules/Filter";
import {
  GAMES_FILTER_OPTIONS,
  GAME_VIEWMODE_JOURNAL,
  GAME_VIEWMODE_OPTION,
  GAME_VIEWMODE_PLANNER,
} from "../../../helper/filterHelper";
import { useRouter } from "next/router";
import { formatAchievements } from "../../../helper/achievementHelper";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  max-height: 100vh;
`;

const TopBarContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const ViewModeContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
`;

const PlannerContainer = styled.div`
  display: ${(props) => (props.active ? "flex" : "none")};
  flex: 1;
  align-items: flex-start;
  padding: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  overflow: scroll;
`;

const JournalContainer = styled.div`
  display: ${(props) => (props.active ? "flex" : "none")};
  flex: 1;
  align-items: flex-start;
  padding: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  overflow: scroll;
`;

export default function GamesContent() {
  const [game, setGame] = useState([]);
  const [viewMode, setViewMode] = useState(GAME_VIEWMODE_PLANNER);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const gameId = router.query.gameId;

  useEffect(() => {
    const getGame = async () => {
      const gamesData = await fetchGame(gameId);
      console.log("FETCH GAME", gamesData);
      setGame((old) => gamesData);
      setLoading((old) => false);
    };
    if (gameId) {
      getGame();
    }
  }, [loading, gameId]);

  const {
    gameName,
    globalAchievements,
    hiddenAchievements,
    playerAchievements,
    schemaAchievements,
  } = game;

  const formattedAchievements = formatAchievements(
    schemaAchievements,
    globalAchievements,
    playerAchievements,
    hiddenAchievements
  );
  console.log("FORMATTED ACHIEVEMENTS", formattedAchievements);

  return (
    <Container>
      <TopBarContainer>
        <ViewModeContainer>
          <Filter
            filterOptionChanged={(viewOption) => {
              setViewMode((old) => viewOption);
            }}
            filterOptions={GAME_VIEWMODE_OPTION}
          />
        </ViewModeContainer>
      </TopBarContainer>
      <PlannerContainer active={viewMode === GAME_VIEWMODE_PLANNER}>
        {loading && <Loaders.HashLoader />}
        {!loading && <h1>Planner</h1>}
      </PlannerContainer>
      <JournalContainer active={viewMode === GAME_VIEWMODE_JOURNAL}>
        {loading && <Loaders.HashLoader />}
        {!loading && <h1>Journal</h1>}
      </JournalContainer>
    </Container>
  );
}