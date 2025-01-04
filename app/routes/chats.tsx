import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { getPb } from "@/db/pb";
import { useCallback, useEffect, useState } from "react";
import { ChatsResponse } from "@/types/pocketbase-types";

export const Route = createFileRoute("/chats")({
  component: PocketChats,
  // loader: async () => getPbChats(),
});

export default function PocketChats() {
  const [chats, setChats] = useState<any[]>([]);
  const [isInitialRender, setIsInitialRender] = useState(true);

  const getChatWithUsers = useCallback(async () => {
    const chats = await getPb().collection("chats").getList();
    // .getFullList<ChatsResponse>(200, {
    //   sort: "created",
    //   expand: "users",
    //   // filter: `users ~ '${$currentUser.id}'`,
    // });
    setIsInitialRender(false);
    // setChats(chats.items);
  }, []);

  useEffect(() => {
    getChatWithUsers().catch((err) => console.error(err));

    // return () => {
    //   getPb().collection("chats").unsubscribe();
    // };
  }, [getChatWithUsers, isInitialRender]);

  return (
    <div className="pb-chats p-4">
      <h1 className="text-3xl text-primary">Chats</h1>
    </div>
  );
}
