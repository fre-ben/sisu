import type { AppProps } from "next/app";
import "../styles/globals.css";
import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [socket, setSocket] = useState<Socket>(null);

  useEffect(() => {
    const newSocket = io();

    newSocket.on("connect", () => {
      setSocket(newSocket);
      console.log(newSocket.id + " connected");
      localStorage.setItem("socketID", newSocket.id);
    });
  }, []);
  return <Component socket={socket} {...pageProps} />;
}

export default MyApp;
