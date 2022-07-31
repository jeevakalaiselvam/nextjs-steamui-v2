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
import Planner from "../../molecules/Planner";
import { HEADER_IMAGE } from "../../../helper/urlHelper";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;
  z-index: 100;
  justify-content: flex-start;
  min-height: 100vh;
  max-height: 100vh;
`;

const OverlayImage = styled.div`
  position: absolute;
  background: url(${(props) => props.imageURL});
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: contain;
  justify-content: center;
  color: ${(props) => props.color};
`;

const InnerOverlayImage = styled.div`
  width: 100%;
  height: 100%;
  background: url(${(props) => props.imageURL});
  background-size: cover;
  background-repeat: no-repeat;
  filter: blur(20px);
`;

const TopBarContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 1rem;
  flex-wrap: wrap;
  z-index: 100;
  opacity: 0.5;
  min-height: 5vh;
  max-height: 5vh;
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
  padding: 0.5rem 1rem 1rem 1rem;
  min-height: 95vh;
  width: 100%;
  max-height: 95vh;
  flex-wrap: wrap;
  overflow: hidden;
  justify-content: center;
`;

const JournalContainer = styled.div`
  display: ${(props) => (props.active ? "flex" : "none")};
  flex: 1;
  align-items: flex-start;
  padding: 1rem;
  flex-wrap: wrap;
  justify-content: center;
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

  return (
    <Container imageURL={HEADER_IMAGE(gameId)}>
      <OverlayImage>
        <InnerOverlayImage imageURL={HEADER_IMAGE(gameId)}></InnerOverlayImage>
      </OverlayImage>
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
        {!loading && (
          <Planner achievements={formattedAchievements} gameId={gameId} />
        )}
      </PlannerContainer>
      <JournalContainer active={viewMode === GAME_VIEWMODE_JOURNAL}>
        {loading && <Loaders.HashLoader />}
        {!loading && <h1>Journal</h1>}
      </JournalContainer>
    </Container>
  );
}
