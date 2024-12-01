import { Outlet, ScrollRestoration, createRootRoute } from "@tanstack/react-router";
import { Meta, Scripts } from "@tanstack/start";
import type { ReactNode } from "react";

// NOTE: ?url changes the type from 'typeof import("*.css")' to 'string'
import appCss from "../styles/app.css?url";

export const Route = createRootRoute({
  component: RootComponent,
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "BearStack Start Starter",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
    scripts: import.meta.env.DEV
      ? [
          {
            type: "module",
            children: `
                import RefreshRuntime from "/_build/@react-refresh";
                RefreshRuntime.injectIntoGlobalHook(window);
                window.$RefreshReg$ = () => {};
                window.$RefreshSig$ = () => (type) => type;
              `,
          },
        ]
      : [],
  }),
  notFoundComponent: () => <div className="text-6xl text-red-500 font-bold text-center my-[40%]">404 Not Found</div>,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <Meta />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
