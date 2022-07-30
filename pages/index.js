import GamesContent from "../components/organisms/content/GamesContent";
import GamesLeftSidebar from "../components/organisms/leftsidebar/GamesLeftSidebar";
import Page from "../components/organisms/Page";

export default function Home() {
  return <Page leftSidebar={<GamesLeftSidebar />} content={<GamesContent />} />;
}
