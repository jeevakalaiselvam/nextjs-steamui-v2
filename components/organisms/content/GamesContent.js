import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchAllGames } from "../../../helper/apiHelper";
import * as Loaders from "react-spinners";
import GameCard from "../../atoms/GameCard";

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
  overflow: scroll;
`;

const GamesContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  padding: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  overflow: scroll;
`;

const FilterContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
`;

const SearchContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

export default function GamesContent() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getGames = async () => {
      const gamesData = await fetchAllGames();
      console.log("FETCH GAMES", gamesData);
      setGames((old) => gamesData);
      setLoading((old) => false);
    };
    getGames();
  }, []);

  return (
    <Container>
      <TopBarContainer>
        <FilterContainer>Filter</FilterContainer>
        <SearchContainer>Search</SearchContainer>
      </TopBarContainer>
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
