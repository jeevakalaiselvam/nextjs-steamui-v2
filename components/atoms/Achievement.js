import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  justify-content: center;
  cursor: pointer;
  position: relative;
  color: #fefefe;
  background-color: #171717;
  margin: 0rem 1rem 1rem 0;
  border-radius: 4px;
  padding: 8px;
  &:hover {
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.85);
  }
`;

const AchievementIcon = styled.div`
  background-image: url(${(props) => props.iconURL});
  width: 50px;
  height: 50px;
  background-size: contain;
  display: flex;
  padding: 1rem;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
`;

const MainContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const DataContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const TitleContainer = styled.div`
  display: flex;
  flex: 1;
  color: #eeeeee;
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
  color: #6c6c6e;
  align-items: center;
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
  console.log("RENDERING");
  return (
    <Container>
      <MainContainer>
        <AchievementIcon iconURL={icon} />
        <DataContainer>
          <TitleContainer>{displayName}</TitleContainer>
          <DescriptionContainer>
            {description || hiddenDescription}
          </DescriptionContainer>
        </DataContainer>
      </MainContainer>
    </Container>
  );
}
