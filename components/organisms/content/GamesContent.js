import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchAllGames } from "../../../helper/apiHelper";
import * as Loaders from "react-spinners";
import GameCard from "../../atoms/GameCard";
import Search from "../../molecules/Search";
import Filter from "../../molecules/Filter";
import { GAMES_FILTER_OPTIONS } from "../../../helper/filterHelper";

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

const GamesContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-start;
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
  const [searchFilteredGames, setSearchFilteredGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getGames = async () => {
      const gamesData = await fetchAllGames();
      setGames((old) => gamesData);
      setSearchFilteredGames((old) => gamesData);
      setLoading((old) => false);
    };
    getGames();
  }, []);

  const searchHandler = (searchTerm) => {
    setSearchTerm((old) => searchTerm);
  };

  useEffect(() => {
    const newFilteredGames = games.filter((game) => {
      return game.gameName
        .toLowerCase()
        .trim()
        .includes(searchTerm.toLowerCase().trim());
    });
    setSearchFilteredGames((old) => newFilteredGames);
  }, [searchTerm]);

  const filterOptionChanged = (filterOption) => {};

  return (
    <Container>
      <TopBarContainer>
        <FilterContainer>
          <Filter
            filterOptions={GAMES_FILTER_OPTIONS}
            filterOptionChanged={filterOptionChanged}
          />
        </FilterContainer>
        <SearchContainer>
          <Search searchHandler={searchHandler} />
        </SearchContainer>
      </TopBarContainer>
      <GamesContainer>
        {!loading &&
          searchFilteredGames &&
          searchFilteredGames.length > 0 &&
          searchFilteredGames.map((game) => {
            return <GameCard game={game} id={game.appid} />;
          })}
        {loading && <Loaders.HashLoader />}
      </GamesContainer>
    </Container>
  );
}
