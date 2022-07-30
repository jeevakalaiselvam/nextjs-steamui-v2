import React from "react";
import styled from "styled-components";
import { HEADER_IMAGE } from "../../helper/urlHelper";

const Container = styled.div`
  display: "flex";
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  width: ${(props) => props.width || "250px"};
  height: ${(props) => props.height || "120px"};
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

export default function GameCard(props) {
  const { appid } = props.game;
  return (
    <Container image={HEADER_IMAGE(appid)}>
      <Overlay />
    </Container>
  );
}
