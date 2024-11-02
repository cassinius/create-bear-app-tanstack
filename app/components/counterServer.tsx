import * as fs from "node:fs";
import { createServerFn } from "@tanstack/start";
import { useState } from "react";

const filePath = "count.txt";

async function readCount() {
  return parseInt(
    await fs.promises.readFile(filePath, "utf-8").catch(() => "0")
  );
}

const updateCount = createServerFn("POST", async (addBy: number) => {
  const count = await readCount();
  await fs.promises.writeFile(filePath, `${count + addBy}`);
  return readCount();
});

const getCount = createServerFn("GET", () => {
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
      <p className="text-lg text-slate-200">Server-side counter</p>
      <button
        type="button"
        className="btn btn-secondary btn-outline"
        onClick={() => {
          updateCount(1).then((newCount) => {
            setCount(newCount);
          });
        }}
      >
        Add 1 to {count} ?
      </button>
    </div>
  );
}
