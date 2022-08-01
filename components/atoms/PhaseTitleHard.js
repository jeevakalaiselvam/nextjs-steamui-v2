import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  TYPE_EVERY,
  TYPE_MONTH,
  TYPE_TODAY,
  TYPE_WEEK,
} from "../../helper/constantHelper";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 1rem;
  cursor: pointer;
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
  const { phase, resetIconTitles, title, changeRecentlyUnlockedType } = props;

  const options = [
    { type: TYPE_TODAY, title: "Today" },
    { type: TYPE_WEEK, title: "Today" },
    { type: TYPE_MONTH, title: "Today" },
    { type: TYPE_EVERY, title: "Today" },
  ];

  const [currentActive, setCurrentActive] = useState;

  return (
    <Container
      onClick={() => {
        changeRecentlyUnlockedType(TYPE_WEEK);
      }}
    >
      <TitleContainer show={true}>{title.toUpperCase()}</TitleContainer>
    </Container>
  );
}
