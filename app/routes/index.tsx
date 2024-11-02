import { createFileRoute, useRouter } from "@tanstack/react-router";

import ServerCounter from "../components/counterServer";

export const Route = createFileRoute("/")({
  component: Index,
  loader: async () => ({}),
});

function Index() {
  // const router = useRouter();
  // const state = Route.useLoaderData();

  return (
    <div className="app-wrap">
      <h1>Your brand new Tanstack-Start-React19 app</h1>

      <ServerCounter />

      {/* Invalidate Route only re-runs the loader function, so it is useless here */}
      {/* <button className="btn" onClick={() => router.invalidate()}>
        Invalidate route
      </button> */}
    </div>
  );
}
