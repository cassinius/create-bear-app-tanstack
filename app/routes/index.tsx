import { createFileRoute, useRouter } from "@tanstack/react-router";

import ServerCounter from "../components/counterServer";
import ClientCounter from "../components/counterClient";

export const Route = createFileRoute("/")({
  component: Index,
  loader: async () => ({}),
});

function Index() {
  // const router = useRouter();
  // const state = Route.useLoaderData();

  return (
    <div className="p-2">
      <h1 className="app-wrap text-3xl text-primary">
        Your brand new Tanstack-Start-React19 app
      </h1>

      <ServerCounter />

      <ClientCounter />

      <ClientCounter increment={false} />

      {/* Invalidate Route only re-runs the loader function, so it is useless here */}
      {/* <button className="btn" onClick={() => router.invalidate()}>
        Invalidate route
      </button> */}
    </div>
  );
}
