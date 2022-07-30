import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { HEADER_IMAGE } from "../../helper/urlHelper";
import { HiRefresh } from "react-icons/hi";
import { fetchAllGames, fetchGame } from "../../helper/apiHelper";
import { getFormattedGame } from "../../helper/utilHelper";

const Container = styled.div`
  display: "flex";
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  width: ${(props) => props.width || "300px"};
  height: ${(props) => props.height || "140px"};
  margin: 0.5rem;
  background: url(${(props) => props.image});
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.85);
  }
`;

const Overlay = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  color: #f5b81c;
`;

const RefreshIcon = styled.div`
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 1.25rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: spin 0.5s;
  background-color: ${(props) =>
    props.loading ? "rgba(0, 0, 0, 0)" : "rgba(0, 0, 0, 0.85)"};
  -webkit-animation: ${(props) =>
    props.loading ? "spin 1s linear infinite" : "none"};
  -moz-animation: ${(props) =>
    props.loading ? "spin 1s linear infinite" : "none"};
  animation: ${(props) => (props.loading ? "spin 1s linear infinite" : "none")};

  color: ${(props) => (props.loading ? "#fefefe" : "auto")};

  &:hover {
    color: #fefefe;
  }

  @-moz-keyframes spin {
    100% {
      -moz-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

export default function GameCard(props) {
  const { appid } = props.game;

  const [loading, setLoading] = useState(false);
  const [game, setGame] = useState({});

  const startLoading = () => {
    setLoading((old) => true);
  };

  useEffect(() => {
    if (loading === true) {
      const getGame = async () => {
        const gameData = await fetchGame(appid);
        const formattedGame = getFormattedGame(gameData);
        console.log("FORMATTED GAME", formattedGame);
        setGame((old) => formattedGame);
        setLoading((old) => false);
      };
      getGame();
    }
  }, [loading]);

  return (
    <Container image={HEADER_IMAGE(appid)}>
      <Overlay />
      <RefreshIcon onClick={startLoading} loading={loading}>
        <HiRefresh />
      </RefreshIcon>
    </Container>
  );
}
