import { useRouter } from "next/router";

export function getPlayerName() {
  return localStorage.getItem("playerName");
}

export function getSocketID() {
  return localStorage.getItem("socketID");
}

export function getLobbyNr(): number {
  const router = useRouter();
  return +router.query.lobby;
}
