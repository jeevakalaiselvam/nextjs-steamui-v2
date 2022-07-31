import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { HiSearch } from "react-icons/hi";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Search({ searchHandler }) {
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
    <Container>
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
