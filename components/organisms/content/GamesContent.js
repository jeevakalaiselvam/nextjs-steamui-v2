import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchAllGames } from "../../../helper/apiHelper";
import * as Loaders from "react-spinners";
import GameCard from "../../atoms/GameCard";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const GamesContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`;

export default function GamesContent() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getGames = async () => {
      const gamesData = await fetchAllGames();
      setGames((old) => gamesData);
      setLoading((old) => false);
    };
    getGames();
  }, []);

  return (
    <Container>
      <GamesContainer>
        {!loading &&
          games &&
          games.length > 0 &&
          games.map((game) => {
            return <GameCard game={game} id={game.appid} />;
          })}
        {loading && <Loaders.HashLoader />}
      </GamesContainer>
    </Container>
  );
}
