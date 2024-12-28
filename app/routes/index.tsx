import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useAtom } from "@xoid/react";

import { $doubleCount } from "@/stores/counter";
import CounterServer from "@/components/CounterServer";
import CounterClient from "@/components/CounterClient";

export const Route = createFileRoute("/")({
  component: Index,
  loader: async () => ({}),
});

function Index() {
  // const router = useRouter();
  // const state = Route.useLoaderData();
  const countTwice = useAtom($doubleCount);

  return (
    <div className="p-2">
      <h1 className="app-wrap text-3xl text-info">The bear is alive and steppin' for a fight!</h1>

      <CounterServer />

      <CounterClient />

      <CounterClient increment={false} />

      <p className="mt-4 text-warning italic font-semibold">Twice the count: {countTwice}</p>

      <p className="mt-4">
        <a href="/pbtest" className="text-primary underline">
          Check Pocketbase health (start with `npm run pb:serve` first)
        </a>
      </p>

      {/* Invalidate Route only re-runs the loader function, so it is useless here */}
      {/* <button className="btn" onClick={() => router.invalidate()}>
        Invalidate route
      </button> */}
    </div>
  );
}
