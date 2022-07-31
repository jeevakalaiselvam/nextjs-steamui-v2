import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 1rem;
`;

const TitleContainer = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  color: #fefefe;
`;

const InputContainer = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  align-items: center;
  justify-content: center;

  & input {
    background-color: rgba(0, 0, 0, 0.5);
    color: #fefefe;
    outline: none;
    border: none;
    text-align: center;
  }
`;

export default function PhaseTitleNormal(props) {
  const { phase, resetIconTitles, title } = props;

  return (
    <Container>
      <TitleContainer show={true}>{title.toUpperCase()}</TitleContainer>
    </Container>
  );
}
