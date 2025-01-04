import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { getPb } from "@/db/pb";
import { useEffect } from "react";

export const Route = createFileRoute("/pbtest")({
  component: PocketUsers,
  loader: async () => getTestData(),
});

// NOTE - we need to either be authenticated or the viewing rules must be set to allow anonymous access for this to work
const getPbUsers = createServerFn({ method: "GET" }).handler(async () => {
  const users = await getPb().collection("users").getList();
  console.log({ users }, users.items.length);
  return users;
});

const getPbChats = createServerFn({ method: "GET" }).handler(async () => {
  const chats = await getPb().collection("chats").getList();
  console.log({ chats }, chats.items.length);
  return chats;
});

const getPbMessages = createServerFn({ method: "GET" }).handler(async () => {
  const msgs = await getPb().collection("messages").getList();
  console.log({ msgs }, msgs.items.length);
  return msgs;
});

const getPbHealth = createServerFn({ method: "GET" }).handler(async () => {
  const health = await getPb().health.check();
  return health;
});

const getTestData = createServerFn({ method: "GET" }).handler(async () => {
  const users = await getPbUsers();
  const chats = await getPbChats();
  const msgs = await getPbMessages();
  const health = await getPbHealth();
  return { users, chats, msgs, health };
});

export default function PocketUsers() {
  const { health, users, chats, msgs } = Route.useLoaderData();
  // let health, users, chats, msgs;
  // useEffect(() => {
  //   getPb().health.check().then((res) => (health = res));
  //   getPb().collection("users").getList().then((res) => (users = res));
  //   getPb().collection("chats").getList().then((res) => (chats = res));
  //   getPb().collection("messages").getList().then((res) => (msgs = res));
  // }, []);

  useEffect(() => {
    
  });

  return (
    <div className="pb-users p-4">
      <h1 className="text-3xl text-primary">Pocketbase Health</h1>
      <pre className="text-sm font-serif">
        <div className="mt-2 text-xl font-bold gradient-text">Health</div>
        {JSON.stringify(health, null, 2)}

        <div className="mt-2 text-xl font-bold gradient-text">Users</div>
        {users && users.items.map((user) => <li key={user.id}>{user.name}</li>)}

        <div className="mt-2 text-xl font-bold gradient-text">Chats</div>
        {chats &&
          chats.items.map((chat) => <li key={chat.id}>{chat.title}</li>)}

        <div className="mt-2 text-xl font-bold gradient-text">Messages</div>
        {msgs && msgs.items.map((msg) => <li key={msg.id}>{msg.content}</li>)}
      </pre>
    </div>
  );
}
