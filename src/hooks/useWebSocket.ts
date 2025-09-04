import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { Zone } from "./useEmployee";

export const useWebSockets = (gateId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
const socket = new WebSocket("ws://localhost:3000/api/v1/ws");

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          type: "subscribe",
          payload: { gateId },
        })
      );
    };

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg.type === "zone-update") {
        queryClient.setQueryData<Zone[]>(["zones"], (oldZones) => {
          if (!oldZones) return oldZones;
          return oldZones.map((z) =>
            z.id === msg.payload.id ? { ...z, ...msg.payload } : z
          );
        });
      }
    };

    return () => {
      socket.close();
    };
  }, [gateId, queryClient]);
};