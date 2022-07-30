import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  flex-direction: row;
  width: 175px;
  cursor: pointer;
  background: ${(props) => {
    if (props.hover && !props.click) {
      return "#3049d1";
    } else if (props.hover && props.click) {
      return "#3049d1";
    } else {
      return "#0d0c0f";
    }
  }};
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

const Title = styled.div`
  display: flex;
  text-align: left;
  flex: 2;
`;

const Icon = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  margin-right: 1rem;
`;

const MenuItem = (props) => {
  const { title, icon, onClick } = props;

  const [hover, setHover] = useState(false);
  const [click, setClick] = useState(false);

  const onItemClick = () => {
    setClick((old) => true);
    onClick();
  };

  return (
    <Container
      click={click}
      hover={hover}
      onMouseEnter={() => {
        setHover((old) => true);
      }}
      onMouseLeave={() => {
        setHover((old) => false);
        setClick((old) => false);
      }}
      onClick={onItemClick}
    >
      <Icon>{icon}</Icon>
      <Title>{title}</Title>
    </Container>
  );
};

export default MenuItem;
