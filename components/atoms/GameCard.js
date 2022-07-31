import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { HEADER_IMAGE } from "../../helper/urlHelper";
import { HiRefresh } from "react-icons/hi";
import { fetchGame } from "../../helper/apiHelper";
import { getFormattedGame } from "../../helper/utilHelper";
import { MdIncompleteCircle } from "react-icons/md";
import { HiClock, HiCollection } from "react-icons/hi";
import { FaTrophy } from "react-icons/fa";
import { getAllXPFromAchievements } from "../../helper/achievementHelper";
import { useRouter } from "next/router";

const Container = styled.div`
  display: ${(props) => (props.visible ? "flex" : "none")};
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

const Title = styled.div`
  display: ${(props) => (props.visible ? "flex" : "none")};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0.85);
  color: #fefefe;
  left: 0px;
  width: 100%;
  padding: 0.5rem 1rem;
  max-height: 50px;
  &:hover {
    color: #3049d1;
  }
`;

const CompletionContainer = styled.div`
  position: absolute;
  display: ${(props) => (props.visible ? "flex" : "none")};
  top: 0;
  padding: 1rem;
  left: 0;
  transition: all 0.5s;
  background-color: rgba(0, 0, 0, 0.85);
  transform: translateX(${(props) => (props.showIcons ? "0%" : "-100%")});
`;

const ToGetContainer = styled.div`
  position: absolute;
  display: "flex";
  flex-direction: column;
  top: 0;
  left: 0;
  padding: 1rem;
  transition: all 0.5s;
  background-color: rgba(0, 0, 0, 0.85);
  transform: translateX(${(props) => (props.showIcons ? "0%" : "100%")});
`;

const ToGetIcon = styled.div`
  display: flex;
  align-items: center;
  color: #f1b51b;
  font-size: ${(props) => props.iconSize || "2rem"};
  justify-content: center;
`;

const ToGetData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f1b51b;
  font-size: ${(props) => props.textSize || "1.5rem"};
`;

const XPContainer = styled.div`
  position: absolute;
  top: 0;
  padding: 1rem;
  left: 50%;
  transition: all 0.3s;
  background-color: rgba(0, 0, 0, 0.85);
  flex-direction: column;
  display: ${(props) => (props.showIcons ? "flex" : "none")};
  transform: translate(-50%, ${(props) => (props.showIcons ? "0%" : "-100%")});
`;

const XPIcon = styled.div`
  display: flex;
  align-items: center;
  color: #fefefe;
  font-size: ${(props) => props.iconSize || "2.25rem"};
  justify-content: center;
`;

const XPData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.textSize || "1.25rem"};
  color: #fefefe;
`;

const RefreshIconContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 0;
  font-size: 1.25rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: spin 0.5s;
  background-color: rgba(0, 0, 0, 0.85);
`;

const RefreshIcon = styled.div`
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: spin 0.5s;
  -webkit-animation: ${(props) =>
    props.loading ? "spin 1s linear infinite" : "none"};
  -moz-animation: ${(props) =>
    props.loading ? "spin 1s linear infinite" : "none"};
  animation: ${(props) => (props.loading ? "spin 1s linear infinite" : "none")};

  color: ${(props) => (props.loading ? "green" : "auto")};

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
  const { appid, gameName, playerAchievements, total, completed, remaining } =
    props.game;
  const [showIcons, setShowIcons] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formattedAchievements, setFormattedAchievements] = useState([]);

  const { totalXP, completedXP, remainingXP } = getAllXPFromAchievements(
    formattedAchievements
  );

  const startLoading = () => {
    setLoading((old) => true);
  };

  useEffect(() => {
    if (loading === true) {
      const getGame = async () => {
        const gameData = await fetchGame(appid);
        const formattedGame = getFormattedGame(gameData);
        console.log("FORMATTED GAME", formattedGame);
        setFormattedAchievements((old) => formattedGame);
        setLoading((old) => false);
      };
      getGame();
    }
  }, [loading]);

  const router = useRouter();

  return (
    <Container
      image={HEADER_IMAGE(appid)}
      visible={gameName?.length !== 0 || false}
    >
      <Overlay />
      <Title
        visible={gameName?.length !== 0 ?? false}
        onClick={() => {
          router.push(`/games/${appid}`);
        }}
      >
        {gameName}
      </Title>
      <ToGetContainer showIcons={showIcons}>
        <ToGetIcon>
          <FaTrophy />
        </ToGetIcon>
        <ToGetData visible={playerAchievements?.length || false}>
          {remaining}
        </ToGetData>
      </ToGetContainer>
      <RefreshIconContainer>
        <RefreshIcon onClick={startLoading} loading={loading}>
          <HiRefresh />
        </RefreshIcon>
      </RefreshIconContainer>{" "}
      <XPContainer showIcons={totalXP !== 0}>
        <XPIcon>
          <HiCollection />
        </XPIcon>
        <XPData>{remainingXP} XP</XPData>
      </XPContainer>
    </Container>
  );
}
