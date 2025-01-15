import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { getPb } from "@/db/pb";
import { useCallback, useEffect, useState } from "react";
import { ChatsResponse } from "@/types/pocketbase-types";
import { ListResult } from "pocketbase";

export const Route = createFileRoute("/chats")({
  component: PocketChats,
  ssr: false,
  // loader: async () => getPbChats(),
});

export default function PocketChats() {
  const [chats, setChats] = useState<ChatsResponse[]>([]);

  const getChatWithUsers = async () => {
    const chatResponse = await getPb().collection("chats").getFullList<ChatsResponse>(200, {
      sort: "created",
      expand: "users",
      // filter: `users ~ '${$currentUser.id}'`,
    });

    // const response = await fetch("http://localhost:2511/api/collections/chats/records");
    // const chatResponse = (await response.json()) as ListResult<ChatsResponse>;

    console.log({ chatResponse });

    setChats(chatResponse);
  };

  useEffect(() => {
    getChatWithUsers().catch((err) => console.error(err));

    getPb()
      .collection("chats")
      .subscribe("*", (data) => {
        console.log({ data });
        getChatWithUsers().catch((err) => console.error(err));
      });

    return () => {
      getPb().collection("chats").unsubscribe();
    };
  }, []);

  return (
    <div className="pb-chats p-4">
      <h1 className="text-3xl text-primary">Chats</h1>

      <div className="grid grid-cols-3 gap-4">
        {chats.map((chat) => (
          <div key={chat.id} className="mt-2 border p-4 rounded-xl">
            <h2 className="text-xl text-secondary">{chat.title}</h2>
            <div className="text-sm text-gray-500">
              {chat.users.map((user) => (
                <div key={user}>{user}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
