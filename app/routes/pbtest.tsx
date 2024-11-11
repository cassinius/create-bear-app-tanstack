import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { pb } from "@/db/pb";

export const Route = createFileRoute("/pbtest")({
  component: PocketUsers,
  loader: async () => getPbHealth(),
});

// TODO - we probably need to be authenticated for this to work.
const getPbUsers = createServerFn("GET", async () => {
  const users = await pb.collection("users").getList();
  console.log({ users }, users.items.length);
  return users;
});

const getPbHealth = createServerFn("GET", async () => {
  const health = await pb.health.check();
  return health;
});

export default function PocketUsers() {
  const health = Route.useLoaderData();

  // const [health, setHealth] = useState<any>(null);
  // useEffect(() => {
  //   getPbHealth().then((health) => setHealth(health));
  // }, []);

  return (
    <div className="pb-users p-4">
      <h1 className="text-3xl text-primary">Pocketbase Health</h1>
      <pre className="text-sm font-serif">
        {JSON.stringify(health, null, 2)}
        {/* {users.items.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))} */}
      </pre>
    </div>
  );
}
