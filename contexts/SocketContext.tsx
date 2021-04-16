import { createContext, ReactNode, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket;
};

export const SocketContext = createContext<SocketContextType>(null);

type SocketContextProviderProps = {
  children: ReactNode;
};

export function SocketContextProvider({
  children,
}: SocketContextProviderProps) {
  const [socket, setSocket] = useState<Socket>(null);

  useEffect(() => {
    const newSocket = io();

    newSocket.on("connect", () => {
      setSocket(newSocket);
      console.log(newSocket.id + " connected");
    });
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
