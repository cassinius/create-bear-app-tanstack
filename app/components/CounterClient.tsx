import { $count } from "@/stores/counter";
import { useAtom } from "@xoid/react";

export default function ClientCounter({ increment = true }) {
  const count = useAtom($count);

  const setNewCount = () => (increment ? $count.value++ : $count.value--);

  return (
    <div className="mt-4">
      <p className="text-lg">Client-side +/- counter (in-memory)</p>

      <div className="flex flex-row justify-start align-middle">
        <div className="p-2 text-lg text-info font-bold">{count}</div>
        <button type="button" className="btn btn-info btn-outline" onClick={setNewCount}>
          {increment ? "+" : " -"}
        </button>
      </div>
    </div>
  );
}
