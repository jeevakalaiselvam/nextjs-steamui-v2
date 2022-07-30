import axios from "axios";
import { API_GET_GAMES } from "./urlHelper";

export const fetchAllGames = async () => {
  const response = await axios.get(API_GET_GAMES());
  const games = response.data.data;
  return games;
};
