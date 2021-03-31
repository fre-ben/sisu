import { useRouter } from "next/router";

export function getPlayerName(): string {
  return localStorage.getItem("playerName");
}

export function getSocketID(): string {
  return localStorage.getItem("socketID");
}

export function getLobbyNr(): number {
  const router = useRouter();
  return +router.query.lobby;
}
