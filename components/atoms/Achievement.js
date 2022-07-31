import React from "react";
import styled from "styled-components";
import { HEADER_IMAGE } from "../../helper/urlHelper";
import PhaseIcons from "./PhaseIcons";
import { HiGlobe } from "react-icons/hi";
import { calculateXPFromPercentage } from "../../helper/achievementHelper";
import { FaTrophy } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: center;
  cursor: pointer;
  position: relative;
  color: #fefefe;
  background: rgba(0, 0, 0, 0.2);
  margin: 0rem 1rem 1rem 0;
  min-height: 175px;
  border-radius: 4px;
  padding: 8px;
  &:hover {
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.85);
  }
`;

const OverlayImage = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.2);
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
  filter: blur(8px);
`;

const Overlay = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.2);
  top: 0px;
  left: 0px;
  border-radius: 4px;
  width: 100%;
  z-index: 20;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: ${(props) => props.color};
`;

const AchievementIcon = styled.div`
  background-image: url(${(props) => props.iconURL});
  width: 50px;
  height: 50px;
  background-size: contain;
  display: flex;
  padding: 1rem;
  align-items: center;
  z-index: 100;
  justify-content: center;
  margin-bottom: 0.5rem;
`;

const MainContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  z-index: 100;
`;

const DataContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  z-index: 100;
  flex-direction: column;
  justify-content: center;
`;

const TitleContainer = styled.div`
  display: flex;
  flex: 1;
  color: #eeeeee;
  z-index: 100;
  padding: 0 8px 8px 8px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  padding: 0 8px 8px 8px;
  color: #e0e0e0;
  z-index: 100;
  align-items: center;
  justify-content: center;
`;

const PhaseContainer = styled.div`
  display: flex;
  width: 40%;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  z-index: 100;
`;

const PercentageContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  padding: 1rem;
  align-items: center;
  flex-direction: column;
  z-index: 100;
  justify-content: center;
`;

const PercentageIcon = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  z-index: 100;
  font-size: 2rem;
  color: #fefefe;
  justify-content: center;
`;

const PercentageData = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  z-index: 100;
  font-size: 1.2rem;
  color: #fefefe;
  justify-content: center;
`;

const XPContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  padding: 1rem;
  display: flex;
  align-items: center;
  z-index: 100;
  flex-direction: column;
  justify-content: center;
`;

const XPIcon = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  z-index: 100;
  font-size: 2rem;
  color: #fefefe;
  justify-content: center;
`;

const XPData = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  z-index: 100;
  color: #fefefe;
  font-size: 1.2rem;
  justify-content: center;
`;

export default function Achievement(props) {
  const {
    achieved,
    apiname,
    description,
    hidden,
    hiddenDescription,
    icon,
    icongray,
    name,
    percent,
    unlocktime,
    displayName,
  } = props.achievement;
  const { phase, gameId, refreshAchievementList } = props;

  return (
    <Container>
      <OverlayImage>
        {/* <InnerOverlayImage imageURL={HEADER_IMAGE(gameId)}></InnerOverlayImage> */}
        <Overlay />
      </OverlayImage>

      <MainContainer>
        <AchievementIcon iconURL={icon} />
        <DataContainer>
          <TitleContainer>{displayName}</TitleContainer>
          <DescriptionContainer>
            {description || hiddenDescription}
          </DescriptionContainer>
        </DataContainer>
      </MainContainer>
      <PhaseContainer>
        <PhaseIcons
          active={phase}
          gameId={gameId}
          apiname={apiname}
          refreshAchievementList={refreshAchievementList}
        />
      </PhaseContainer>
      <PercentageContainer>
        <PercentageIcon>
          <HiGlobe />
        </PercentageIcon>
        <PercentageData>{Math.floor(percent)} %</PercentageData>
      </PercentageContainer>
      <XPContainer>
        <PercentageIcon>
          <FaTrophy />
        </PercentageIcon>
        <PercentageData>{calculateXPFromPercentage(percent)} XP</PercentageData>
      </XPContainer>
    </Container>
  );
}
