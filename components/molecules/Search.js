import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { HiSearch } from "react-icons/hi";

const Container = styled.div`
  display: flex;
  align-items: center;
  z-index: 100;
  justify-content: center;
  opacity: ${(props) => props.opacity || 1};
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #171717;
  padding: 0.8rem 1rem;
  border-radius: 8px 0px 0px 8px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & input {
    outline: none;
    padding: 0.5rem;
    width: ${(props) => props.width || "100%"};
    background: #171717;
    color: #9caabe;
    border: none;
    border-radius: 0px 8px 8px 0px;

    &::placeholder {
      color: #9caabe;
    }
  }
`;

export default function Search({ searchHandler, opacity }) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchHandler(searchTerm);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  const searchTermChanged = (e) => {
    const data = e.target.value;
    setSearchTerm((old) => data);
  };

  return (
    <Container opacity={opacity}>
      <IconContainer>
        <HiSearch />
      </IconContainer>
      <InputContainer>
        <input
          type="text"
          value={searchTerm ?? ""}
          onChange={searchTermChanged}
          placeholder="Search..."
        />
      </InputContainer>
    </Container>
  );
}
