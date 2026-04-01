import { io, type Socket } from "socket.io-client";
import { getSession } from "next-auth/react";

export const socket: Socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "", {
  autoConnect: false,
  transports: ["polling", "websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
  forceNew: true,
  upgrade: true,
  rememberUpgrade: true,
  // path: "/socket.io",
  auth: async (cb) => {
    const session = await getSession();
    const token = session?.accessToken;
    cb({ token });
  },
});
