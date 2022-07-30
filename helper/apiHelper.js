import axios from "axios";
import { API_GET_GAME, API_GET_GAMES } from "./urlHelper";

export const fetchAllGames = async (gameI) => {
  const response = await axios.get(API_GET_GAMES());
  const games = response.data.data;
  return games;
};

export const fetchGame = async (gameId) => {
  const response = await axios.get(API_GET_GAME(gameId));
  const game = response.data;
  return game;
};
