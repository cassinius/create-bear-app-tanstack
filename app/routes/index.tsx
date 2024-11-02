import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  // loader: async () => await getCount(),
});

function Index() {
  return (
    <div className="app-wrap">
      <h1>Your brand new Tanstack-Start-React19 app</h1>
    </div>
  );
}
