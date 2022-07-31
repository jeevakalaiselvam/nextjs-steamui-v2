import React from "react";
import GameContent from "../../../components/organisms/content/GameContent";
import GameLeftSidebar from "../../../components/organisms/leftsidebar/GameLeftSidebar";
import Page from "../../../components/organisms/Page";

export default function Game() {
  return <Page leftSidebar={<GameLeftSidebar />} content={<GameContent />} />;
}
