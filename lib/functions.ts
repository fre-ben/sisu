import { useRouter } from "next/router";

export function getPlayerName(): string {
  return localStorage.getItem("playerName");
}

export function getLobbyNr(): number {
  const router = useRouter();
  return +router.query.lobby;
}
