import * as fs from "node:fs";
import { useState } from "react";
import { createServerFn } from "@tanstack/start";
import { z } from "zod";

const filePath = "count.txt";

const CountData = z.object({
  addBy: z.number(),
});

async function readCount() {
  return parseInt(await fs.promises.readFile(filePath, "utf-8").catch(() => "0"));
}

const updateCount = createServerFn({ method: "POST" })
  .validator((countData: unknown) => CountData.parse(countData))
  .handler(async ({ data }) => {
    const count = await readCount();
    await fs.promises.writeFile(filePath, `${count + data.addBy}`);
    return readCount();
  });

const getCount = createServerFn({ method: "GET" }).handler(() => {
  return readCount();
});

export default function ServerCounter() {
  const [count, setCount] = useState(0);
  getCount().then((count) => {
    console.log("setting count on re-render (old-style React)", count);
    setCount(count);
  });

  return (
    <div className="mt-4">
      <p className="text-lg">Server-side counter (persistent)</p>
      <button
        type="button"
        className="btn btn-secondary btn-outline"
        onClick={() => {
          updateCount({ data: { addBy: 1 } }).then((newCount) => {
            setCount(newCount);
          });
        }}
      >
        Add 1 to {count} ?
      </button>
    </div>
  );
}
