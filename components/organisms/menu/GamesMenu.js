import React from "react";
import styled from "styled-components";
import MenuItem from "../../atoms/MenuItem";
import {
  HiViewGrid,
  HiAdjustments,
  HiRefresh,
  HiEye,
  HiChartBar,
} from "react-icons/hi";
import { useRouter } from "next/router";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function GamesMenu() {
  const router = useRouter();

  return (
    <Container>
      <MenuItem
        title="Games"
        icon={<HiViewGrid />}
        onClick={() => {
          router.push("/");
        }}
      />
    </Container>
  );
}
